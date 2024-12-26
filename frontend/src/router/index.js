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
    path: "/schedule",
    name: "Schedule",
    component: () => import("../components/Schedule/SchedulePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
