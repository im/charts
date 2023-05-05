import { ChartObject } from '@/typings/chart'
// @ts-ignore
import _ from 'loadsh'
import OPTIONS from './options'

const isShowAxis = (chart:ChartObject) => {
    const { type } = chart
    const chartType = OPTIONS[type].type
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
    }
    return {
        xAxis
    }
}

const getSeries = (chart:ChartObject) => {
    const { config, type } = chart
    const { data = [] } = config
    const chartType = OPTIONS[type].type
    const series:any = []
    if (isShowAxis(chart)) {
        const chartData = JSON.parse(JSON.stringify(data))
        chartData[0].shift()
        const names = chartData[0]
        for (let i = 1; i < data.length; i++) {
            const item = data[i]
            item.shift()
            const obj = {
                name: names[i],
                type: chartType,
                stack: 'Total',
                data: item
            }
            series.push(obj)
        }
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
        const chartData = JSON.parse(JSON.stringify(data))
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
    console.log('legend: ', legend)

    const option = {
        ...xAxis,
        ...yAxis,
        ...series,
        ...legend,
        title: {
            text: chart.name,
            left: 'center'
        },
        // grid: {
        //     backgroundColor: 'transparent' ,
        // },
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