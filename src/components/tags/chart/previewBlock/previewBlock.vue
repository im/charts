<!--
* PreviewBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:24:05
* @since 0.0.0
-->

<template>
    <div class="preview-block">
        <v-chart ref="chartRef" class="chart" autoresize :option="option" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'

import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { createOption } from '@/chart/option'

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

const props:any = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    }
})
// https://github.com/ecomfe/vue-echarts

provide(THEME_KEY, 'dark')

const option:any = computed(() => props.chart.id ? createOption(props.chart) : {} )

// const option = ref({
//     title: {
//         text: 'Traffic Sources',
//         left: 'center'
//     },
//     grid: {
//         backgroundColor: 'transparent' ,
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     legend: {
//         orient: 'vertical',
//         left: 'left',
//         data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
//     },
//     series: [
//         {
//             name: 'Traffic Sources',
//             type: 'pie',
//             radius: '55%',
//             center: ['50%', '60%'],
//             data: [
//                 { value: 335, name: 'Direct' },
//                 { value: 310, name: 'Email' },
//                 { value: 234, name: 'Ad Networks' },
//                 { value: 135, name: 'Video Ads' },
//                 { value: 1548, name: 'Search Engines' }
//             ],
//             emphasis: {
//                 itemStyle: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// })

</script>

<style src="./previewBlock.styl" lang="stylus" scoped></style>
