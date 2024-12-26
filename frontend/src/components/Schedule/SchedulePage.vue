<script setup>
import { ref, onMounted } from "vue";
import { useScheduleStore } from "@/store/ScheduleStore.ts";

const scheduleStore = useScheduleStore();

const isEdit = ref(false);
const selectedSchedule = ref({ id: null, title: "", time: "" });

const getSchedules = async () => {
  await scheduleStore.getSchedule();
};

const editSchedule = (schedule) => {
  isEdit.value = true;
  selectedSchedule.value = { ...schedule };
};

const deleteSchedule = async (id) => {
  await scheduleStore.deleteSchedule(id);
};

const updateSchedule = async () => {
  await scheduleStore.updateSchedule(selectedSchedule.value);
  isEdit.value = false;
};

const newSchedule = ref({ title: "", time: "" });

const createNewSchedule = async () => {
  await scheduleStore.createSchedule(newSchedule.value);
  newSchedule.value = { title: "", time: "" }; // Formu temizle
};

onMounted(() => {
  getSchedules();
});
</script>

<template>
  <div class="schedule-form">
    <h2>Program Ekle</h2>
    <form @submit.prevent="createNewSchedule">
      <div class="form-group">
        <label for="title">Başlık</label>
        <input
          v-model="newSchedule.title"
          type="text"
          id="title"
          placeholder="Program başlığını girin"
          required
        />
      </div>
      <div class="form-group">
        <label for="time">Zaman</label>
        <input
          v-model="newSchedule.time"
          type="text"
          id="time"
          placeholder="Program zamanını girin"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Ekle</button>
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
        <tr v-for="schedule in scheduleStore.stateSchedule" :key="schedule.id">
          <td>{{ schedule.id }}</td>
          <td>{{ schedule.title }}</td>
          <td>{{ schedule.time }}</td>
          <td>
            <button class="edit-btn" @click="editSchedule(schedule)">Düzenle</button>
            <button class="delete-btn" @click="deleteSchedule(schedule.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="isEdit" class="schedule-form">
    <h3>Program Güncelle</h3>
    <form @submit.prevent="updateSchedule">
      <div class="form-group">
        <label for="id">ID</label>
        <input v-model="selectedSchedule.id" type="text" id="id" disabled />
      </div>
      <div class="form-group">
        <label for="title">Başlık</label>
        <input v-model="selectedSchedule.title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="time">Zaman</label>
        <input v-model="selectedSchedule.time" type="text" id="time" required />
      </div>
      <button type="submit" class="submit-btn">Güncelle</button>
    </form>
  </div>
</template>

<style scoped>
/* Genel Stil */
.schedule-form,
.schedule-table {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  color: #333;
}

.schedule-form h2,
.schedule-table h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  border-color: #1976d2;
  outline: none;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.submit-btn:active {
  transform: scale(1);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead th {
  padding: 10px 20px;
  font-weight: bold;
  border-bottom: 2px solid #1976d2;
  color: #333;
}

tbody td {
  padding: 10px;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  color: white;
}

.edit-btn {
  background-color: #ffc107;
}

.edit-btn:hover {
  background-color: #ffca2c;
}

.delete-btn {
  background-color: #e53935;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
