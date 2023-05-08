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
                <div class="play-btn">
                    <i class="iconfont " :class="[ play ? 'icon-zanting' : ' icon-bofang1']"></i>
                </div>
                <el-slider v-model="value1" size="small" />
            </div>
            <div class="setting-list">
                <div v-for="item in list" :key="item.label" class="item">
                    <div class="label">{{ item.label }}</div>
                </div>
            </div>
        </div>
    </Widget>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Widget from '@/components/tags/chart/widget'

const list = [
    {
        label: '间隔时间（秒）'
    },
    {
        label: '切换时间（秒）'
    },
    {
        label: '开始延迟（秒）'
    },
    {
        label: '结束时间（秒）'
    },
    {
        label: '循环播放'
    }
]

const play = ref(false)
const value1 = ref(10)

</script>

<style src="./animation.styl" lang="stylus" scoped></style>
