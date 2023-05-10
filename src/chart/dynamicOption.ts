import { ChartObject, ChartType } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'
import { getColor, getTitle, checkChartType, getLegend, getBackgroundColor, getTooltip } from './utils'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    return !!['DYNAMIC_RANKING_BAR'].includes(type)
}

const getXAxis = (chart:ChartObject) => {
    const { config } = chart
    const { data = [] } = config
    const xAxis:any = {
        axisTick: {
            show: false
        }
    }
    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        xAxis.type = 'value'
        return {
            xAxis
        }
    }
    return {
    }
}
const getYAxis = (chart:ChartObject) => {
    const { config } = chart
    const { data = [] } = config
    const yAxis:any = {
        axisTick: {
            show: false
        }
    }
    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        yAxis.type = 'category'
        yAxis.data = []
        for (let i = 1; i < data.length; i++) {
            yAxis.data.push(data[i][0])
        }
        return {
            yAxis
        }
    }
    return {}

}

const getSeries = (chart:ChartObject) => {
    const { config, type } = chart
    const { data = [] } = config
    const chartOption = OPTIONS[type]

    const series:any = []

    const chartData = _.cloneDeep(data)

    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
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

    if (checkChartType(chart, 'DYNAMIC_RING')) {
        const obj:any = {
            name: chartData.shift()[0],
            data: [],
            ...chartOption.series,
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

const getFrames = (chart:ChartObject, frameIndex:number) => {
    const datas = _.cloneDeep(chart.config.data)
    const headers = datas.shift()
    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        const results = datas.reverse().filter((item:any, index:number) => {
            return index <= frameIndex
        })
        results.unshift(headers)
        return results
    }

    if (checkChartType(chart, 'DYNAMIC_RING')) {
        const results = headers.map((name:string, index:number) => {
            return [name, datas[frameIndex][index]]
        })
        return results
    }

    return datas
}

export function createDynamicOption (data:ChartObject, frameIndex:number) {
    const chart = _.cloneDeep(data)
    const { config } = chart
    config.data = getFrames(chart, frameIndex)

    const { animation } = config
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
        animationDuration: animation.moveTime * 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
    }
    return option
}