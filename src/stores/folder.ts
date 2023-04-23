import { defineStore } from 'pinia'
import { openDB } from 'idb'
import { FolderObject } from '@/typings/folder'

import { FOLDER_NAME, FOLDER_VERSION, FOLDER_STORE_NAME } from '@/constants/db'

const FolderDb = openDB(FOLDER_NAME, FOLDER_VERSION, {
    upgrade (db) {
        db.createObjectStore(FOLDER_STORE_NAME)
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
            const ids:any = await (await FolderDb).getAllKeys(FOLDER_STORE_NAME)
            const results:any = await Promise.all(ids.map((id:string) => this.get(id)))
            this.list = (results || []).sort((a:FolderObject,b: FolderObject) => a.updatedTime - b.updatedTime)
        },
        async get (key: string) {
            return await (await FolderDb).get(FOLDER_STORE_NAME, key)
        },
        async set (key:string, val: object) {
            const id = await (await FolderDb).put(FOLDER_STORE_NAME, val, key)
            id && this.update()
        },
        async del (key:string) {
            const id = await (await FolderDb).delete(FOLDER_STORE_NAME, key)
            this.update()
        },
        async  clear () {
            return (await FolderDb).clear(FOLDER_STORE_NAME)
        },
        async  keys () {
            return (await FolderDb).getAllKeys(FOLDER_STORE_NAME)
        }
    },
})