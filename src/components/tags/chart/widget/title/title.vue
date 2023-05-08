<!--
* Title
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-08 09:32:39
* @since 0.0.0
-->

<template>
     <Widget title="标题" tooltip="设置图表标题">
        <div class="wrapper">
            <el-checkbox v-model="data.show" label="" size="small" @change="change" />
            <el-input v-model="data.value" size="small" @input="change" />
        </div>
    </Widget>
</template>

<script lang="ts" setup>
import { computed, ref, inject, onMounted } from 'vue'
import Widget from '@/components/tags/chart/widget'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
import { updateChartConfig } from '@/utils/chart'
const CHART = injectStrict(ChartKey)

const data = ref({
    value: '',
    show: true
})

const init = () => {
    const { config } = CHART.value
    data.value.show = config?.title?.show
    data.value.value = config?.title?.value
}

const change = () => {
    updateChartConfig(CHART.value, 'title', data.value)
}

onMounted(() => {
    init()
})

</script>

<style src="./title.styl" lang="stylus" scoped></style>
