<template>
    <div class="home">
        <Topbar />

        <div v-loading="loading" class="wrapper">
            <div v-if="isFolder && currentFolder" class="back" @click="handleBack">
                <i class="iconfont icon-fanhui"></i>
                {{ currentFolder.name }}
            </div>
            <div class="container">
                <template v-if="!isFolder">
                    <Folder v-for="item in folders" :key="item.id" :editId="editFolderId" :folder="item" @change="changeFolder" @del="delFolder" />
                    <Chart v-for="item in charts" :key="item.id" :chart="item" @change="changeChart" @del="delChart" />
                </template>
            </div>
            <el-empty v-if="!folders.length && !charts.length && !loading" description="当前内容为空" :image-size="200" />

            <ChartTemplate v-if="isShowChartTemplate" @close="isShowChartTemplate = false"></ChartTemplate>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Topbar from '@/components/tags/topbar'
import Folder from '@/components/tags/folder'
import Chart from '@/components/tags/chartItem'
import ChartTemplate from '@/components/tags/chartTemplate'
import emitter from '@/utils/emitter'
import { FolderObject } from '@/typings/folder'
import { ChartObject } from '@/typings/chart'
import { useFolderStore } from '@/stores/folder'
import { useChartStore } from '@/stores/chart'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
// @ts-ignore
import _ from 'loadsh'

const route = useRoute()
const router = useRouter()

const folderStore = useFolderStore()
const chartStore = useChartStore()
const folders = computed(() => folderStore.list as FolderObject[])
const charts = computed(() => chartStore.list as ChartObject[])
const routeType = computed( () => route.params.type)
const routeId = computed(( ) => +route.params.id)
const isFolder = computed(() => routeType.value === 'folder')
const loading = ref(true)
const editFolderId:any = ref(null)
const isShowChartTemplate = ref(false)

const currentFolder = computed(() => folders.value.find((v) => v.id === routeId.value))

const handleCreateFolder = async () => {
    const folder:any = {
        name: '未命名文件夹',
        createdTime: new Date().getTime(),
        updatedTime: new Date().getTime()
    }
    const id = await folderStore.set(folder)
    editFolderId.value = id
    setTimeout(() => {
        editFolderId.value = ''
    },100)
}

const handleBack = () => {
    router.push({ name: 'home' })
}

const changeFolder = (folder: FolderObject) => {
    const current: any = folders.value.find(v => v.id === folder.id)
    current.name = folder.name
    current.updatedTime = new Date().getTime()
    folderStore.set(current)
}

const changeChart = (chart: ChartObject) => {
    const current: any = _.cloneDeep(chart)
    current.updatedTime = new Date().getTime()
    chartStore.set(current)
}

const delFolder = (folder: FolderObject) => {
    ElMessageBox.confirm(
        '确定要删除?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            folderStore.del(folder.id)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
}

const delChart = (chart: ChartObject) => {
    ElMessageBox.confirm(
        '确定要删除?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // @ts-ignore
            chartStore.del(chart.id)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
}

const handleCreateChart = () => {
    isShowChartTemplate.value = true
}

emitter.on('createFolder', () => {
    handleCreateFolder()
})

emitter.on('createChart', () => {
    handleCreateChart()
})

const broadcast = () => {
    const bc = new BroadcastChannel('chart')
    bc.onmessage = async (event) => {
        await folderStore.update()
        await chartStore.update()
    }
}

onMounted( async () => {
    document.querySelector('html')?.classList.remove('dark')
    await folderStore.update()
    await chartStore.update()
    loading.value = false
    broadcast()
})

</script>

<style src="./home.styl" lang="stylus" scoped></style>
