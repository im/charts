import { DYNAMIC_PREFIX, LINE_PREFIX } from './prefix'

export type chartType = 'DYNAMIC_RANKING_BAR' | 'DYNAMIC_LINE_BAR_MIX' | 'LINE_BASICS'

export interface ChartObject {
    id: number | string
    name: string
    createdTime: date
    updatedTime: date
    type: string
    config: object
}

export interface ChartTypeObject {
    label: string
    value: chartType
}
