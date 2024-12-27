import { createRouter, createWebHistory } from "vue-router";

// Örnek rotalar
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home/HomePage.vue"),
  },
  {
    path: "/students",
    name: "Students",
    component: () => import("../components/Student/StudentPage.vue"),
  },
  {
    path: "/teachers",
    name: "Teachers",
    component: () => import("../components/Teacher/TeacherPage.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../components/User/User.vue"),
  },
  {
    path: "/schedules",
    name: "Schedules",
    component: () => import("../components/Schedule/SchedulePage.vue"),
  },
  // Ana sayfaya yönlendirme
  {
    path: "/",
    redirect: "/home"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Refresh veya sayfa yüklendiğinde /home sayfasına yönlendirmek için
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/Home');  // "/" path geldiğinde ana sayfaya yönlendir
  } else {
    next();  // Diğer rotalarda normal işlem
  }
});

export default router;