<template>
  <div>
    <h2>Students</h2>
    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.first_name }} {{ student.last_name }} - {{ student.grade }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  name: 'StudentsPage',
  data() {
    return {
      students: []
    }
  },
  async created() {
    const response = await api.get('/students/')
    this.students = response.data
  }
}
</script>
