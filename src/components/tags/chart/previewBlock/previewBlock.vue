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
            <div v-if="isDynamic" class="play-btn" @click="handlePlay">
                <i v-if="play" class="iconfont icon-weibiaoti519"></i>
                <i v-else class="iconfont icon-bofang "></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// https://github.com/ecomfe/vue-echarts
// https://blog.csdn.net/qq_43953273/article/details/121085281

import { onMounted, computed, inject, watch, nextTick, onUnmounted } from 'vue'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
import westeros from '@/theme/westeros'
import { use, registerTheme } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { TitleComponent,TooltipComponent,LegendComponent,GridComponent, MarkPointComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { createOption } from '@/chart/option'
import { DYNAMIC_PREFIX } from '@/constants/prefix'
import { createDynamicOption } from '@/chart/dynamicOption'
import { start, stop, runState, download , clear } from './chart'
import emitter from '@/utils/emitter'
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
    LegendComponent,
    MarkPointComponent
])
registerTheme('westeros', westeros)
provide(THEME_KEY, 'westeros')

const CHART = injectStrict(ChartKey)
const isDynamic = computed(() => ~CHART.value.type.indexOf(DYNAMIC_PREFIX))
const chartRef:any = ref(null)
const play = ref(false)
const isStartDownload = ref(false)
let imageList:any = []
let loopTimer:any = null

watch(() => runState.value, (state) => {
    play.value = state === 'start'

    if (isStartDownload.value && state === 'end') {
        createGIF()
    }

}, {
    deep: true
})

watch(() => CHART.value.config, (state) => {
    clear()
}, {
    deep: true
})

const option:any = computed(() => {
    if (CHART?.value.id) {
        return isDynamic.value ? createDynamicOption(CHART.value, 0) : createOption(CHART.value)
    } else {
        return {}
    }
})

const handlePlay = () => {
    play.value = !play.value
    play.value ? start(CHART.value, setOption) : stop()
}

const setOption = (frameIndex:number) => {
    nextTick(() => {
        const setOption = chartRef.value?.setOption
        setOption && setOption(createDynamicOption(CHART.value, frameIndex))
    })
}

const downloadGif = () => {
    imageList = []
    loopTimer = setInterval(() => {
        const src = chartRef.value?.getDataURL({
            type: 'png',
            pixelRatio: 3,
            backgroundColor: CHART.value.config.backgroundColor
        })
        imageList.push(src)
    }, 100)
}

const createGIF = () => {
    clearInterval(loopTimer)
    if (!imageList.length || !isStartDownload.value) return
    gifshot.createGIF({
        gifWidth: 1000,
        gifHeight: 630,
        interval: 0.1,
        images: imageList,
    }, (obj:any) => {
        if (!obj.error) {
            const src = obj.image
            console.log('src: ', src)
            download(CHART.value, src, 'gif')
            imageList = []
            emitter.emit('chartLoading', false)
        }
    })
    isStartDownload.value = false
}

emitter.on('handleChart', (command) => {
    if (isDynamic.value) {
        emitter.emit('chartLoading', true)
        clear()
        start(CHART.value, setOption)
        isStartDownload.value = true
        downloadGif()
    } else {
        nextTick(() => {
            emitter.emit('chartLoading', true)
            const src = chartRef.value?.getDataURL({
                type: 'png',
                pixelRatio: 10,
                backgroundColor: CHART.value.config.backgroundColor
            })
            download(CHART.value, src, 'png')

            setTimeout(() => {
                emitter.emit('chartLoading', false)
            }, 1000)
        })
    }
})

onUnmounted(() => {
    imageList = []
    clearInterval(loopTimer)
})

</script>

<style src="./previewBlock.styl" lang="stylus" scoped></style>
