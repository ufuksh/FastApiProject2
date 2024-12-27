<script setup>
import { ref, onMounted } from "vue";
import { useTeacherStore } from "@/store/TeacherStore.ts";

// Pinia Store
const teacherStore = useTeacherStore();

// Düzenleme (edit) durumunu takip eder
const isEdit = ref(false);

// Seçili teacher
const selectedTeacher = ref({
  id: "",
  first_name: "",
  last_name: "",
  department: "",
});

// Yeni teacher verisi
const newTeacher = ref({
  first_name: "",
  last_name: "",
  department: "",
});

// UUID doğrulama fonksiyonu
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Tüm öğretmenleri getirir
const getTeachers = async () => {
  await teacherStore.fetchTeachers();
};

// Yeni öğretmen oluşturur
const createNewTeacher = async () => {
  try {
    await teacherStore.createTeacher(newTeacher.value);
    // Formu temizle
    newTeacher.value = { first_name: "", last_name: "", department: "" };
  } catch (error) {
    console.error("Yeni öğretmen oluşturulurken bir hata oluştu:", error);
  }
};

// Düzenlemeye geç
const editTeacher = (teacher) => {
  isEdit.value = true;
  selectedTeacher.value = { ...teacher };
};

// Güncelle
const updateTeacher = async () => {
  if (!isValidUUID(selectedTeacher.value.id)) {
    alert("Geçersiz öğretmen ID'si.");
    return;
  }
  try {
    await teacherStore.updateTeacher(selectedTeacher.value);
    isEdit.value = false;
    selectedTeacher.value = {
      id: "",
      first_name: "",
      last_name: "",
      department: "",
    };
  } catch (error) {
    console.error("Öğretmen güncellenirken bir hata oluştu:", error);
  }
};

// Öğretmeni siler
const deleteTeacher = async (id) => {
  if (!isValidUUID(id)) {
    alert("Geçersiz öğretmen ID'si.");
    return;
  }
  if (confirm("Bu öğretmeni silmek istediğinize emin misiniz?")) {
    try {
      await teacherStore.deleteTeacher(id);
    } catch (error) {
      console.error("Öğretmen silinirken bir hata oluştu:", error);
    }
  }
};

// Bileşen yüklendiğinde öğretmen listesini getir
onMounted(() => {
  getTeachers();
});
</script>

<template>
  <div class="teacher-form">
    <h2>{{ isEdit ? "Öğretmen Güncelle" : "Öğretmen Ekle" }}</h2>
    <form @submit.prevent="isEdit ? updateTeacher() : createNewTeacher()">
      <div class="form-group">
        <label for="first_name">Ad</label>
        <template v-if="isEdit">
          <input
            v-model="selectedTeacher.first_name"
            type="text"
            id="first_name"
            placeholder="Öğretmenin adı"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newTeacher.first_name"
            type="text"
            id="first_name"
            placeholder="Öğretmenin adı"
            required
          />
        </template>
      </div>

      <div class="form-group">
        <label for="last_name">Soyad</label>
        <template v-if="isEdit">
          <input
            v-model="selectedTeacher.last_name"
            type="text"
            id="last_name"
            placeholder="Öğretmenin soyadı"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newTeacher.last_name"
            type="text"
            id="last_name"
            placeholder="Öğretmenin soyadı"
            required
          />
        </template>
      </div>

      <div class="form-group">
        <label for="department">Bölüm</label>
        <template v-if="isEdit">
          <input
            v-model="selectedTeacher.department"
            type="text"
            id="department"
            placeholder="Öğretmenin bölümü"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newTeacher.department"
            type="text"
            id="department"
            placeholder="Öğretmenin bölümü"
            required
          />
        </template>
      </div>

      <button type="submit" class="submit-btn">
        {{ isEdit ? "Güncelle" : "Ekle" }}
      </button>
    </form>
  </div>

  <div class="teacher-table">
    <h2>Öğretmen Listesi</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ad Soyad</th>
          <th>Bölüm</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="teacher in teacherStore.teachers"
          :key="teacher.id"
        >
          <td>{{ teacher.id }}</td>
          <td>{{ teacher.first_name }} {{ teacher.last_name }}</td>
          <td>{{ teacher.department }}</td>
          <td>
            <button class="edit-btn" @click="editTeacher(teacher)">
              Düzenle
            </button>
            <button class="delete-btn" @click="deleteTeacher(teacher.id)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.teacher-form,
.teacher-table {
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

.teacher-form h2,
.teacher-table h2 {
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

.teacher-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.teacher-table thead tr {
  background-color: #f1f3f5;
  color: #495057;
}

.teacher-table thead th {
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
}

.teacher-table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

.teacher-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.teacher-table tbody td {
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
