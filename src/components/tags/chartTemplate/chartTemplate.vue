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
                    <div v-for="chart in chartType.children" :key="chart.value" class="chart-block">
                        {{ chart.label }} - {{ chart.value }}
                        <PreviewImage :chart="chart" />
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

const emits = defineEmits(['close'])
const chartTypes = ref(getChartTypes())

const handleClose = () => {
    emits('close')
}

</script>

<style src="./chartTemplate.styl" lang="stylus" scoped></style>
