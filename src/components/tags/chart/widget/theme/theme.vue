<!--
* Theme
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-09 09:46:40
* @since 0.0.0
-->

<template>
    <Widget title="主题" tooltip="设置图表主题">
        <div class="wrapper">
            <div v-for="theme in themeColorList" :key="theme.value" class="theme" :class="{ active: theme.value === data.theme }" @click="change(theme.value)">
                <div v-for="color in getColors(theme.color)" :key="color" :style="{ background: color }" class="color"></div>
            </div>
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
    theme: ''
})

const init = () => {
    const { config } = CHART.value
    data.value.theme = config?.theme || 'westeros'
}

const getColors = (colors: any) => {
    return colors.filter((v:any , i:any) => (i < 6))
}

const change = (value:string) => {
    data.value.theme = value
    updateChartConfig(CHART.value, 'theme', data.value.theme)
}

onMounted(() => {
    init()
})

</script>

<style src="./theme.styl" lang="stylus" scoped></style>
