import { ChartObject, vChartType } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    const chartType = OPTIONS[type]?.type
    return !!['bar', 'line'].includes(chartType)
}

const checkChartType = (chart:ChartObject, chartType: vChartType) => {
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

    if (checkChartType(chart, 'line') || checkChartType(chart, 'bar')) {
        chartData[0].shift()
        const names = chartData[0]
        names.forEach((name: string, index: number) => {
            const obj:any = {
                name,
                type: chartType,
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

    if (checkChartType(chart, 'pie')) {
        const obj:any = {
            name: chartData[0].shift(),
            radius: '50%',
            data: [],
            type: chartType
        }
        const names = chartData[0]
        names.forEach((name: string, index: number) => {
            obj.data.push({
                value: chartData[1][index + 1],
                name
            })
        })
        series.push(obj)
    }

    if (checkChartType(chart, 'ring')) {
        const obj:any = {
            name: chartData[0].shift(),
            data: [],
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            type: 'pie'
        }
        const names = chartData[0]
        names.forEach((name: string, index: number) => {
            obj.data.push({
                value: chartData[1][index + 1],
                name
            })
        })
        series.push(obj)
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
const getTitle = (chart:ChartObject) => {
    const title = chart?.config?.title
    return {
        title: {
            show: title.show,
            text: title.value,
            left: 10,
            top: 10
        }
    }
}

export function createOption (data:ChartObject) {
    const chart = _.cloneDeep(data)
    const xAxis = getXAxis(chart)
    const yAxis = getYAxis(chart)
    const series = getSeries(chart)
    const legend = getLegend(chart)
    const title = getTitle(chart)

    const option = {
        backgroundColor: '#fff',
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        ...title,
        grid: {
        },
        tooltip: {
            trigger: 'item',
        },
    }
    return option
}