<script setup>
import { ref, onMounted } from "vue";
import { useStudentStore } from "@/store/StudentStore.ts";

const studentStore = useStudentStore();

const isEdit = ref(false);
const selectedStudent = ref({ id: null, name: "", email: "" });

const getStudents = async () => {
  await studentStore.getStudent();
};

const editStudent = (student) => {
  isEdit.value = true;
  selectedStudent.value = { ...student };
};

const deleted = async (id) => {
  await studentStore.deleteStudent(id);
};

//Burası yapılacak
const updateStudent = async () => {
  ///await studentStore.updateStudent(selectedStudent.value);
  isEdit.value = false;
};


const newStudent = ref({
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  grade: "",
  contact_info: ""
});

const createNewStudent = async () => {
  await studentStore.createStudent(newStudent.value);
  newStudent.value = { first_name: "", last_name: "", email: "", date_of_birth: "", grade: "", contact_info: "" };  // Formu temizle
};

onMounted(() => {
  getStudents();
});
</script>

<template>
  <div class="student-form">
    <h2>Öğrenci Ekle</h2>
    <form @submit.prevent="createNewStudent">
      <div class="form-group">
        <label for="first_name">Ad</label>
        <input v-model="newStudent.first_name" type="text" id="first_name" placeholder="Öğrencinin adını girin" required />
      </div>

      <div class="form-group">
        <label for="last_name">Soyad</label>
        <input v-model="newStudent.last_name" type="text" id="last_name" placeholder="Öğrencinin soyadını girin" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="newStudent.email" type="email" id="email" placeholder="Öğrencinin email adresini girin" required />
      </div>

      <div class="form-group">
        <label for="date_of_birth">Doğum Tarihi</label>
        <input v-model="newStudent.date_of_birth" type="date" id="date_of_birth" required />
      </div>

      <div class="form-group">
        <label for="grade">Sınıf</label>
        <input v-model="newStudent.grade" type="text" id="grade" placeholder="Öğrencinin sınıfını girin" required />
      </div>

      <div class="form-group">
        <label for="contact_info">İletişim Bilgisi</label>
        <input v-model="newStudent.contact_info" type="text" id="contact_info" placeholder="Öğrencinin telefon numarasını girin" required />
      </div>

      <button type="submit" class="submit-btn">Ekle</button>
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
      <tr v-for="student in studentStore.stateStudent" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>
          <button class="edit-btn" @click="editStudent(student)">Düzenle</button>
          <button class="delete-btn" @click="deleted(student.id)">Sil</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div v-if="isEdit" class="student-form">
    <h3>Öğrenci Güncelle</h3>
    <form @submit.prevent="updateStudent">
      <div class="form-group">
        <label for="id">ID</label>
        <input v-model="selectedStudent.id" type="text" id="id" disabled />
      </div>

      <div class="form-group">
        <label for="name">Ad</label>
        <input v-model="selectedStudent.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="selectedStudent.email" type="email" id="email" required />
      </div>

      <button type="submit" class="submit-btn">Güncelle</button>
    </form>
  </div>
</template>

<style scoped>

.student-form {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #757575;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #000000;
}

.student-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #000000;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 1rem;
  color: #000000;
  background-color: #ffffff;
}
.form-group input:focus {
  border-color: #818181;
  outline: none;
  box-shadow: 0 0 5px rgba(57, 57, 57, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
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
.student-table {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #000000;
}

.student-table h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead tr {
  background-color: #ffffff;
  color: #000000;
}

thead th {
  padding: 10px 20px;
  font-weight: bold;
  border-bottom: 1px solid #000000;
}

tbody tr {
  border-bottom: 1px solid #ffffff;
}

tbody tr:nth-child(even) {
  background-color: #eaeaea;
}

tbody td {
  padding: 10px;
}

.edit-btn {
  background-color: #1976d2;
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn:hover {
  background-color: #0d47a1;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:hover {
  background-color: #b71c1c;
}

</style>