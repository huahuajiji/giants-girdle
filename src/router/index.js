import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResumeView from '../views/ResumeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactsView from '../views/ContactsView.vue'
import ProjectView from '../views/ProjectView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/resume', name: 'resume', component: ResumeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/contacts', name: 'contacts', component: ContactsView },
  { path: '/project/:id', name: 'project', component: ProjectView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  // 换页面时回到顶部；浏览器前进/后退时恢复原来的滚动位置。
  // 不配置的话，Vue Router 会保留旧的 scrollY，短页面就会停在中间或底部。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})