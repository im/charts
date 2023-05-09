import { ChartObject, vChartType } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'
import { getColor, getTitle, checkChartType, getLegend } from './utils'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    const chartType = OPTIONS[type]?.type
    return !!['bar', 'line'].includes(chartType)
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
                data: [],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            }
            for (let i = 1; i < chartData.length; i++) {
                const item:any = chartData[i]
                obj.data.push(+item[index + 1])
            }
            series.push(obj)
        })
        console.log('series: ', series)
    }

    if (checkChartType(chart, 'pie')) {
        const obj:any = {
            name: chartData.shift()[0],
            radius: '50%',
            data: [],
            type: chartType
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

    if (checkChartType(chart, 'ring')) {
        const obj:any = {
            name: chartData.shift()[0],
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

    const option = {
        ...color,
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        ...title,
        backgroundColor: '#fff',
        grid: {
        },
        tooltip: {
            trigger: 'item',
        },
    }
    console.log('option: ', option)
    return option
}