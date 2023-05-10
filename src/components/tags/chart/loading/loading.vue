<!--
* Loading
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-10 09:33:29
* @since 0.0.0
-->

<template>
   <div v-if="isShow" class="download-loading">
        <div v-loading="true" class="wrapper" element-loading-background="transparent" element-loading-text="下载中, 请稍后...">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import emitter from '@/utils/emitter'

const isShow = ref(false)

emitter.on('chartLoading', (show: any) => {
    isShow.value = show
})

</script>

<style src="./loading.styl" lang="stylus" scoped></style>
