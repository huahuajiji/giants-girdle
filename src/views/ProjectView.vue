<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProject } from '../data/projects'

const route = useRoute()
const project = computed(() => getProject(route.params.id))
</script>

<template>
  <div id="main" class="alt">
    <section id="one">
      <div class="inner">
        <template v-if="project && !project.placeholder">
          <header class="major">
            <h1>{{ project.title }}</h1>
            <p>{{ project.desc }}</p>
          </header>
          <span class="image fit"><img :src="project.image" alt="" /></span>
          <div class="row">
            <div class="col-6 col-12-medium">
              <p v-for="(para, i) in project.body" :key="i">{{ para }}</p>
            </div>
            <div v-if="project.gallery.length" class="col-6 col-12-medium">
              <span
                v-for="(img, i) in project.gallery"
                :key="i"
                class="image fit"
              >
                <img :src="img" alt="" />
              </span>
            </div>
          </div>
        </template>

        <template v-else>
          <header class="major">
            <h1>项目尚未开放</h1>
          </header>
          <p>这个位置还空着，项目资料准备中。</p>
          <ul class="actions">
            <li><RouterLink to="/" class="button">返回首页</RouterLink></li>
          </ul>
        </template>
      </div>
    </section>
  </div>
</template>
