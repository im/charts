<!--
* ChartTemplate
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-23 17:47:29
* @since 0.0.0
-->

<template>
    <el-dialog
    :fullscreen="true"
    :model-value="true"
    title="图表模版"
    :before-close="handleClose">
        <div class="container">
            <div v-for="chart in chartTypes" :key="chart.value" class="chart-block" @click="handleChart(chart)">
                <div class="tag">{{ chart.parentLabel }}</div>
                <div class="preview">
                    <PreviewImage :chart="chart" />
                </div>
                <div class="name-box">
                    {{ chart.label }}
                </div>
            </div>
            <!-- <div v-for="chartType in chartTypes" :key="chartType.value" class="chart-list">
                <el-divider content-position="left">{{ chartType.label }}</el-divider>
                <div class="chart-wrapper">
                    <div v-for="chart in chartType.children" :key="chart.value" class="chart-block" @click="handleChart(chart)">
                        <div class="tag">{{ chartType.label }}</div>
                        <div class="preview">
                            <PreviewImage :chart="chart" />
                        </div>
                        <div class="name-box">
                            {{ chart.label }}
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, ref, nextTick } from 'vue'
import PreviewImage from '@/components/tags/previewImage'
import { getChartTypes } from '@/constants/chartType'
import { useChartStore } from '@/stores/chart'
import { useRouter, useRoute } from 'vue-router'
import { createConfig } from '@/chart/config'
import { ChartTypeObject, ChartObject } from '@/typings/chart'

const emits = defineEmits(['close'])
const chartTypes = computed(() => {
    const types = getChartTypes()
    return types.reduce((acc:any,cur) => {
        const children = cur.children || []
        const results:any = children.map(v => {
            return {
                ...v,
                parentLabel: cur.label
            }
        })
        acc = acc.concat(results)
        return acc
    }, [])
})
const chartStore = useChartStore()
const handleClose = () => {
    emits('close')
}

const handleChart = async (chart:ChartTypeObject) => {
    const chartData:any = {
        name: chart.label,
        createdTime: new Date().getTime(),
        updatedTime: new Date().getTime(),
        type: chart.value,
        config: createConfig(chart)
    }
    const id = await chartStore.set(chartData)
    handleClose()
}

</script>

<style src="./chartTemplate.styl" lang="stylus" scoped></style>
