import mitt, { Emitter } from 'mitt'

type Events = {
    createFolder: string
};

const emitter: Emitter<Events> = mitt<Events>()

export default emitter