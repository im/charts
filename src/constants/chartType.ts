import { DYNAMIC_PREFIX, LINE_PREFIX , PIE_PREFIX, BAR_PREFIX,RING_PREFIX } from './prefix'
import { ChartTypeObject, chartType } from '@/typings/chart'

export const CHART_TYPE_TEXT_MAP:any = {
    // [DYNAMIC_PREFIX]: '动态图表',
    [LINE_PREFIX]: '线形图',
    [BAR_PREFIX]: '柱状图',
    [PIE_PREFIX]: '饼图',
}

export const CHART_TYPE_MAP = {
    [`${DYNAMIC_PREFIX}RANKING_BAR`]: '动态排名变化图',
    [`${DYNAMIC_PREFIX}LINE_BAR_MIX`]: '动态折线条形混合图',
    [`${LINE_PREFIX}BASICS`]: '基础折线图',
    [`${PIE_PREFIX}BASICS`]: '基础饼图',
    [`${BAR_PREFIX}BASICS`]: '基础柱状图',
    [`${RING_PREFIX}BASICS`]: '基础环形图',
}

const PIE_CHARTS = [`${PIE_PREFIX}BASICS`,`${RING_PREFIX}BASICS`,]

const chartTypeOptions = Object.keys(CHART_TYPE_MAP).map(key => ({ label: CHART_TYPE_MAP[key], value: key as chartType }))

export const getChartTypes = () => {
    return Object.keys(CHART_TYPE_TEXT_MAP).map((key:string) => {
        return {
            label: CHART_TYPE_TEXT_MAP[key],
            value: key,
            children: chartTypeOptions.filter(v => {
                if (key === PIE_PREFIX) {
                    return PIE_CHARTS.includes(v.value)
                }
                const index = v.value.indexOf(key)

                return ~index && index === 0
            })
        }
    })
}
