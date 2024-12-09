<!-- src/views/Schedules.vue -->
<template>
    <div>
      <h2>Schedules</h2>
      <form @submit.prevent="addSchedule">
        <div>
          <label for="title">Title:</label>
          <input v-model="newSchedule.title" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="newSchedule.description" id="description" />
        </div>
        <div>
          <label for="start_time">Start Time:</label>
          <input v-model="newSchedule.start_time" id="start_time" type="datetime-local" required />
        </div>
        <div>
          <label for="end_time">End Time:</label>
          <input v-model="newSchedule.end_time" id="end_time" type="datetime-local" required />
        </div>
        <div>
          <label for="teacher_id">Teacher:</label>
          <select v-model="newSchedule.teacher_id" id="teacher_id" required>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }}
            </option>
          </select>
        </div>
        <button type="submit">Add Schedule</button>
      </form>
      <p v-if="error" style="color:red">{{ error }}</p>
      <p v-if="success" style="color:green">{{ success }}</p>
  
      <ul>
        <li v-for="schedule in schedules" :key="schedule.id">
          <strong>{{ schedule.title }}</strong> - {{ schedule.description }}
          <br />
          From: {{ schedule.start_time }} To: {{ schedule.end_time }}
          <br />
          Teacher: {{ schedule.teacher.name }}
          <br />
          Student: {{ schedule.student.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api'
  
  export default {
    data() {
      return {
        schedules: [],
        teachers: [],
        students: [],
        newSchedule: {
          title: '',
          description: '',
          start_time: '',
          end_time: '',
          teacher_id: ''
        },
        error: '',
        success: ''
      }
    },
    created() {
      this.fetchSchedules()
      this.fetchTeachers()
      this.fetchStudents()
    },
    methods: {
      async fetchSchedules() {
        try {
          const response = await api.get('/schedules/')
          this.schedules = response.data
        } catch (err) {
          console.error('Error fetching schedules:', err)
        }
      },
      async fetchTeachers() {
        try {
          const response = await api.get('/teachers/')
          this.teachers = response.data
        } catch (err) {
          console.error('Error fetching teachers:', err)
        }
      },
      async fetchStudents() {
        try {
          const response = await api.get('/students/')
          this.students = response.data
        } catch (err) {
          console.error('Error fetching students:', err)
        }
      },
      async addSchedule() {
        try {
          const scheduleData = {
            ...this.newSchedule,
            student_id: this.userId  // Oturum açmış kullanıcının öğrenci ID'si olabilir
          }
          const response = await api.post('/schedules/', scheduleData)
          this.schedules.push(response.data)
          this.success = 'Schedule added successfully.'
          this.error = ''
          this.newSchedule = {
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            teacher_id: ''
          }
        } catch (err) {
          this.error = err.response?.data?.detail || 'Failed to add schedule.'
          this.success = ''
        }
      }
    },
    computed: {
      // Eğer oturum açmış kullanıcının ID'sine ihtiyacınız varsa, Vuex store'dan çekebilirsiniz
      userId() {
        return this.$store.state.user?.id
      }
    }
  }
  </script>
  