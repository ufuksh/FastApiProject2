// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
