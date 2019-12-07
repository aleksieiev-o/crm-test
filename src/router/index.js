import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'overlay' },
    component: () => import('../layouts/LayoutOverlay'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'overlay' },
    component: () => import('../layouts/LayoutOverlay'),
  },
  {
    path: '/main',
    name: 'main',
    meta: { layout: 'main' },
    component: () => import('../layouts/LayoutMain'),
  },
  {
    path: '/',
    name: 'page-not-found',
    component: () => import('../layouts/PageNotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
