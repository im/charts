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

            <div class="background-color">
                画布颜色
                <el-color-picker v-model="data.backgroundColor" show-alpha :predefine="predefineColors" @change="changeColor" />
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

const predefineColors = ref([
    '#ffffff',
    '#000000',
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    // 'hsv(51, 100, 98)',
    // 'hsva(120, 40, 94, 0.5)',
    // 'hsl(181, 100%, 37%)',
    // 'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

const data = ref({
    theme: '',
    backgroundColor: '#ffffff'
})

const init = () => {
    const { config } = CHART.value
    data.value.theme = config?.theme || 'westeros'
    data.value.backgroundColor = config?.backgroundColor || '#ffffff'
}

const getColors = (colors: any) => {
    return colors.filter((v:any , i:any) => (i < 6))
}

const change = (value:string) => {
    data.value.theme = value
    updateChartConfig(CHART.value, 'theme', data.value.theme)
}

const changeColor = () => {
    updateChartConfig(CHART.value, 'backgroundColor', data.value.backgroundColor)
}

onMounted(() => {
    init()
})

</script>

<style src="./theme.styl" lang="stylus" scoped></style>
