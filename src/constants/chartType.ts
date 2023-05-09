import { DYNAMIC_PREFIX, LINE_PREFIX , PIE_PREFIX, BAR_PREFIX,RING_PREFIX } from './prefix'
import { ChartTypeObject, ChartType } from '@/typings/chart'

export const CHART_TYPE_TEXT_MAP:any = {
    [DYNAMIC_PREFIX]: '动态图表',
    [LINE_PREFIX]: '线形图',
    [BAR_PREFIX]: '柱状图',
    [PIE_PREFIX]: '饼图',
}

export const CHART_TYPE_MAP = {
    [`${DYNAMIC_PREFIX}RANKING_BAR`]: {
        label: '动态排名变化图',
        icon: 'icon-paiming'
    },
    [`${DYNAMIC_PREFIX}RING`]: {
        label: '动态环形图',
        icon: 'icon-huanxingtu1'
    },
    [`${LINE_PREFIX}BASICS`]: {
        label: '基础折线图',
        icon: 'icon-zhexiantu'
    },
    [`${PIE_PREFIX}BASICS`]: {
        label: '基础饼图',
        icon: 'icon-bingtu'
    },
    [`${BAR_PREFIX}BASICS`]: {
        label: '基础柱状图',
        icon: 'icon-chartcolumn'
    },
    [`${RING_PREFIX}BASICS`]: {
        label: '基础环形图',
        icon: 'icon-huanxingtu'
    },
}

const PIE_CHARTS = [`${PIE_PREFIX}BASICS`,`${RING_PREFIX}BASICS`,]

export const chartTypeOptions = Object.keys(CHART_TYPE_MAP).map(key => ({ label: CHART_TYPE_MAP[key].label, icon: CHART_TYPE_MAP[key].icon, value: key as ChartType }))

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
