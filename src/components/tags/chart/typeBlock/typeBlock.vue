<!--
* TypeBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:23:56
* @since 0.0.0
-->

<template>
    <div class="type-block">
        <div v-for="chartType in chartTypes" :key="chartType.value">
                <div class="tab" :class="{ open: chartType.open }" @click="open(chartType)">
                    <i class="icon-sanjiaoyou iconfont"></i>
                    {{ chartType.label }}
                </div>
                <div v-if="chartType.open" class="chart-wrapper">
                    <div v-for="chart in chartType.children" :key="chart.value" :class="{ active: chart.value === props.chart.type }" class="chart-block" @click="handleType(chart)">
                        <div class="preview">
                            <PreviewImage :chart="chart" />
                        </div>
                        <div class="name-box">
                            {{ chart.label }}
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted , defineProps } from 'vue'
import { getChartTypes } from '@/constants/chartType'
import PreviewImage from '@/components/tags/previewImage'
import emitter from '@/utils/emitter'

const chartTypes = ref(getChartTypes().map(v => { return { ...v, open: true } } ))

const open = (chartType:any) => {
    chartType.open = !chartType.open
}

const props = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    }
})

const handleType = (data: any) => {
    const current:any = { ...props.chart }
    current.type = data.value
    emitter.emit('updateChart', JSON.parse(JSON.stringify(current)))
}
</script>

<style src="./typeBlock.styl" lang="stylus" scoped></style>
