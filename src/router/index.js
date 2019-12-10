import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/AuthAuthorization'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/AuthRegister'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('../views/AppCategories'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { layout: 'main' },
    component: () => import('../views/AppDetailRecord'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main' },
    component: () => import('../views/AppHistory'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main' },
    component: () => import('../views/AppPlanning'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('../views/AppProfile'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('../views/AppRecord'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../views/AppHome'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
