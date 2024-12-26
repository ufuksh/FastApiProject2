import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./assets/base.css"; // Genel stil dosyası
import "tailwindcss/tailwind.css"; // TailwindCSS framework

const app = createApp(App);

app.use(createPinia()); // Pinia'yı kullanıma al
app.use(router); // Vue Router'ı kullanıma al

app.mount("#app");
