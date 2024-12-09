<!-- src/views/Register.vue -->
<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Username:</label>
          <input v-model="user.username" id="username" required />
          <span v-if="$v.user.username.$error">Username is required.</span>
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="user.email" id="email" type="email" required />
          <span v-if="$v.user.email.$error">Valid email is required.</span>
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="user.password" id="password" type="password" required />
          <span v-if="$v.user.password.$error">Password is required.</span>
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error" style="color:red">{{ error }}</p>
      <p v-if="success" style="color:green">{{ success }}</p>
    </div>
  </template>
  
  <script>
  import { required, email } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import api from '../services/api'
  
  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        error: '',
        success: ''
      }
    },
    validations() {
      return {
        user: {
          username: { required },
          email: { required, email },
          password: { required }
        }
      }
    },
    setup() {
      return { v$: useVuelidate() }
    },
    methods: {
      async handleRegister() {
        this.v$.$touch()
        if (this.v$.$invalid) {
          this.error = 'Please fill out the form correctly.'
          this.success = ''
          return
        }
        try {
          const response = await api.post('/users/', this.user)
          this.success = 'Registration successful. You can now login.'
          this.error = ''
          this.user = { username: '', email: '', password: '' }
        } catch (err) {
          this.error = err.response?.data?.detail || 'Registration failed.'
          this.success = ''
        }
      }
    }
  }
  </script>
  
  <style scoped>
  span {
    color: red;
    font-size: 0.8em;
  }
  </style>
  