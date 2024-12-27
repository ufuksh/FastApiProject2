<script setup>
// UUID regex tanımı (UUID doğrulaması için kullanılacak)
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

import { ref, onMounted, computed } from "vue";
import { useScheduleStore } from "@/store/ScheduleStore.ts";

// Pinia Store
const scheduleStore = useScheduleStore();

// Düzenleme (edit) durumunu takip eder
const isEdit = ref(false);

// Seçili (düzenlenecek) program
const selectedSchedule = ref({
  id: "",
  title: "",
  description: "",
  start_time: "",
  end_time: "",
  student_id: "",
  teacher_id: "",
});

// Yeni program verisi
const newSchedule = ref({
  title: "",
  description: "",
  start_time: "",
  end_time: "",
  student_id: "",
  teacher_id: "",
});

// Computed properties for v-model binding
const currentSchedule = computed({
  get() {
    return isEdit.value ? selectedSchedule.value : newSchedule.value;
  },
  set(value) {
    if (isEdit.value) {
      selectedSchedule.value = value;
    } else {
      newSchedule.value = value;
    }
  },
});

// Yükleniyor durumu
const isLoading = ref(false);

// Programları getir
const getSchedules = async () => {
  isLoading.value = true;
  try {
    await scheduleStore.getSchedules();
  } catch (error) {
    console.error("Programlar alınırken bir hata oluştu:", error);
  } finally {
    isLoading.value = false;
  }
};

// Öğrencileri al
const getStudents = async () => {
  try {
    await scheduleStore.getStudents();
  } catch (error) {
    console.error("Öğrenciler alınırken bir hata oluştu:", error);
  }
};

// Öğretmenleri al
const getTeachers = async () => {
  try {
    await scheduleStore.getTeachers();
  } catch (error) {
    console.error("Öğretmenler alınırken bir hata oluştu:", error);
  }
};

// Yeni program oluştur
const createNewSchedule = async () => {
  if (
    !newSchedule.value.title ||
    !newSchedule.value.start_time ||
    !newSchedule.value.end_time ||
    !newSchedule.value.student_id ||
    !newSchedule.value.teacher_id
  ) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  if (!uuidRegex.test(newSchedule.value.student_id) || !uuidRegex.test(newSchedule.value.teacher_id)) {
    alert("Geçersiz UUID formatı. Lütfen doğru bir UUID girin.");
    return;
  }

  isLoading.value = true;
  try {
    newSchedule.value.start_time = new Date(newSchedule.value.start_time).toISOString();
    newSchedule.value.end_time = new Date(newSchedule.value.end_time).toISOString();

    await scheduleStore.createSchedule(newSchedule.value);

    newSchedule.value = {
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      student_id: "",
      teacher_id: "",
    };

    alert("Program başarıyla oluşturuldu!");
    getSchedules();
  } catch (error) {
    console.error("Program oluşturulurken bir hata oluştu:", error);
  } finally {
    isLoading.value = false;
  }
};

// Düzenlemeye başla
const editSchedule = (schedule) => {
  isEdit.value = true;
  selectedSchedule.value = { ...schedule };
};

// Programı güncelle
const updateSchedule = async () => {
  if (!selectedSchedule.value.id) {
    alert("Düzenlenecek program seçilmedi.");
    return;
  }

  if (!uuidRegex.test(selectedSchedule.value.student_id) || !uuidRegex.test(selectedSchedule.value.teacher_id)) {
    alert("Geçersiz UUID formatı. Lütfen doğru bir UUID girin.");
    return;
  }

  isLoading.value = true;
  try {
    selectedSchedule.value.start_time = new Date(selectedSchedule.value.start_time).toISOString();
    selectedSchedule.value.end_time = new Date(selectedSchedule.value.end_time).toISOString();

    await scheduleStore.updateSchedule(selectedSchedule.value);

    isEdit.value = false;
    selectedSchedule.value = {
      id: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      student_id: "",
      teacher_id: "",
    };

    alert("Program başarıyla güncellendi!");
    getSchedules();
  } catch (error) {
    console.error("Program güncellenirken bir hata oluştu:", error);
  } finally {
    isLoading.value = false;
  }
};

// Programı sil
const deleteSchedule = async (id) => {
  if (!id) {
    alert("Silinecek program ID'si bulunamadı.");
    return;
  }

  if (confirm("Bu programı silmek istediğinizden emin misiniz?")) {
    isLoading.value = true;
    try {
      await scheduleStore.deleteSchedule(id);
      alert("Program başarıyla silindi!");
      getSchedules();
    } catch (error) {
      console.error("Program silinirken bir hata oluştu:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

// Bileşen yüklendiğinde programları ve kullanıcıları getir
onMounted(() => {
  getSchedules();
  getStudents();  // Öğrencileri al
  getTeachers();  // Öğretmenleri al
});
</script>

<template>
  <div class="schedule-form">
    <h2>{{ isEdit ? "Program Güncelle" : "Program Ekle" }}</h2>
    <form @submit.prevent="isEdit ? updateSchedule() : createNewSchedule()">
      <div class="form-group">
        <label for="title">Başlık</label>
        <input
          v-model="currentSchedule.title"
          type="text"
          id="title"
          placeholder="Program başlığı"
          required
        />
      </div>

      <div class="form-group">
        <label for="start_time">Başlangıç Zamanı</label>
        <input
          v-model="currentSchedule.start_time"
          type="datetime-local"
          id="start_time"
          placeholder="Başlangıç zamanı"
          required
        />
      </div>

      <div class="form-group">
        <label for="end_time">Bitiş Zamanı</label>
        <input
          v-model="currentSchedule.end_time"
          type="datetime-local"
          id="end_time"
          placeholder="Bitiş zamanı"
          required
        />
      </div>

      <div class="form-group">
        <label for="student_id">Öğrenci</label>
        <select v-model="currentSchedule.student_id" id="student_id" required>
          <option value="" disabled>Öğrenci Seçin</option>
          <option v-for="student in scheduleStore.students" :key="student.id" :value="student.id">
            {{ student.first_name }} {{ student.last_name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="teacher_id">Öğretmen</label>
        <select v-model="currentSchedule.teacher_id" id="teacher_id" required>
          <option value="" disabled>Öğretmen Seçin</option>
          <option v-for="teacher in scheduleStore.teachers" :key="teacher.id" :value="teacher.id">
            {{ teacher.first_name }} {{ teacher.last_name }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn" :disabled="isLoading">
        {{ isLoading ? "Yükleniyor..." : (isEdit ? "Güncelle" : "Ekle") }}
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
          <th>Başlangıç</th>
          <th>Bitiş</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in scheduleStore.schedules" :key="schedule.id">
          <td>{{ schedule.id }}</td>
          <td>{{ schedule.title }}</td>
          <td>{{ schedule.start_time }}</td>
          <td>{{ schedule.end_time }}</td>
          <td>
            <button class="edit-btn" @click="editSchedule(schedule)">Düzenle</button>
            <button class="delete-btn" @click="deleteSchedule(schedule.id)">Sil</button>
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