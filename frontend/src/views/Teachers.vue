<!-- src/views/Teachers.vue -->
<template>
  <div>
    <h2>Teachers</h2>
    <form @submit.prevent="addTeacher">
      <div>
        <label for="name">Name:</label>
        <input v-model="newTeacher.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="newTeacher.email" id="email" type="email" required />
      </div>
      <button type="submit">Add Teacher</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>

    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        {{ teacher.name }} - {{ teacher.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      teachers: [],
      newTeacher: {
        name: '',
        email: ''
      },
      error: '',
      success: ''
    }
  },
  created() {
    this.fetchTeachers()
  },
  methods: {
    async fetchTeachers() {
      try {
        const response = await api.get('/teachers/')
        this.teachers = response.data
      } catch (err) {
        console.error('Error fetching teachers:', err)
      }
    },
    async addTeacher() {
      try {
        const response = await api.post('/teachers/', this.newTeacher)
        this.teachers.push(response.data)
        this.success = 'Teacher added successfully.'
        this.error = ''
        this.newTeacher = { name: '', email: '' }
      } catch (err) {
        this.error = err.response?.data?.detail || 'Failed to add teacher.'
        this.success = ''
      }
    }
  }
}
</script>
