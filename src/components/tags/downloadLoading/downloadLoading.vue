<!--
* DownloadLoading
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-09 11:13:41
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
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'
const CHART = injectStrict(ChartKey)

const isShow = ref(false)

const download = (str:string, suffix = 'png') => {
    const a = document.createElement('a')
    a.download = CHART?.value.name + '.' + suffix
    a.href = str
    document.body.appendChild(a)
    a.click()
    a.remove()
}

emitter.on('startDownload', () => {
    isShow.value = true
})

emitter.on('endDownload', (data:any) => {
    download(data.image, data.suffix)
    isShow.value = false
})

</script>

<style src="./downloadLoading.styl" lang="stylus" scoped></style>
