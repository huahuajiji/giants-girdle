<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  menuOpen: Boolean,
})
const emit = defineEmits(['toggle-menu'])

const route = useRoute()
const isHome = computed(() => route.path === '/')

// 复刻模版 scrollex 对头部的处理（原版见 main.js 里 $banner.scrollex）：
//   横幅可见时：alt（透明、absolute，叠在横幅上，随页面滚走）
//   滚过横幅后：去掉 alt、加 reveal（实色、fixed，带下降出现动画）
//   回到顶部：  恢复 alt
const scrolledPast = ref(false)

function update() {
  const banner = document.getElementById('banner')
  if (!banner) return
  const limit = banner.offsetTop + banner.offsetHeight
  scrolledPast.value = window.scrollY > limit - 80
}

// 切回首页时，等新页面渲染完再测一次
watch(isHome, async (home) => {
  if (home) {
    await nextTick()
    update()
  } else {
    scrolledPast.value = false
  }
})

let rafId = 0
function onScrollOrResize() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    if (isHome.value) update()
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
  // 横幅是子组件，可能稍后才挂载，下一帧再测
  rafId = requestAnimationFrame(() => {
    if (isHome.value) update()
  })
})
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
})

const headerClass = computed(() => {
  if (!isHome.value) return {}
  return scrolledPast.value ? { reveal: true } : { alt: true }
})
</script>

<template>
  <header id="header" :class="headerClass">
    <RouterLink to="/" class="logo">
      <strong>Giant's Girdle</strong><span> - 个人项目集</span>
    </RouterLink>
    <nav>
      <a href="#menu" @click.prevent="emit('toggle-menu')">菜单</a>
    </nav>
  </header>
</template>
