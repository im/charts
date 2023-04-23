<!--
* Folder
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-21 16:30:03
* @since 0.0.0
-->

<template>
    <div class="folder-box">
        <div class="content">
            <img :src="getImg('folder-big.svg')" />
            <el-dropdown :teleported="false" @command="handleCommand">
                <div class="operation">
                    <i class="iconfont icon-gengduo"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="edit">
                            <i class="iconfont icon-weibiaoti520"></i>
                            编辑
                        </el-dropdown-item>
                        <el-dropdown-item command="del">
                            <i class="iconfont icon-gengduo"></i>
                            删除
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="name">
            <el-input v-if="isEdit" ref="inputRef" v-model.trim="name" v-click-outside="onClickOutside" @keydown.enter="enter"></el-input>
            <div v-else class="text" @click="handleEdit">{{ name }} <i class="iconfont icon-weibiaoti520"></i></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, nextTick, onMounted, defineEmits } from 'vue'
import getImg from '@/utils/getImg'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'

const props = defineProps({
    folder: {
        type: Object,
        default: () => ({})
    }
})

const emits = defineEmits(['change', 'del'])

const name = ref('未命名文件夹')
const cacheName = ref('')
const isEdit = ref(false)
const inputRef = ref<HTMLElement | null | any>(null)

const handleEdit = () => {
    isEdit.value = true
    handleSelect()
}

const handleSelect = () => {
    nextTick(() => {
        inputRef.value?.select()
    })
}

const save = () => {
    if (!name.value) {
        name.value = cacheName.value
    }
    isEdit.value = false

    emits('change', {
        ...props.folder,
        name: name.value
    })
}

const enter = () => {
    save()
}

const handleCommand = ( command:string ) => {
    if (command === 'del') {
        emits('del', props.folder)
    }

    if (command === 'edit') {
        handleEdit()
    }
}

const onClickOutside = () => {
    save()
}

onMounted(() => {
    name.value = props.folder.name
    cacheName.value = props.folder.name
    props.folder.isEdit && handleEdit()
})

</script>

<style src="./folder.styl" lang="stylus" scoped></style>
