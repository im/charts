import mitt, { Emitter } from 'mitt'
import { ChartObject } from '@/typings/chart'

type Events = {
    createFolder: string
    createChart: string
    updateChart: string
    handleChart: string
    chartRun: number
    chartStart: any
    chartEnd: any
    chartClear: any
    startDownload: string
    endDownload: object
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter