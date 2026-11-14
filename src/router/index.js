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
})