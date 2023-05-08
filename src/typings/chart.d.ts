import { DYNAMIC_PREFIX, LINE_PREFIX } from './prefix'

export type chartType = 'DYNAMIC_RANKING_BAR'
| 'DYNAMIC_LINE_BAR_MIX'
| 'LINE_BASICS'
| 'BAR_BASICS'
| 'PIE_BASICS'
| 'RING_BASICS'

export type vChartType = 'bar' | 'line' | 'pie' | 'ring'

export interface ChartConfigAnimationObject {
    intervalTime: number
    moveTime: number
    startDelayTime: number
    endDelayTime: number
    loop: number
}

export interface ChartConfigTitleObject {
    show: boolean
    value: string
}
export interface ChartConfigObject {
    title: ChartConfigTitleObject
    animation: ChartConfigAnimationObject
    data: array
}

export type ChartConfigKeys = keyof ChartConfigObject

export type ChartConfigAnimationKeys = keyof ChartConfigAnimationObject

export type ChartConfigValues = ChartConfigTitleObject | ChartConfigAnimationObject

export interface ChartObject {
    id: number | string
    name: string
    createdTime: date
    updatedTime: date
    type: chartType
    config: ChartConfigObject
}

export interface ChartTypeObject {
    label: string
    value: chartType
}
