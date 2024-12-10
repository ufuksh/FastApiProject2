<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="newUser.email" placeholder="Email" required>
      <input v-model="newUser.username" placeholder="Username" required>
      <input type="password" v-model="newUser.password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'RegisterPage',
  data() {
    return {
      newUser: { email: '', username: '', password: '' },
      error: '',
      success: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        await api.post('/users/', this.newUser)
        this.success = 'Registration successful.'
        this.error = ''
      } catch (err) {
        this.error = 'Registration failed.'
        this.success = ''
      }
    }
  }
}
</script>
