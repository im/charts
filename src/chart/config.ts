import { ChartTypeObject } from '@/typings/chart'
import DATAS from './datas'
export function createConfig (chart: ChartTypeObject) {

    const type = chart.value
    const data = DATAS[type]
    return {
        data,
        theme: 'westeros',
        legend: true,
        backgroundColor: '#ffffff',
        title: {
            show: true,
            value: chart.label,
            color: '#333333'
        },
        animation: {
            intervalTime: 1,
            moveTime: 0.5,
            startDelayTime: 0,
            endDelayTime: 1,
            loop: 0
        }
    }
}
