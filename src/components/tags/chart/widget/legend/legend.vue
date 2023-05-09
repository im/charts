<!--
* Theme
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-09 09:46:40
* @since 0.0.0
-->

<template>
    <Widget title="图例" tooltip="颜色所代表内容与指标说明">
        <div class="wrapper">
            <el-checkbox v-model="data.legend" label="图例显示" size="small" @change="change" />
        </div>
    </Widget>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import Widget from '@/components/tags/chart/widget'
import { themeColorList } from '@/theme/color'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
import { updateChartConfig } from '@/utils/chart'
import { ChartTypeObject, ChartType, ChartConfigTitleObject } from '@/typings/chart'

const CHART = injectStrict(ChartKey)

const data = ref({
    legend: true
})

const init = () => {
    const { config } = CHART.value
    data.value.legend = config?.legend
}

const change = () => {
    updateChartConfig(CHART.value, 'legend', data.value.legend)
}

onMounted(() => {
    init()
})

</script>

<style src="./legend.styl" lang="stylus" scoped></style>
