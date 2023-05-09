<!--
* Animation
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-08 11:25:51
* @since 0.0.0
-->

<template>
   <Widget title="动画" tooltip="设置图表动态效果或GIF属性">
        <div class="wrapper">
            <div class="play-block">
                <div class="play-btn" @click="handlePlay">
                    <i class="iconfont " :class="[ play ? 'icon-zanting' : ' icon-bofang1']"></i>
                </div>
                <el-slider v-model="frameIndex" size="small" :max="chartDataLen" :show-tooltip="false" />
            </div>
            <div class="setting-list">
                <div v-for="item in list" :key="item.label" class="item">
                    <div class="label">{{ item.label }}</div>
                    <el-select v-if="item.value === 'loop'" v-model="data[item.value]" size="small" @change="change">
                        <el-option :label="'开'" :value="1" />
                        <el-option :label="'关'" :value="0" />
                    </el-select>
                    <el-input-number v-else v-model="data[item.value]" size="small" :min="minMap[item.value]" :step="stepMap[item.value]" @change="change" />
                </div>
            </div>
        </div>
    </Widget>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch, onDeactivated, onUnmounted } from 'vue'
import Widget from '@/components/tags/chart/widget'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
import { updateChartConfig } from '@/utils/chart'
import { ChartConfigAnimationObject, ChartConfigAnimationKeys } from '@/typings/chart'
import emitter from '@/utils/emitter'

const CHART = injectStrict(ChartKey)

type Item = {
    label: string
    value: ChartConfigAnimationKeys
}

const list: Array<Item> = [
    {
        label: '间隔时间（秒）',
        value: 'intervalTime'
    },
    {
        label: '切换时间（秒）',
        value: 'moveTime'
    },
    {
        label: '开始延迟（秒）',
        value: 'startDelayTime'
    },
    {
        label: '结束时间（秒）',
        value: 'endDelayTime'
    },
    // {
    //     label: '循环播放',
    //     value: 'loop'
    // }
]

const stepMap = {
    intervalTime: 1,
    moveTime: 0.5,
    startDelayTime: 1,
    endDelayTime: 1,
}
const minMap = {
    intervalTime: 1,
    moveTime: 0.1,
    startDelayTime: 0,
    endDelayTime: 1,
}

const play = ref(false)
const frameIndex = ref(0)
let runTimer:any = null
let startDelayTimer:any = null

const data = ref({} as ChartConfigAnimationObject)

const chartData = computed(() => {
    const data = CHART.value?.config?.data || []
    return data
})
const chartDataLen = computed(() => (chartData.value.length || 2) - 1)
const moveTime = computed(() => data.value.moveTime || 0.5)
const intervalTime = computed(() => data.value.intervalTime || 1)
const totalIntervalTime = computed(() => moveTime.value + intervalTime.value)
const totalTime = computed(() => Math.floor(totalIntervalTime.value * chartDataLen.value))

const init = () => {
    const { config } = CHART.value
    data.value = { ...config?.animation }
}

watch(() => play.value, () => {
    emitter.emit('updateChartPlayState', play.value)
})

const start = () => {
    if (!frameIndex.value) {
        startDelayTimer = setTimeout(() => {
            run()
        }, data.value.startDelayTime)
    } else {
        run()
    }
}

const run = () => {
    runTimer = setInterval(() => {
        frameIndex.value = frameIndex.value + 1
        if (frameIndex.value >= chartDataLen.value) {
            end()
        }
        emitter.emit('chartRun', frameIndex.value)
    }, data.value.intervalTime * 1000)
}
const stop = () => {
    clearTimeout(startDelayTimer)
    clearInterval(runTimer)
    play.value = false
}
const end = () => {
    if (data.value.loop) {
        frameIndex.value = 0
    } else {
        clear()
    }
    emitter.emit('chartEnd', frameIndex.value)
}

const clear = () => {
    clearTimeout(startDelayTimer)
    clearInterval(runTimer)
    frameIndex.value = 0
    play.value = false
}

const handlePlay = () => {
    if (play.value) {
        stop()
    } else {
        start()
        play.value = !play.value
    }
}

emitter.on('chartStart', () => {
    clear()
    handlePlay()
})

emitter.on('chartStop', () => {
    stop()
})

emitter.on('chartClear', () => {
    clear()
})

const change = () => {
    updateChartConfig(CHART.value, 'animation', data.value)
    clear()
}

onMounted(() => {
    init()
})

onUnmounted(() => {
    clear()
})

</script>

<style src="./animation.styl" lang="stylus" scoped></style>
