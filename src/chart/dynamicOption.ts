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
    const yAxis:any = {}
    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        yAxis.type = 'category'
        yAxis.data = []
        // yAxis.animationDuration = 4000
        // yAxis.animationDurationUpdate = 4000
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
        bottom: '10',
    }

    if (checkChartType(chart, 'DYNAMIC_RANKING_BAR')) {
        return {

        }
    }

    return {
        legend
    }
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

    const option = {
        backgroundColor: '#fff',
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        ...title,
        animationDuration: animation.moveTime * 1000,
        // animationDurationUpdate: 6000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        grid: {
        },
        tooltip: {
            trigger: 'item',
        },
    }
    return option
}