<!--
* PreviewImage
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-23 17:56:05
* @since 0.0.0
-->

<template>
    <el-image :src="url" fit="cover" />
</template>

<script lang="ts" setup>
import { computed,defineProps } from 'vue'
import { getChartImg } from '@/utils/getImg'
const props = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    }
})

const url = computed(() => getChartImg(props.chart.value + '.gif'))

</script>

<style src="./previewImage.styl" lang="stylus" scoped></style>
