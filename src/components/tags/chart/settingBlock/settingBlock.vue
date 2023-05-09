<!--
* SettingBlock
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-25 14:33:26
* @since 0.0.0
-->

<template>
    <div class="setting-block">
       <div class="tabs">
            <div v-for="item in viewList" :key="item.value" class="item" :class="{ active: view === item.value }" @click="handleView(item.value)">{{ item.label }}</div>
       </div>
       <div v-if="view === 'data'" class="data-table">
            <DataTable></DataTable>
       </div>

       <div v-show="view === 'setting'" class="chart-setting">
            <Setting></Setting>
       </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, reactive, inject } from 'vue'
import DataTable from '@/components/tags/chart/dataTable'
import Setting from '@/components/tags/chart/setting'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
const CHART = injectStrict(ChartKey)

type viewType = 'data' | 'setting'

type viewObj = {
    value: viewType
    label: string
}

const viewList: Array<viewObj> = [{
    value: 'setting',
    label: '编辑图表'
}, {
    value: 'data',
    label: '编辑数据'
}]

const view = ref('setting')

const handleView = (v: viewType) => {
    view.value = v
}
</script>

<style src="./settingBlock.styl" lang="stylus" scoped></style>
