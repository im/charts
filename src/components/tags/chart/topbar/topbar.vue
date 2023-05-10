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
                <div class="name">{{ CHART.name }}
                    <!-- <i class="iconfont icon-weibiaoti520"></i> -->
                </div>
            </div>
        </div>
        <div class="right">
            <div class="operation">
                <el-popover
                    placement="bottom"
                    :width="700"
                    trigger="click"
                    content="">
                    <div class="data-table-wrapper">
                        <DataTable />
                    </div>
                    <template #reference>
                        <div class="item">
                        <div>
                            <i class="iconfont icon-weibiaoti520"></i>
                            <div class="text">编辑数据</div>
                        </div>
                    </div>
                    </template>
                </el-popover>

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
import { computed, defineProps, inject, onMounted } from 'vue'
import emitter from '@/utils/emitter'
import DataTable from '@/components/tags/chart/dataTable'

import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'

const CHART = injectStrict(ChartKey)

const handleChart = (command:string) => {
    emitter.emit('handleChart', command)
}

</script>

<style src="./topbar.styl" lang="stylus" scoped></style>
