import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/statistics',name: 'Statistics', component: () => import('../views/home/Statistics') },
      { path: '/coach',name: 'Coach', component: () => import('../views/home/Coach') },
      { path: '/trainee',name: 'Trainee', component: () => import('../views/home/Trainee') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
