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

        <el-popover
            placement="bottom"
            :width="700"
            trigger="click"
            content="">
            <div class="chart-list">
                <div v-for="chart in chartTypes" :key="chart.value" class="chart-block" @click="handleChart(chart)">
                    <div class="tag">{{ chart.parentLabel }}</div>
                    <div class="preview">
                        <PreviewImage :chart="chart" />
                    </div>
                    <div class="name-box">
                        {{ chart.label }}
                    </div>
                </div>
            </div>
            <template #reference>
                <el-button size="large">
                    <i class="iconfont icon-jia"></i>新建图表
                </el-button>
            </template>
        </el-popover>

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
import PreviewImage from '@/components/tags/previewImage'
import { getChartTypes } from '@/constants/chartType'
import { ChartTypeObject, ChartObject } from '@/typings/chart'
import { useChartStore } from '@/stores/chart'
import { createConfig } from '@/chart/config'

const route = useRoute()
const routeType = computed(() => route.params.type)
const isFolder = computed(() => routeType.value === 'folder')

const keyword = ref('')
const chartStore = useChartStore()
const router = useRouter()

const chartTypes = computed(() => {
    const types = getChartTypes()
    return types.reduce((acc:any,cur) => {
        const children = cur.children || []
        const results:any = children.map(v => {
            return {
                ...v,
                parentLabel: cur.label
            }
        })
        acc = acc.concat(results)
        return acc
    }, [])
})

const handleChart = async (chart:ChartTypeObject) => {
    const chartData:any = {
        name: chart.label,
        createdTime: new Date().getTime(),
        updatedTime: new Date().getTime(),
        type: chart.value,
        config: createConfig(chart)
    }
    const id = await chartStore.set(chartData)
    router.push({
        name: 'chart',
        params: {
            id
        }
    })
}

const createFolder = () => {
    emitter.emit('createFolder', '')
}

const createChart = () => {
    emitter.emit('createChart', '')
}

</script>

<style src="./topbar.styl" lang="stylus" scoped></style>
