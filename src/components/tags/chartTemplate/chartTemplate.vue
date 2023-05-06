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
            <div v-for="chartType in chartTypes" :key="chartType.value">
                <el-divider content-position="left">{{ chartType.label }}</el-divider>
                <div class="chart-wrapper">
                    <div v-for="chart in chartType.children" :key="chart.value" class="chart-block" @click="handleChart(chart)">
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
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, ref } from 'vue'
import PreviewImage from '@/components/tags/previewImage'
import { getChartTypes } from '@/constants/chartType'
import { useChartStore } from '@/stores/chart'
import { useRouter, useRoute } from 'vue-router'
import { createConfig } from '@/chart/config'
import { ChartTypeObject, ChartObject } from '@/typings/chart'

const router = useRouter()
const emits = defineEmits(['close'])
const chartTypes = ref(getChartTypes())
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
    router.push({
        name: 'chart',
        params: {
            id
        }
    })
    // const { href } = router.resolve({
    //     name: 'chart',
    //     params: {
    //         id
    //     }
    // })
    // const { origin, pathname } = window.location
    // const url = origin + pathname + href
    // window.open(url, '_blank')
    handleClose()
}

</script>

<style src="./chartTemplate.styl" lang="stylus" scoped></style>
