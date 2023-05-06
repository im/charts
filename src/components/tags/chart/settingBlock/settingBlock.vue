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
            <DataTable :chart="chart"></DataTable>
       </div>

       <div v-if="view === 'chart'" class="chart-setting">
        chart
       </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, reactive } from 'vue'
import DataTable from '@/components/tags/chart/dataTable'

const props:any = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    }
})

type viewType = 'data' | 'chart'

type viewObj = {
    value: viewType
    label: string
}

const viewList: Array<viewObj> = [{
    value: 'data',
    label: '编辑数据'
}, {
    value: 'chart',
    label: '编辑图表'
}]

const view = ref('chart')

const handleView = (v: viewType) => {
    view.value = v
}
</script>

<style src="./settingBlock.styl" lang="stylus" scoped></style>
