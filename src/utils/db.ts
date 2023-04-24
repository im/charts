import { openDB } from 'idb/with-async-ittr'

import { CHART_DB_NAME, CHART_DB_VERSION, CHART_STORE_NAME, FOLDER_STORE_NAME } from '@/constants/db'

let ChartDb:any = null

export default () => {
    if (ChartDb) return ChartDb
    ChartDb = openDB(CHART_DB_NAME, CHART_DB_VERSION, {
        upgrade (db) {
            const chartStore = db.createObjectStore(CHART_STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
            })
            chartStore.createIndex('id', 'id', {
                unique: true
            })

            const folderStore = db.createObjectStore(FOLDER_STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
            })
            folderStore.createIndex('id', 'id', {
                unique: true
            })
        },
    })
    return ChartDb
}