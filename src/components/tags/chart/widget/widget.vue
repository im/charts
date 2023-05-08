<!--
* Widget
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-08 08:55:01
* @since 0.0.0
-->

<template>
    <div class="widget" :class="{ open: open }">
        <el-tooltip
            v-if="tooltip"
            effect="dark"
            :content="tooltip"
            placement="left">
            <div class="top" @click="handleOpen">
                <div>{{ title }}</div>
                <i class="iconfont icon-fanhui"></i>
            </div>
        </el-tooltip>
        <div v-else class="top" @click="handleOpen">
                <div>{{ title }}</div>
                <i class="iconfont icon-fanhui"></i>
            </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed,onMounted, ref, defineProps } from 'vue'

const open = ref(false)

const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    tooltip: {
        type: String,
        default: ''
    },
    open: {
        type: Boolean,
        default: false
    },
})

const handleOpen = () => {
    open.value = !open.value
}

onMounted(() => {
    open.value = props.open
})

</script>

<style src="./widget.styl" lang="stylus" scoped></style>
