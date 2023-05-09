<!--
* ChartItem
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-24 09:25:00
* @since 0.0.0
-->

<template>
     <div class="chart-box">
        <div class="content" @click="handleChart">
            <PreviewImage :chart="chart" />
            <el-dropdown :teleported="false" @command="handleCommand">
                <div class="operation" @click.stop>
                    <i class="iconfont icon-gengduo"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="edit" @click.stop>
                            <i class="iconfont icon-weibiaoti520"></i>
                            编辑
                        </el-dropdown-item>
                        <el-dropdown-item command="del" @click.stop>
                            <i class="iconfont icon-shanchu"></i>
                            删除
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="name">
            <el-input v-if="isEdit" ref="inputRef" v-model.trim="name" v-click-outside="onClickOutside" @keydown.enter="enter"></el-input>
            <div v-else class="text" @click="handleEdit"><span>{{ name }}</span> <i class="iconfont icon-weibiaoti520"></i></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, nextTick, onMounted, defineEmits } from 'vue'
import { getChartImg } from '@/utils/getImg'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import PreviewImage from '@/components/tags/previewImage'

const router = useRouter()

const props = defineProps({
    chart: {
        type: Object,
        default: () => ({})
    },
    editId: {
        type: Number,
        default: null
    }
})

const emits = defineEmits(['change', 'del'])

const name = ref('')
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

const handleChart = () => {
    router.push({
        name: 'chart',
        params: {
            id: props.chart.id
        }
    })
    // const { href } = router.resolve({
    //     name: 'chart',
    //     params: {
    //         id: props.chart.id
    //     }
    // })
    // const { origin, pathname } = window.location
    // const url = origin + pathname + href
    // window.open(url, '_blank')
}

const save = () => {
    if (!name.value) {
        name.value = cacheName.value
    }
    isEdit.value = false

    emits('change', {
        ...props.chart,
        name: name.value
    })
}

const enter = () => {
    save()
}

const handleCommand = ( command:string ) => {
    if (command === 'del') {
        emits('del', props.chart)
    }

    if (command === 'edit') {
        nextTick(() => {
            handleEdit()
        })
    }
}

const onClickOutside = () => {
    save()
}

onMounted(() => {
    name.value = props.chart.name
})
</script>

<style src="./chartItem.styl" lang="stylus" scoped></style>
