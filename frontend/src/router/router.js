import { createRouter, createWebHistory } from "vue-router";
import Students from "../components/Student/StudentPage.vue";
import Teacher from "../components/Teacher/TeacherPage.vue";
import Schedules from "../components/Schedules/SchedulesPage.vue";
import Users from "../components/User/User.vue";
import Home from "../components/Home/HomePage.vue";

const routes = [
    { path: "/", redirect: "/home" }, // Ana sayfaya yönlendirme
    { path: "/students", name: "Students", component: Students },
    { path: "/teacher", name: "Teacher", component: Teacher },
    { path: "/schedules", name: "Schedules", component: Schedules },
    { path: "/users", name: "Users", component: Users },
    { path: "/home", name: "Home", component: Home },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;