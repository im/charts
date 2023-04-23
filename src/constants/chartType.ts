export const DYNAMIC_PREFIX = 'DYNAMIC'
export const LINE_PREFIX = 'LINE'

export const CHART_TYPE_TEXT_MAP:any = {
    [DYNAMIC_PREFIX]: '动态图表',
    [LINE_PREFIX]: '线形图',
}

export const CHART_TYPE_MAP = {
    [DYNAMIC_PREFIX + `_RANKING_BAR`]: '动态排名变化图',
    [DYNAMIC_PREFIX + `_LINE_BAR_MIX`]: '动态折线条形混合图',
    [LINE_PREFIX + `_BASICS`]: '基础折线图',
}

const chartTypeOptions = Object.keys(CHART_TYPE_MAP).map(key => ({ label: CHART_TYPE_MAP[key], value: key }))

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
