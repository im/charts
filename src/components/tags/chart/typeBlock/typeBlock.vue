<!--
* TypeBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:23:56
* @since 0.0.0
-->

<template>
    <div class="type-block" :class="{ expand: expand }">
        <div class="chart-list">
                <div v-for="chartType in chartTypes" v-show="expand" :key="chartType.value">
                    <div class="tab" :class="{ open: chartType.open }" @click="open(chartType)">
                        <i class="icon-sanjiaoyou iconfont"></i>
                        {{ chartType.label }}
                    </div>
                    <div v-if="chartType.open" class="chart-wrapper">
                        <div v-for="chart in chartType.children" :key="chart.value" :class="{ active: chart.value === CHART.type }" class="chart-block" @click="handleType(chart)">
                            <div class="preview">
                                <PreviewImage :chart="chart" />
                            </div>
                            <div class="name-box">
                                {{ chart.label }}
                            </div>
                        </div>
                    </div>
                </div>
            <div v-show="!expand" class="chart-nav">
                <div v-for="chart in chartTypeOptions" :key="chart.value" :class="{ active: chart.value === CHART.type }" @click="handleType(chart)">
                    <i class="iconfont" :class="[chart.icon]"></i>
                </div>
            </div>
        </div>
        <div class="bottom" @click="expand = !expand">
            <div>
                <i class="iconfont icon-shouqi"></i>
                <span v-if="expand" class="text">收起</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted , defineProps, inject } from 'vue'
import { getChartTypes, chartTypeOptions } from '@/constants/chartType'
import PreviewImage from '@/components/tags/previewImage'
import emitter from '@/utils/emitter'
import { ElMessageBox, ElMessage } from 'element-plus'
// @ts-ignore
import _ from 'loadsh'

import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
import DATAS from '@/chart/datas'
import { ChartTypeObject, ChartType } from '@/typings/chart'
const CHART = injectStrict(ChartKey)

const chartTypes = ref(getChartTypes().map(v => { return { ...v, open: true } } ))
const open = (chartType:any) => {
    chartType.open = !chartType.open
}

const expand = ref(false)

const handleType = (data: any) => {
    ElMessageBox.confirm(
        '切换图表类型将会替换原图表的数据，你确定要切换吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            const current:any = _.cloneDeep(CHART?.value)
            const datas = DATAS[data.value as ChartType]
            current.config.data = datas
            current.type = data.value
            emitter.emit('updateChart', current)
        })
}
</script>

<style src="./typeBlock.styl" lang="stylus" scoped></style>
