<!--
* Chart
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 13:59:01
* @since 0.0.0
-->

<template>
    <div class="chart-wrapper">
        <Topbar :chart="chart"></Topbar>
        <div class="container">
            <TypeBlock :chart="chart"></TypeBlock>
            <PreviewBlock :chart="chart"></PreviewBlock>
            <SettingBlock :chart="chart"></SettingBlock>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useChartStore } from '@/stores/chart'
import { useRouter, useRoute } from 'vue-router'
import { ChartObject } from '@/typings/chart'
import Topbar from '@/components/tags/chart/topbar'
import TypeBlock from '@/components/tags/chart/typeBlock'
import PreviewBlock from '@/components/tags/chart/previewBlock'
import SettingBlock from '@/components/tags/chart/settingBlock'
import emitter from '@/utils/emitter'

const chartStore = useChartStore()
const route = useRoute()
const id = computed(() => +route.params.id)
const chart = ref({} as ChartObject)

const getChart = async () => {
    const data = await chartStore.get(id.value)
    chart.value = data
    console.log('data: ', data)
}

emitter.on('updateChart', async (data:any) => {
    data.updatedTime = new Date().getTime()
    await chartStore.set(data)
    await getChart()
})

onMounted(() => {
    getChart()
})

</script>

<style src="./chart.styl" lang="stylus" scoped></style>
