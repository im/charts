<!--
* Home
* @author tangxiaomi <81195314@qq.com>
* @date 2023-04-20 15:01:41
* @since 0.0.0
-->

<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<route lang="yaml">
    name: home
    meta:
      requiresAuth: true
</route>

<script lang="ts" setup>
import { computed, } from 'vue'
</script>

<style src="./home.styl" lang="stylus" scoped></style>
