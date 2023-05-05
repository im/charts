import { ChartTypeObject } from '@/typings/chart'
import DATAS from './datas'
export function createConfig (chart: ChartTypeObject) {

    const title = chart.label
    const type = chart.value
    const data = DATAS[type]

    return {
        title,
        type,
        data,
    }
}