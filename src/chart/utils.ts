import { themeColorMap } from '@/theme/color'
import { ChartObject, vChartType, ChartType } from '@/typings/chart'
import OPTIONS from './options'

export const getTitle = (chart:ChartObject) => {
    const title = chart?.config?.title
    return {
        title: {
            show: title.show,
            text: title.value,
            left: 10,
            top: 10,
            textStyle: {
                color: title.color
            }
        }
    }
}

export const getColor = (chart:ChartObject) => {
    const color = chart?.config?.theme || 'westeros'
    return {
        color: themeColorMap[color]
    }
}

export const getTooltip = (chart:ChartObject) => {
    const isAxis = !(checkChartType(chart, 'pie') || checkChartType(chart, 'ring'))
    return {
        tooltip: {
            trigger: isAxis ? 'axis' : 'item'
        }
    }
}

export const getBackgroundColor = (chart:ChartObject) => {
    const color = chart?.config?.backgroundColor || '#ffffff'
    return {
        backgroundColor: color
    }
}

export const checkChartType = (chart:ChartObject, chartType: vChartType | ChartType) => {
    const { type } = chart
    const optionType = OPTIONS[type].type
    return optionType === chartType
}

export const getLegend = (chart:ChartObject) => {
    const { config } = chart
    const legend:any = {
        show: config?.legend,
        bottom: '10',
    }

    return {
        legend
    }
}
