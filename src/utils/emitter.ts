import mitt, { Emitter } from 'mitt'
import { ChartObject } from '@/typings/chart'

type Events = {
    createFolder: string
    createChart: string
    updateChart: string
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter