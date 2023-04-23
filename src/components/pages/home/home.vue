<!--
* Home
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-20 17:26:45
* @since 0.0.0
-->

<template>
    <div class="home">
        <Topbar />
        <div class="wrapper">
            <Folder v-for="item in folders" :key="item.id" :folder="item" @change="changeFolder" @del="delFolder" />
            <el-empty v-if="!folders.length" description="没有数据" :image-size="200" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import Topbar from '@/components/tags/topbar'
import Folder from '@/components/tags/folder'
import emitter from '@/utils/emitter'
import { FolderObject } from '@/typings/folder'
import { v4 as uuid } from 'uuid'
import { useFolderStore } from '@/stores/folder'
import { ElMessageBox, ElMessage } from 'element-plus'

const folderStore = useFolderStore()
const folders = computed(() => folderStore.list as FolderObject[])

const handleCreate = () => {
    const folder:FolderObject = {
        id: uuid(),
        name: '未命名文件夹',
        createdTime: new Date().getTime(),
        updatedTime: new Date().getTime()
    }
    folders.value.unshift({
        ...folder,
        isEdit: true
    })
    folderStore.set(folder.id, folder)
}

const changeFolder = (folder: FolderObject) => {
    const current: any = folders.value.find(v => v.id === folder.id)
    current.name = folder.name
    current.updatedTime = new Date().getTime()
    folderStore.set(folder.id, current)
    ElMessage({
        message: '保存成功',
        type: 'success',
    })
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

onMounted(() => {
    folderStore.update()
})

</script>

<style src="./home.styl" lang="stylus" scoped></style>
