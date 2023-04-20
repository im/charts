<!--
* Home
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-20 15:01:41
* @since 0.0.0
-->

<template>
    <div>
        <h1>project</h1>
        <h1>projectId, {{ projectId }}</h1>
        <h1>count, {{ counter.count }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { computed, } from 'vue'
import { useRoute } from 'vue-router'
import { useCounterStore } from 'stores/project'

const route = useRoute()

const projectId = computed(() => route.params.id)

const counter = useCounterStore()

</script>

<style src="./project.styl" lang="stylus" scoped></style>
