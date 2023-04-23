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
                </template>
                <el-empty v-if="!folders.length" description="当前内容为空" :image-size="200" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import Topbar from '@/components/tags/topbar'
import Folder from '@/components/tags/folder'
import emitter from '@/utils/emitter'
import { FolderObject } from '@/typings/folder'
import { useFolderStore } from '@/stores/folder'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const folderStore = useFolderStore()
const folders = computed(() => folderStore.list as FolderObject[])
const routeType = computed(() => route.params.type)
const routeId = computed(() => +route.params.id)
const isFolder = computed(() => routeType.value === 'folder')
const loading = ref(true)
const editFolderId:any = ref(null)

const currentFolder = computed(() => folders.value.find((v) => v.id === routeId.value))

const handleCreate = async () => {
    const folder:any = {
        name: '未命名文件夹',
        createdTime: new Date().getTime(),
        updatedTime: new Date().getTime()
    }
    const id = await folderStore.set(folder)
    editFolderId.value = id
}

const handleBack = () => {
    router.push({ name: 'home' })
}

const changeFolder = (folder: FolderObject) => {
    const current: any = folders.value.find(v => v.id === folder.id)
    current.name = folder.name
    current.updatedTime = new Date().getTime()
    folderStore.set(current)
    // ElMessage({
    //     message: '保存成功',
    //     type: 'success',
    // })
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

emitter.on('createFolder', () => {
    handleCreate()
})

onMounted( async () => {
    await folderStore.update()
    loading.value = false
})

</script>

<style src="./home.styl" lang="stylus" scoped></style>
