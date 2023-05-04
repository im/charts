import mitt, { Emitter } from 'mitt'

type Events = {
    createFolder: string,
    createChart: string,
    updateChart: string
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter