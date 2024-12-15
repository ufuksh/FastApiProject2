<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="user.username" placeholder="Username" required>
      <input type="password" v-model="user.password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = { username: '', password: '' } // username olarak değiştirildi
    const error = ''

    const handleLogin = async () => {
      try {
        const response = await api.post('/users/login', user)
        store.commit('setToken', response.data.token)
        router.push('/')
      } catch (err) {
        console.error(err) // Hata loglama
        this.error = 'Login failed.'
      }
    }

    return { user, error, handleLogin }
  }
}
</script>
