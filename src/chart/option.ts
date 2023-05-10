import { ChartObject, vChartType } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'
import { getColor, getTitle, checkChartType, getLegend, getBackgroundColor, getTooltip } from './utils'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    return !!['BAR_BASICS', 'LINE_BASICS', 'LINE_STEP'].includes(type)
}

const getXAxis = (chart:ChartObject) => {
    const { config } = chart
    const { data = [] } = config
    const xAxis:any = {}
    if (isShowAxis(chart)) {
        xAxis.type = 'category'
        xAxis.data = []
        for (let i = 1; i < data.length; i++) {
            xAxis.data.push(data[i][0])
        }
        return {
            xAxis
        }
    }
    return {
    }
}

const getSeries = (chart:ChartObject) => {
    const { config, type } = chart
    const { data = [] } = config
    const chartOption = OPTIONS[type]

    const series:any = []

    const chartData = _.cloneDeep(data)

    if (checkChartType(chart, 'BAR_BASICS') || checkChartType(chart, 'LINE_BASICS') || checkChartType(chart, 'LINE_STEP')) {
        chartData[0].shift()
        const names = chartData[0]
        names.forEach((name: string, index: number) => {
            const obj:any = {
                name,
                ...chartOption.series,
                data: []
            }
            for (let i = 1; i < chartData.length; i++) {
                const item:any = chartData[i]
                obj.data.push(+item[index + 1])
            }
            series.push(obj)
        })
    }

    if (checkChartType(chart, 'PIE_BASICS') || checkChartType(chart, 'RING_BASICS') || checkChartType(chart, 'PIE_PATTERN') || checkChartType(chart, 'PIE_ROSE')) {
        const obj:any = {
            name: chartData.shift()[0],
            ...chartOption.series,
            data: [],
        }
        chartData.forEach((item:any) => {
            const [name, value] = item
            obj.data.push({
                value,
                name
            })
        })
        series.push(obj)
    }

    return {
        series
    }
}

const getYAxis = (chart:ChartObject) => {
    const yAxis:any = {}
    if (isShowAxis(chart)) {
        yAxis.type = 'value'
        return {
            yAxis
        }
    }
    return {}

}

export function createOption (data:ChartObject) {
    const chart = _.cloneDeep(data)
    const xAxis = getXAxis(chart)
    const yAxis = getYAxis(chart)
    const series = getSeries(chart)
    const legend = getLegend(chart)
    const title = getTitle(chart)
    const color = getColor(chart)
    const backgroundColor = getBackgroundColor(chart)
    const tooltip = getTooltip(chart)

    const option = {
        ...color,
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        ...title,
        ...backgroundColor,
        ...tooltip,
    }
    console.log('option: ', option)
    return option
}