import { DYNAMIC_PREFIX, LINE_PREFIX } from './prefix'

export type ChartType = 'DYNAMIC_RANKING_BAR'
| 'DYNAMIC_LINE_BAR_MIX'
| 'DYNAMIC_RING'
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
    color: string
}
export interface ChartConfigObject {
    theme: string
    backgroundColor: string
    legend: boolean
    title: ChartConfigTitleObject
    animation: ChartConfigAnimationObject
    data: array
}

export type ChartConfigKeys = keyof ChartConfigObject

export type ChartConfigAnimationKeys = keyof ChartConfigAnimationObject

export type ChartConfigValues = ChartConfigTitleObject | ChartConfigAnimationObject | string | boolean

export interface ChartObject {
    id: number | string
    name: string
    createdTime: date
    updatedTime: date
    type: ChartType
    config: ChartConfigObject
}

export interface ChartTypeObject {
    label: string
    value: ChartType
}
