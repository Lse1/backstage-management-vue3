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
        path: '/shopData',
        name: 'shopData',
        component: () => import('../views/shopData/index.vue')
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
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'register' && !token) next({ name: 'register' })
  else next()
})

export default router
