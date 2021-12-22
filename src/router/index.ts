import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Reg = () => import('@/views/Reg.vue')
const Index = () => import('@/views/channels/Index.vue')
const Template1 = () => import('@/views/channels/Template1.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
