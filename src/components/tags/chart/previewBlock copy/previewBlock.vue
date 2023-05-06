<!--
* PreviewBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:24:05
* @since 0.0.0
-->

<template>
    <div class="preview-block">
        <!-- <v-chart class="chart" :option="option" /> -->
        <hot-table :data="data" :minCols="40" licenseKey="non-commercial-and-evaluation" :minRows="40" :rowHeaders="true" :colHeaders="true"></hot-table>
    </div>
</template>

<script lang="ts" setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

import { HotTable } from '@handsontable/vue3'
// import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'
// https://handsontable.com/docs/javascript-data-grid/vue3-installation/

const data = ref([
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13]
])

use([
    CanvasRenderer,
    PieChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
])

// provide(THEME_KEY, 'dark')

// https://github.com/ecomfe/vue-echarts
const option = ref({
    title: {
        text: 'Traffic Sources',
        left: 'center'
    },
    grid: {
        backgroundColor: 'transparent' ,
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
    },
    series: [
        {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 234, name: 'Ad Networks' },
                { value: 135, name: 'Video Ads' },
                { value: 1548, name: 'Search Engines' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})
</script>

<style src="./previewBlock.styl" lang="stylus" scoped></style>
