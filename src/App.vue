<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'

const menuOpen = ref(false)
</script>

<template>
  <AppHeader :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />
  <AppNav :open="menuOpen" @close="menuOpen = false" />
  <div id="wrapper">
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
/* 页面级的接近吸附：滚动停在转盘区附近时轻轻吸住，明确继续滚动仍可离开。
   用 proximity 而不是 mandatory，避免把用户锁死在某个位置。 */
html {
  scroll-snap-type: y proximity;
}
</style>