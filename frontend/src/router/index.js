// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import Students from '../views/StudentsPage.vue'
import Teachers from '../views/TeachersPage.vue'
import Schedules from '../views/ClassSchedules.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    meta: { requiresAuth: true }
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: Teachers,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedules',
    name: 'Schedules',
    component: Schedules,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
