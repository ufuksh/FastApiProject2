<template>
  <div>
    <h2>Class Schedules</h2>
    <ul>
      <li v-for="schedule in schedules" :key="schedule.id">
        {{ schedule.class_name }} - {{ schedule.assigned_teacher }} ({{ schedule.schedule_timings }})
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  name: 'ClassSchedules',
  data() {
    return {
      schedules: []
    }
  },
  async created() {
    const response = await api.get('/schedules/')
    this.schedules = response.data
  }
}
</script>
