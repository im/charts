<!--
* Topbar
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:23:31
* @since 0.0.0
-->

<template>
    <div class="topbar">

        <div class="left">
            <h1 class="logo" title="charts">
                <router-link tag="a" :to="{ name: 'home' }">
                    <img src="/logo.svg" alt="charts" />
                    Charts
                </router-link>
            </h1>

        </div>
        <div class="center">
            <div class="name-box">
                <div class="name">{{ props.chart.name }}<i class="iconfont icon-weibiaoti520"></i></div>
            </div>
        </div>
        <div class="right">
            <div class="operation">
                <div class="item" @click="handleChart('download')">
                    <div>
                        <i class="iconfont icon-xiazai"></i>
                        <div class="text">下载</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import emitter from '@/utils/emitter'
const props = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    }
})

const handleChart = (command:string) => {
    emitter.emit('handleChart', command)
}
</script>

<style src="./topbar.styl" lang="stylus" scoped></style>
