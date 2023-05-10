<!--
* Chart
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 13:59:01
* @since 0.0.0
-->

<template>
    <div class="chart-wrapper" :loading="loading">
        <Topbar v-if="!loading"></Topbar>
        <div v-if="!loading" class="container">
            <TypeBlock></TypeBlock>
            <PreviewBlock></PreviewBlock>
            <SettingBlock></SettingBlock>
        </div>
        <Loading></Loading>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, provide, readonly } from 'vue'
import { useChartStore } from '@/stores/chart'
import { useRouter, useRoute } from 'vue-router'
import { ChartObject } from '@/typings/chart'
import Topbar from '@/components/tags/chart/topbar'
import TypeBlock from '@/components/tags/chart/typeBlock'
import Loading from '@/components/tags/chart/loading'
import PreviewBlock from '@/components/tags/chart/previewBlock'
import SettingBlock from '@/components/tags/chart/settingBlock'
import emitter from '@/utils/emitter'
import { ChartKey } from '@/utils/symbols'

const chartStore = useChartStore()
const route = useRoute()
const id = computed(() => +route.params.id)
const CHART = ref({} as ChartObject)
const loading = ref(true)

// https://juejin.cn/post/7000339697142595592

const getChart = async () => {
    const data: ChartObject = await chartStore.get(id.value)
    CHART.value = data
}

provide(ChartKey, readonly(CHART))

emitter.on('updateChart', async (data:any) => {
    data.updatedTime = new Date().getTime()
    await chartStore.set(data)
    await getChart()
    broadcast()
})

const broadcast = () => {
    const bc = new BroadcastChannel('chart')
    bc.postMessage('updateChart')
}

onMounted(async () => {
    await getChart()
    loading.value = false
    document.querySelector('html')?.classList.add('dark')
})

</script>

<style src="./chart.styl" lang="stylus" scoped></style>
