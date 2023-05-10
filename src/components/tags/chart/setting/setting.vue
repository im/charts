<!--
* Setting
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-08 08:55:30
* @since 0.0.0
-->

<template>
    <div class="setting">
        <!-- <Animation v-if="isDynamic" v-show="false" :open="true" /> -->
        <Title :open="true" />
        <Theme :open="true" />
        <Legend :open="true" />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, } from 'vue'
// import Animation from '@/components/tags/chart/widget/animation'
import Title from '@/components/tags/chart/widget/title'
import Theme from '@/components/tags/chart/widget/theme'
import Legend from '@/components/tags/chart/widget/legend'

import { DYNAMIC_PREFIX } from '@/constants/prefix'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
const CHART = injectStrict(ChartKey)

// const isDynamic = computed(() => ~CHART.value.type.indexOf(DYNAMIC_PREFIX))

</script>

<style src="./setting.styl" lang="stylus" scoped></style>
