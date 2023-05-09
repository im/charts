<!--
* Topbar
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-21 10:02:07
* @since 0.0.0
-->

<template>
    <div class="topbar">
        <h1 class="logo" title="charts">
            <router-link tag="a" :to="{ name: 'home' }">
                <img src="/logo.svg" alt="charts" />
                Charts
            </router-link>
        </h1>
        <div class="right">
            <el-button size="large" @click="createChart">
                <i class="iconfont icon-jia"></i>新建图表
            </el-button>
            <!-- <el-button v-if="!isFolder" size="large" @click="createFolder">
                <i class="iconfont icon-jia"></i>新建文件夹
            </el-button> -->
            <!-- <el-input
                v-model="keyword"
                size="large"
                class="search"
                placeholder="在当前页面搜索">
                <template #prefix>
                    <i class="iconfont icon-search-2-copy"></i>
                </template>
            </el-input> -->
        </div>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import emitter from '@/utils/emitter'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const routeType = computed(() => route.params.type)
const isFolder = computed(() => routeType.value === 'folder')

const keyword = ref('')

const createFolder = () => {
    emitter.emit('createFolder', '')
}

const createChart = () => {
    emitter.emit('createChart', '')
}

</script>

<style src="./topbar.styl" lang="stylus"></style>
