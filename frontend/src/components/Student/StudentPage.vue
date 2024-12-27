<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStudentStore } from "../../store/StudentStore";

interface Student {
  id: string; // UUID olarak kullanılıyor
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  grade?: string;
  contact_info?: string;
}

const studentStore = useStudentStore();

const isEdit = ref(false);
const selectedStudent = ref<Student>({
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  grade: "",
  contact_info: "",
});

const newStudent = ref<Partial<Student>>({
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  grade: "",
  contact_info: "",
});

// Hata mesajlarını göstermek için
const showError = ref(false);

// UUID doğrulama fonksiyonu
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

async function getStudents() {
  await studentStore.fetchStudents();
}

async function createNewStudent() {
  try {
    await studentStore.createStudent(newStudent.value);
    newStudent.value = {
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      grade: "",
      contact_info: "",
    };
  } catch (error) {
    console.error("Öğrenci eklenirken bir hata oluştu:", error);
  }
}

function editStudent(student: Student) {
  isEdit.value = true;
  selectedStudent.value = { ...student };
}

async function updateStudent() {
  if (!selectedStudent.value.id || !isValidUUID(selectedStudent.value.id)) {
    alert("Güncelleme işlemi için geçerli bir öğrenci seçin.");
    return;
  }
  try {
    await studentStore.updateStudent(selectedStudent.value);
    isEdit.value = false;
    selectedStudent.value = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      grade: "",
      contact_info: "",
    };
  } catch (error) {
    console.error("Öğrenci güncellenirken bir hata oluştu:", error);
  }
}


async function deleteStudent(id: string) {
  if (!isValidUUID(id)) {
    alert("Geçersiz UUID formatı.");
    console.error("Geçersiz UUID:", id);
    return;
  }
  if (confirm("Öğrenciyi silmek istediğinize emin misiniz?")) {
    try {
      await studentStore.deleteStudent(id);
    } catch (error) {
      console.error("Öğrenci silinirken bir hata oluştu:", error);
    }
  }
}

onMounted(() => {
  getStudents();
});
</script>

<template>
  <div class="student-form">
    <h2 v-if="!isEdit">Öğrenci Ekle</h2>
    <h2 v-else>Öğrenci Güncelle</h2>

    <div v-if="studentStore.errorMessage" class="error-message">
      {{ studentStore.errorMessage }}
    </div>

    <form @submit.prevent="isEdit ? updateStudent() : createNewStudent()">
      <div class="form-group">
        <label for="first_name">Ad</label>
        <input
          v-if="isEdit"
          v-model="selectedStudent.first_name"
          type="text"
          id="first_name"
          placeholder="Öğrencinin adını girin"
          required
        />
        <input
          v-else
          v-model="newStudent.first_name"
          type="text"
          id="first_name"
          placeholder="Öğrencinin adını girin"
          required
        />
      </div>

      <div class="form-group">
        <label for="last_name">Soyad</label>
        <input
          v-if="isEdit"
          v-model="selectedStudent.last_name"
          type="text"
          id="last_name"
          placeholder="Öğrencinin soyadını girin"
          required
        />
        <input
          v-else
          v-model="newStudent.last_name"
          type="text"
          id="last_name"
          placeholder="Öğrencinin soyadını girin"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-if="isEdit"
          v-model="selectedStudent.email"
          type="email"
          id="email"
          placeholder="Öğrencinin email adresini girin"
          required
        />
        <input
          v-else
          v-model="newStudent.email"
          type="email"
          id="email"
          placeholder="Öğrencinin email adresini girin"
          required
        />
      </div>

      <div v-if="!isEdit" class="form-group">
        <label for="date_of_birth">Doğum Tarihi</label>
        <input
          v-model="newStudent.date_of_birth"
          type="date"
          id="date_of_birth"
          required
        />
      </div>

      <div v-if="!isEdit" class="form-group">
        <label for="grade">Sınıf</label>
        <input
          v-model="newStudent.grade"
          type="text"
          id="grade"
          placeholder="Öğrencinin sınıfını girin"
          required
        />
      </div>

      <div v-if="!isEdit" class="form-group">
        <label for="contact_info">İletişim Bilgisi</label>
        <input
          v-model="newStudent.contact_info"
          type="text"
          id="contact_info"
          placeholder="Öğrencinin telefon numarasını girin"
          required
        />
      </div>

      <button type="submit" class="submit-btn">
        {{ isEdit ? "Güncelle" : "Ekle" }}
      </button>
    </form>
  </div>

  <div class="student-table">
    <h2>Öğrenci Listesi</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ad Soyad</th>
          <th>Email</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in studentStore.students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.first_name }} {{ student.last_name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button class="edit-btn" @click="editStudent(student)">Düzenle</button>
            <button class="delete-btn" @click="deleteStudent(student.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Genel Stil Ayarları */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

/* Hata Mesajı Stili */
.error-message {
  color: red;
  margin-bottom: 15px;
  text-align: center;
}

/* Öğrenci Formu */
.student-form {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #495057;
}

.student-form h2 {
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

.submit-btn:active {
  background-color: #003865;
  transform: scale(1);
}

/* Öğrenci Tablosu */
.student-table {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #495057;
}

.student-table h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;
  font-size: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead tr {
  background-color: #f1f3f5;
  color: #495057;
}

thead th {
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
}

tbody tr {
  border-bottom: 1px solid #dee2e6;
}

tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

tbody td {
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

/* Medya Sorguları */
@media (max-width: 768px) {
  .student-form,
  .student-table {
    padding: 15px;
  }

  table {
    font-size: 0.9rem;
  }

  .edit-btn,
  .delete-btn {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}
</style>
