import { defineStore } from 'pinia'
import { ChartObject } from '@/typings/chart'
import Db from '@/utils/db'

import { CHART_STORE_NAME } from '@/constants/db'

const ChartDb = Db()

export const useChartStore = defineStore('Chart', {
    state: () => {
        return {
            list: []
        }
    },
    actions: {
        async update () {
            const results:any = await (await ChartDb).getAllFromIndex(CHART_STORE_NAME, 'id')
            this.list = (results || []).sort((a:ChartObject,b: ChartObject) => b.updatedTime - a.updatedTime)
        },
        async get (id: number) {
            const tx = (await ChartDb).transaction(CHART_STORE_NAME, 'readwrite')
            const store = tx.store
            return await store.get(+id)
        },
        async set (data: any) {
            const tx = (await ChartDb).transaction(CHART_STORE_NAME, 'readwrite')
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
            const id = await (await ChartDb).delete(CHART_STORE_NAME, key)
            this.update()
        }
    },
})