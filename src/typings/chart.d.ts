import { DYNAMIC_PREFIX, LINE_PREFIX } from './prefix'

export type chartType = 'DYNAMIC_RANKING_BAR'
| 'DYNAMIC_LINE_BAR_MIX'
| 'LINE_BASICS'
| 'BAR_BASICS'
| 'PIE_BASICS'

export type vChartType = 'bar' | 'line' | 'pie' | 'ring'
export interface ChartConfigObject {
    data: array
}

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
