// @ts-ignore
import _ from 'loadsh'
import { ChartObject, ChartConfigKeys, ChartConfigValues } from '@/typings/chart'
import emitter from '@/utils/emitter'

export const updateChartConfig = (chart:ChartObject, key:ChartConfigKeys, value: ChartConfigValues) => {
    const _chart = _.cloneDeep(chart)
    const { config } = _chart
    config[key] = _.isObject(value) ? _.cloneDeep(value) : value
    console.log('config[key]: ', config[key])
    emitter.emit('updateChart', _chart)
}