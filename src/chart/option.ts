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
    }
    return {
        xAxis
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
        orient: 'vertical',
        left: 'left',
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

    }
    return {
        yAxis
    }
}

export function createOption (data:ChartObject) {
    const chart = _.cloneDeep(data)
    const xAxis = getXAxis(chart)
    const yAxis = getYAxis(chart)
    const series = getSeries(chart)
    const legend = getLegend(chart)

    const option = {
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        title: {
            text: chart.name,
            left: 'center'
        },
        grid: {
            backgroundColor: '#fff' ,
        },
        tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // series: [
        //     {
        //         name: 'Traffic Sources',
        //         type: 'pie',
        //         radius: '55%',
        //         center: ['50%', '60%'],
        //         data: [
        //             { value: 335, name: 'Direct' },
        //             { value: 310, name: 'Email' },
        //             { value: 234, name: 'Ad Networks' },
        //             { value: 135, name: 'Video Ads' },
        //             { value: 1548, name: 'Search Engines' }
        //         ],
        //         emphasis: {
        //             itemStyle: {
        //                 shadowBlur: 10,
        //                 shadowOffsetX: 0,
        //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
        //             }
        //         }
        //     }
        // ]
    }

    console.log('option: ', option)
    return option
}