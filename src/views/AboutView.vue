<script setup>
import mePhoto from '../images/fulls/profile.jpg'

// 草稿：占位内容，等你提供自己的介绍
const stack = ['ArcGIS 全家桶（ArcMap、ArcGIS Pro、ArcGIS Server、AGOL）', 'Python（Pandas、GeoPandas、ArcPy、PyQGIS）', 'PostGIS / PostgreSQL', 'GDAL', 'QGIS']
</script>

<template>
  <div id="main" class="alt">
    <section id="one">
      <div class="inner">
        <header class="major">
          <h1>关于</h1>
        </header>

        <span class="image right"><img :src="mePhoto" alt="个人照片" /></span>
        <div class="col-6 col-12-small">
          <p>
            这里写你的自我介绍：专业背景、做过什么、关注什么方向、为什么做 WebGIS。
            可以写两三段，第一段讲身份和经历，第二段讲技术和兴趣。
          </p>

          <h4>我用到的空间分析与可视化工具</h4>
          <ul>
            <li v-for="item in stack" :key="item">{{ item }}</li>
          </ul>

          <h4>随时可以联系我：</h4>
          <ul>
            <li>邮箱：待填写</li>
            <li>GitHub：待填写</li>
            <li>常驻城市：待填写</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
