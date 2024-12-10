<template>
  <div>
    <h2>Teachers</h2>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        {{ teacher.first_name }} {{ teacher.last_name }} - {{ teacher.subject_specialization }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  name: 'TeachersPage',
  data() {
    return {
      teachers: []
    }
  },
  async created() {
    const response = await api.get('/teachers/')
    this.teachers = response.data
  }
}
</script>
