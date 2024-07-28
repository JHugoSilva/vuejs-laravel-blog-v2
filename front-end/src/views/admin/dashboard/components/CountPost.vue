<script lang="ts" setup>

defineProps<{
    countPost: number
}>()
</script>
<template>
    <h1 align="center">{{ countPost }}</h1>
</template>