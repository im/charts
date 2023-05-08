<!--
* PreviewBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:24:05
* @since 0.0.0
-->

<template>
    <div class="preview-block">
        <div class="v-chart-box">
            <v-chart ref="chartRef" class="chart" autoresize :option="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, inject } from 'vue'
import emitter from '@/utils/emitter'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { ChartObject } from '@/typings/chart'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'

import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { createOption } from '@/chart/option'
import { DYNAMIC_PREFIX } from '@/constants/prefix'
import { createDynamicOption } from '@/chart/dynamicOption'

use([
    GridComponent,
    CanvasRenderer,
    PieChart,
    LineChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
])
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
const CHART = injectStrict(ChartKey)
// https://github.com/ecomfe/vue-echarts
// https://blog.csdn.net/qq_43953273/article/details/121085281

provide(THEME_KEY, 'light')

const chartRef:any = ref(null)

const option:any = computed(() => {
    if ( CHART?.value.id) {
        return ~CHART.value.type.indexOf(DYNAMIC_PREFIX) ? createDynamicOption(CHART.value) : createOption(CHART.value)
    } else {
        return {}
    }
})

const download = (str:string) => {
    const a = document.createElement('a')
    a.download = CHART?.value.name + '.png'
    a.href = str
    document.body.appendChild(a)
    a.click()
    a.remove()
}

emitter.on('handleChart', (command) => {
    download(chartRef.value?.getDataURL('awImage'))
})

</script>

<style src="./previewBlock.styl" lang="stylus" scoped></style>
