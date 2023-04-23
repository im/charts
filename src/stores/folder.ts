import { defineStore } from 'pinia'
import { openDB } from 'idb/with-async-ittr'
import { FolderObject } from '@/typings/folder'

import { FOLDER_NAME, FOLDER_VERSION, FOLDER_STORE_NAME } from '@/constants/db'

const FolderDb = openDB(FOLDER_NAME, FOLDER_VERSION, {
    upgrade (db) {
        const store = db.createObjectStore(FOLDER_STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
        })
        store.createIndex('id', 'id', {
            unique: true
        })
    },
})

export const useFolderStore = defineStore('Folder', {
    state: () => {
        return {
            list: []
        }
    },
    actions: {
        async update () {
            const results:any = await (await FolderDb).getAllFromIndex(FOLDER_STORE_NAME, 'id')
            this.list = (results || []).sort((a:FolderObject,b: FolderObject) => b.updatedTime - a.updatedTime)
        },
        async get (key: string) {
            return await (await FolderDb).get(FOLDER_STORE_NAME, key)
        },
        async set (data: any) {
            const tx = (await FolderDb).transaction(FOLDER_STORE_NAME, 'readwrite')
            if (data.id) {
                const index = tx.store.index('id')
                for await (const cursor of index.iterate(data.id)) {
                    const o = Object.assign(cursor.value, data)
                    cursor.update(o)
                }
                await tx.done
                return data.id
            } else {
                const id = await tx.store.add(data)
                this.update()
                await tx.done
                return id
            }

        },
        async del (key:number) {
            const id = await (await FolderDb).delete(FOLDER_STORE_NAME, key)
            this.update()
        }
    },
})