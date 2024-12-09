<!-- src/views/Students.vue -->
<template>
  <div>
    <h2>Students</h2>
    <form @submit.prevent="addStudent">
      <div>
        <label for="name">Name:</label>
        <input v-model="newStudent.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="newStudent.email" id="email" type="email" required />
      </div>
      <button type="submit">Add Student</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>

    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }} - {{ student.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      students: [],
      newStudent: {
        name: '',
        email: ''
      },
      error: '',
      success: ''
    }
  },
  created() {
    this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await api.get('/students/')
        this.students = response.data
      } catch (err) {
        console.error('Error fetching students:', err)
      }
    },
    async addStudent() {
      try {
        const response = await api.post('/students/', this.newStudent)
        this.students.push(response.data)
        this.success = 'Student added successfully.'
        this.error = ''
        this.newStudent = { name: '', email: '' }
      } catch (err) {
        this.error = err.response?.data?.detail || 'Failed to add student.'
        this.success = ''
      }
    }
  }
}
</script>
