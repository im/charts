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
import { onMounted, computed, inject, nextTick } from 'vue'
import westeros from '@/theme/westeros'
import emitter from '@/utils/emitter'
import { use, registerTheme } from 'echarts/core'
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
import { DYNAMIC_PREFIX } from '@/constants/prefix'
import { createDynamicOption } from '@/chart/dynamicOption'
// @ts-ignore
import gifshot from 'gifshot'

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
registerTheme('westeros', westeros)
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
const CHART = injectStrict(ChartKey)
// https://github.com/ecomfe/vue-echarts
// https://blog.csdn.net/qq_43953273/article/details/121085281

emitter.on('chartRun', (frameIndex) => {
    const setOption = chartRef.value?.setOption
    setOption(createDynamicOption(CHART.value, frameIndex))

})

let loopTimer:any = null
let imageList:any = []

provide(THEME_KEY, 'westeros')

const chartRef:any = ref(null)

const isDynamic = computed(() => ~CHART.value.type.indexOf(DYNAMIC_PREFIX))

const option:any = computed(() => {
    if (CHART?.value.id) {
        return isDynamic.value ? createDynamicOption(CHART.value, 0) : createOption(CHART.value)
    } else {
        return {}
    }
})

const download = (str:string, suffix = 'png') => {
    const a = document.createElement('a')
    a.download = CHART?.value.name + '.' + suffix
    a.href = str
    document.body.appendChild(a)
    a.click()
    a.remove()
}

const downloadGif = () => {
    imageList = []

    loopTimer = setInterval(() => {
        const src = chartRef.value?.getDataURL({
            type: 'png',
            pixelRatio: 1,
            backgroundColor: '#fff'
        })
        imageList.push(src)
    }, 100)
}

emitter.on('chartEnd', () => {
    clearInterval(loopTimer)
    gifshot.createGIF({
        gifWidth: 1000,
        gifHeight: 600,
        interval: 0.2,
        images: imageList,
    }, (obj:any) => {
        if (!obj.error) {
            const image = obj.image
            emitter.emit('endDownload', {
                image: image,
                suffix: 'gif'
            })
        }
    })
})

emitter.on('handleChart', (command) => {
    if (isDynamic.value) {
        emitter.emit('startDownload', '')
        emitter.emit('chartStart')
        downloadGif()
    } else {
        emitter.emit('startDownload', '')

        nextTick(() => {
            const src = chartRef.value?.getDataURL({
                type: 'png',
                pixelRatio: 10,
                backgroundColor: '#fff'
            })

            emitter.emit('endDownload', {
                image: src,
                suffix: 'png'
            })
        })

    }
})

</script>

<style src="./previewBlock.styl" lang="stylus" scoped></style>
