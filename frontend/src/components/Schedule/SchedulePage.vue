<script setup>
import { ref, onMounted } from "vue";
import { useScheduleStore } from "@/store/ScheduleStore.ts";

// Pinia Store
const scheduleStore = useScheduleStore();

// Düzenleme (edit) durumunu takip eder
const isEdit = ref(false);

// Seçili (düzenlenecek) schedule
const selectedSchedule = ref({
  id: null,
  title: "",
  time: "",
});

// Yeni schedule verisi
const newSchedule = ref({
  title: "",
  time: "",
});

// Tüm kayıtları al
const getSchedules = async () => {
  await scheduleStore.getSchedule();
};

// Yeni kayıt oluştur
const createNewSchedule = async () => {
  await scheduleStore.createSchedule(newSchedule.value);
  // Formu temizle
  newSchedule.value = { title: "", time: "" };
};

// Düzenlemeye başla
const editSchedule = (schedule) => {
  isEdit.value = true;
  selectedSchedule.value = { ...schedule };
};

// Güncelle
const updateSchedule = async () => {
  await scheduleStore.updateSchedule(selectedSchedule.value);
  isEdit.value = false;
  selectedSchedule.value = { id: null, title: "", time: "" };
};

// Sil
const deleteSchedule = async (id) => {
  await scheduleStore.deleteSchedule(id);
};

// Bileşen yüklendiğinde verileri getir
onMounted(() => {
  getSchedules();
});
</script>

<template>
  <div class="schedule-form">
    <h2>{{ isEdit ? "Program Güncelle" : "Program Ekle" }}</h2>
    <form @submit.prevent="isEdit ? updateSchedule() : createNewSchedule()">
      <div class="form-group">
        <label for="title">Başlık</label>
        <template v-if="isEdit">
          <input
            v-model="selectedSchedule.title"
            type="text"
            id="title"
            placeholder="Program başlığı"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newSchedule.title"
            type="text"
            id="title"
            placeholder="Program başlığı"
            required
          />
        </template>
      </div>

      <div class="form-group">
        <label for="time">Zaman</label>
        <template v-if="isEdit">
          <input
            v-model="selectedSchedule.time"
            type="text"
            id="time"
            placeholder="Program zamanı"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newSchedule.time"
            type="text"
            id="time"
            placeholder="Program zamanı"
            required
          />
        </template>
      </div>

      <button type="submit" class="submit-btn">
        {{ isEdit ? "Güncelle" : "Ekle" }}
      </button>
    </form>
  </div>

  <div class="schedule-table">
    <h2>Program Listesi</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Başlık</th>
          <th>Zaman</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in scheduleStore.stateSchedule"
          :key="schedule.id"
        >
          <td>{{ schedule.id }}</td>
          <td>{{ schedule.title }}</td>
          <td>{{ schedule.time }}</td>
          <td>
            <button class="edit-btn" @click="editSchedule(schedule)">
              Düzenle
            </button>
            <button class="delete-btn" @click="deleteSchedule(schedule.id)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.schedule-form,
.schedule-table {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #495057;
  font-family: Arial, sans-serif;
}

.schedule-form h2,
.schedule-table h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  color: #495057;
  background-color: #ffffff;
  transition: all 0.3s;
}

.form-group input:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: scale(1.03);
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.schedule-table thead tr {
  background-color: #f1f3f5;
  color: #495057;
}

.schedule-table thead th {
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
}

.schedule-table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

.schedule-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.schedule-table tbody td {
  padding: 10px;
}

.edit-btn,
.delete-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s;
  margin-right: 5px;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
