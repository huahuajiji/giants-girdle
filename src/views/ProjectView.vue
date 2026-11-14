<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>项目页，id = {{ route.params.id }}</div>
</template>