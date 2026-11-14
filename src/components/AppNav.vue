<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({
  open: Boolean,
})
const emit = defineEmits(['close'])

watch(
  () => props.open,
  (visible) => {
    document.body.classList.toggle('is-menu-visible', visible)
  }
)
onUnmounted(() => document.body.classList.remove('is-menu-visible'))

const links = [
  { to: '/', label: '首页' },
  { to: '/resume', label: '简历' },
  { to: '/about', label: '关于' },
  { to: '/contacts', label: '联系方式' },
]
</script>

<template>
  <!-- 结构对齐模版：.close 是 #menu 的直接子元素（模版里 jQuery 用 append 加的），
       不能放进 .inner，否则会跟随 .inner 的 transform 定位，动画时跳位置 -->
  <nav id="menu">
    <div class="inner">
      <ul class="links">
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" @click="emit('close')">{{ link.label }}</RouterLink>
        </li>
      </ul>
    </div>
    <a href="#menu" class="close" @click.prevent="emit('close')">关闭</a>
  </nav>
</template>