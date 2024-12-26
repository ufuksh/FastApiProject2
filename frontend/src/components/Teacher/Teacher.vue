<script setup>
import { ref, onMounted } from "vue";
import { useTeacherStore } from "@/store/TeacherStore.ts";

const teacherStore = useTeacherStore();

const isEdit = ref(false);
const selectedTeacher = ref({ id: null, name: "", subject: "" });

const getTeachers = async () => {
  await teacherStore.getTeacher();
};

const editTeacher = (teacher) => {
  isEdit.value = true;
  selectedTeacher.value = { ...teacher };
};

const deleted = async (id) => {
  await teacherStore.deleteTeacher(id);
};

const updateTeacher = async () => {
  await teacherStore.updateTeacher(selectedTeacher.value);
  isEdit.value = false;
};

const newTeacher = ref({ name: "", subject: "" });

const createNewTeacher = async () => {
  await teacherStore.createTeacher(newTeacher.value);
  newTeacher.value = { name: "", subject: "" }; // Formu temizle
};

onMounted(() => {
  getTeachers();
});
</script>

<template>
  <div class="teacher-form">
    <h2>Öğretmen Ekle</h2>
    <form @submit.prevent="createNewTeacher">
      <div class="form-group">
        <label for="name">Ad</label>
        <input v-model="newTeacher.name" type="text" id="name" placeholder="Öğretmenin adını girin" required />
      </div>
      <div class="form-group">
        <label for="subject">Ders</label>
        <input v-model="newTeacher.subject" type="text" id="subject" placeholder="Öğretmenin dersini girin" required />
      </div>
      <button type="submit" class="submit-btn">Ekle</button>
    </form>
  </div>

  <div class="teacher-table">
    <h2>Öğretmen Listesi</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ad</th>
          <th>Ders</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teacherStore.stateTeacher" :key="teacher.id">
          <td>{{ teacher.id }}</td>
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.subject }}</td>
          <td>
            <button class="edit-btn" @click="editTeacher(teacher)">Düzenle</button>
            <button class="delete-btn" @click="deleted(teacher.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="isEdit" class="teacher-form">
    <h3>Öğretmen Güncelle</h3>
    <form @submit.prevent="updateTeacher">
      <div class="form-group">
        <label for="id">ID</label>
        <input v-model="selectedTeacher.id" type="text" id="id" disabled />
      </div>
      <div class="form-group">
        <label for="name">Ad</label>
        <input v-model="selectedTeacher.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="subject">Ders</label>
        <input v-model="selectedTeacher.subject" type="text" id="subject" required />
      </div>
      <button type="submit" class="submit-btn">Güncelle</button>
    </form>
  </div>
</template>

<style scoped>
/* Stil aynı */
</style>
