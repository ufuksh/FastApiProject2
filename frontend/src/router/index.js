import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import StudentsPage from '../views/StudentsPage.vue'
import TeachersPage from '../views/TeachersPage.vue'
import ClassSchedules from '../views/ClassSchedules.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/students', name: 'Students', component: StudentsPage, meta: { requiresAuth: true } },
  { path: '/teachers', name: 'Teachers', component: TeachersPage, meta: { requiresAuth: true } },
  { path: '/schedules', name: 'Schedules', component: ClassSchedules, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Basit Navigation Guard (Giriş kontrolü)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
