<script setup>
function scrollToWheel() {
  document.getElementById('wheel')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="banner" class="major">
    <div class="inner">
      <header class="major">
        <h1>地图设计</h1>
      </header>
      <div class="content">
        <p>记录我用 GIS 与数据可视化做的项目<br />
        持续更新中。</p>
        <ul class="actions">
          <li><a href="#wheel" class="button next" @click.prevent="scrollToWheel">开始浏览</a></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
/* 横幅也是一个吸附点：从转盘区向上滚时同样有吸附目标，双向对称。
   这里用非 scoped，因为 #banner 的样式主体在全局 main.css 里。 */
#banner {
  scroll-snap-align: start;
}
</style>
