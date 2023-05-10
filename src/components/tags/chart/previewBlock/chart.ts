import emitter from '@/utils/emitter'

import { ref, computed, nextTick, onUnmounted } from 'vue'
import { ChartObject } from '@/typings/chart'

type RunStateType = 'start' | 'end' | 'clear' | 'stop'

const INTERVAL_TIME = 1000
let runTimer:any = null
let frameIndex = 0
export const runState = ref('clear' as RunStateType)

const getLen = (chart:ChartObject) => {
    const data = chart?.config?.data || []
    return data.length - 1
}

export const start = (chart:ChartObject, callback:any) => {
    runTimer = setInterval(() => {
        runState.value = 'start'
        frameIndex = frameIndex + 1
        if (frameIndex >= getLen(chart)) {
            end()
        }
        callback && callback(frameIndex - 1)
    }, INTERVAL_TIME)
}

export const stop = () => {
    runState.value = 'stop'
    clearInterval(runTimer)
}
const end = () => {
    clearInterval(runTimer)
    setTimeout(() => {
        runState.value = 'end'
        frameIndex = 0
    }, 1000)
}
export const clear = () => {
    runState.value = 'clear'
    clearInterval(runTimer)
    frameIndex = 0
}

onUnmounted(() => {
    clear()
})

export const download = (chart:ChartObject, str:string, suffix = 'png') => {
    const a = document.createElement('a')
    a.download = chart.name + '.' + suffix
    a.href = str
    document.body.appendChild(a)
    a.click()
    a.remove()
}
