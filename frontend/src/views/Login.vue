<!-- src/views/Login.vue -->
<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input v-model="credentials.username" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="credentials.password" id="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color:red">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      ...mapActions(['login']),
      async handleLogin() {
        try {
          await this.login(this.credentials)
          this.$router.push('/')
        } catch (err) {
          this.error = 'Invalid username or password'
        }
      }
    }
  }
  </script>
  