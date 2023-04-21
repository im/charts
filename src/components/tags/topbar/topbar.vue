<!--
* Topbar
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-21 10:02:07
* @since 0.0.0
-->

<template>
    <div class="topbar">
        <h1 class="logo" title="charts">
            <a href="/charts/">
                <img src="/logo.svg" alt="charts" />
                Charts
            </a>
        </h1>
        <el-button size="large">
            <i class="iconfont icon-jia"></i>新建图表
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { computed, } from 'vue'
</script>

<style src="./topbar.styl" lang="stylus"></style>
