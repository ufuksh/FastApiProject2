<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api/api.js"; // API istekleri için doğru yolu kontrol edin

// Veri durumları
const students = ref([]);
const teachers = ref([]);
const schedules = ref([]);
const isLoading = ref(false);

// API'den verileri al
const fetchData = async () => {
  isLoading.value = true;
  try {
    // Tüm API çağrılarını aynı anda çalıştırmak için Promise.all kullanıyoruz
    const [studentsRes, teachersRes, schedulesRes] = await Promise.all([
      apiClient.getStudents(),
      apiClient.getTeachers(),
      apiClient.getSchedules(),
    ]);
    // Gelen verileri ref'lere atama
    students.value = studentsRes.data || [];
    teachers.value = teachersRes.data || [];
    schedules.value = schedulesRes.data || [];
  } catch (error) {
    console.error("Veriler alınırken hata oluştu:", error);
  } finally {
    isLoading.value = false;
  }
};

// Sayfa yüklendiğinde verileri getir
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Ana Sayfa</h1>
    <div v-if="isLoading" class="loading">Yükleniyor...</div>
    <div v-else>
      <!-- Öğrenciler Tablosu -->
      <div class="table-section">
        <h2>Öğrenciler</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.first_name }}</td>
              <td>{{ student.last_name }}</td>
              <td>{{ student.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Öğretmenler Tablosu -->
      <div class="table-section">
        <h2>Öğretmenler</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Bölüm</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.id">
              <td>{{ teacher.id }}</td>
              <td>{{ teacher.first_name }}</td>
              <td>{{ teacher.last_name }}</td>
              <td>{{ teacher.department }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Programlar Tablosu -->
      <div class="table-section">
        <h2>Programlar</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Başlık</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="schedule in schedules" :key="schedule.id">
              <td>{{ schedule.id }}</td>
              <td>{{ schedule.title }}</td>
              <td>{{ schedule.start_time }}</td>
              <td>{{ schedule.end_time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.table-section {
  margin-bottom: 30px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f4f4f4;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
}
</style>