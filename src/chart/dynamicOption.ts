import { ChartObject, chartType } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    const chartType = OPTIONS[type]?.type
    return !!['DYNAMIC_RANKING_BAR'].includes(chartType)
}

const checkChartType = (chart:ChartObject, chartType: chartType) => {
    const { type } = chart
    const optionType = OPTIONS[type].type
    return optionType === chartType
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
    const chartType = chartOption.type

    const series:any = []

    const chartData = _.cloneDeep(data)

    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        chartData[0].shift()
        const names = chartData[0]
        names.forEach((name: string, index: number) => {
            const obj:any = {
                name,
                type: 'bar',
                // stack: 'Total',
                data: []
            }
            for (let i = 1; i < chartData.length; i++) {
                const item:any = chartData[i]
                obj.data.push(+item[index + 1])
            }
            series.push(obj)
        })
    }

    return {
        series
    }
}

const getLegend = (chart:ChartObject) => {
    const { config } = chart
    const { data = [] } = config
    const legend:any = {
        // orient: 'vertical',
        bottom: '10',
    }

    if (isShowAxis(chart)) {

        const chartData = _.cloneDeep(data)
        chartData[0].shift()
        legend.data = chartData[0]

    }

    return {
        legend
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

export function createDynamicOption (data:ChartObject) {
    const chart = _.cloneDeep(data)
    const xAxis = getXAxis(chart)
    const yAxis = getYAxis(chart)
    const series = getSeries(chart)
    const legend = getLegend(chart)

    const option = {
        backgroundColor: '#fff',
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        title: {
            text: chart.name,
            left: '10',
            top: '10',
        },
        grid: {
        },
        tooltip: {
            trigger: 'item',
        },
    }
    console.log('option: ', option)
    return option
}