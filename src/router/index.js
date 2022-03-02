import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/category/index.vue')
      },
      {
        path: '/homeData',
        name: 'homeData',
        component: () => import('../views/homeData/index.vue')
      },
      {
        path: '/otherData',
        name: 'otherData',
        component: () => import('../views/otherData/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
