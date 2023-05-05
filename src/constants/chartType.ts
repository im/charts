import { DYNAMIC_PREFIX, LINE_PREFIX } from './prefix'
import { ChartTypeObject, chartType } from '@/typings/chart'

export const CHART_TYPE_TEXT_MAP:any = {
    [DYNAMIC_PREFIX]: '动态图表',
    [LINE_PREFIX]: '线形图',
}

export const CHART_TYPE_MAP = {
    [DYNAMIC_PREFIX + `RANKING_BAR`]: '动态排名变化图',
    [DYNAMIC_PREFIX + `LINE_BAR_MIX`]: '动态折线条形混合图',
    [LINE_PREFIX + `BASICS`]: '基础折线图',

}

const chartTypeOptions = Object.keys(CHART_TYPE_MAP).map(key => ({ label: CHART_TYPE_MAP[key], value: key as chartType }))

export const getChartTypes = () => {
    return Object.keys(CHART_TYPE_TEXT_MAP).map((key:string) => {
        return {
            label: CHART_TYPE_TEXT_MAP[key],
            value: key,
            children: chartTypeOptions.filter(v => {
                const index = v.value.indexOf(key)
                return ~index && index === 0
            })
        }
    })
}
