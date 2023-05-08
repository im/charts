<!--
* Setting
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-08 08:55:30
* @since 0.0.0
-->

<template>
    <div class="setting">
        <Animation :open="true" />
        <Title />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, } from 'vue'
import Title from '@/components/tags/chart/widget/title'
import Animation from '@/components/tags/chart/widget/animation'
</script>

<style src="./setting.styl" lang="stylus" scoped></style>
