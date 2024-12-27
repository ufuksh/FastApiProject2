<script setup>
import { ref, onMounted } from "vue";
import { useTeacherStore } from "@/store/TeacherStore.ts";

// Pinia Store
const teacherStore = useTeacherStore();

// Düzenleme (edit) durumunu takip eder
const isEdit = ref(false);

// Seçili öğretmen
const selectedTeacher = ref({
  id: "",
  first_name: "",
  last_name: "",
  subject_specialization: "",
  contact_info: "",
});

// Yeni öğretmen verisi
const newTeacher = ref({
  first_name: "",
  last_name: "",
  subject_specialization: "",
  contact_info: "",
});

// UUID regex'i
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// UUID doğrulama fonksiyonu
const isValidUUID = (uuid) => {
  return uuidRegex.test(uuid);
};

// Tüm öğretmenleri getirir
const getTeachers = async () => {
  await teacherStore.fetchTeachers();
};

// Yeni öğretmen oluşturur
const createNewTeacher = async () => {
  if (!newTeacher.value.first_name || !newTeacher.value.last_name) {
    alert("Lütfen öğretmenin adını ve soyadını giriniz.");
    return;
  }

  isLoading.value = true; // Yükleme başladığında 'isLoading' true yapılıyor

  try {
    await teacherStore.createTeacher(newTeacher.value);
    newTeacher.value = {
      first_name: "",
      last_name: "",
      subject_specialization: "",
      contact_info: "",
    };
    alert("Öğretmen başarıyla eklendi!");
    getTeachers();  // Öğretmen listesini günceller
  } catch (error) {
    console.error("Yeni öğretmen oluşturulurken bir hata oluştu:", error);
    alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");
  } finally {
    isLoading.value = false; // Yükleme bittiğinde 'isLoading' false yapılıyor
  }
};
    // Öğretmen listesini güncelle
    getTeachers();

  } catch (error) {
    console.error("Yeni öğretmen oluşturulurken bir hata oluştu:", error);
    alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");
  } finally {
    // Yükleniyor durumunu kapat
    isLoading.value = false;
  }
};

// Düzenlemeye başla
const editTeacher = (teacher) => {
  isEdit.value = true;
  selectedTeacher.value = { ...teacher };
};

// Güncelle
const updateTeacher = async () => {
  // UUID doğrulaması
  if (!isValidUUID(selectedTeacher.value.id)) {
    alert("Geçersiz öğretmen ID'si.");
    return;
  }
  try {
    await teacherStore.updateTeacher(selectedTeacher.value);
    // Güncellenen öğretmeni sıfırlıyoruz
    isEdit.value = false;
    selectedTeacher.value = {
      id: "",
      first_name: "",
      last_name: "",
      subject_specialization: "",
      contact_info: "",
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
        <input
          v-if="isEdit"
          v-model="selectedTeacher.first_name"
          type="text"
          id="first_name"
          placeholder="Öğretmenin adı"
          required
        />
        <input
          v-else
          v-model="newTeacher.first_name"
          type="text"
          id="first_name"
          placeholder="Öğretmenin adı"
          required
        />
      </div>

      <div class="form-group">
        <label for="last_name">Soyad</label>
        <input
          v-if="isEdit"
          v-model="selectedTeacher.last_name"
          type="text"
          id="last_name"
          placeholder="Öğretmenin soyadı"
          required
        />
        <input
          v-else
          v-model="newTeacher.last_name"
          type="text"
          id="last_name"
          placeholder="Öğretmenin soyadı"
          required
        />
      </div>

      <div class="form-group">
        <label for="subject_specialization">Uzmanlık Alanı</label>
        <input
          v-if="isEdit"
          v-model="selectedTeacher.subject_specialization"
          type="text"
          id="subject_specialization"
          placeholder="Öğretmenin uzmanlık alanı"
        />
        <input
          v-else
          v-model="newTeacher.subject_specialization"
          type="text"
          id="subject_specialization"
          placeholder="Öğretmenin uzmanlık alanı"
        />
      </div>

      <div class="form-group">
        <label for="contact_info">İletişim Bilgisi</label>
        <input
          v-if="isEdit"
          v-model="selectedTeacher.contact_info"
          type="text"
          id="contact_info"
          placeholder="Öğretmenin iletişim bilgisi"
        />
        <input
          v-else
          v-model="newTeacher.contact_info"
          type="text"
          id="contact_info"
          placeholder="Öğretmenin iletişim bilgisi"
        />
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
          <th>Uzmanlık Alanı</th>
          <th>İletişim</th>
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
          <td>{{ teacher.subject_specialization }}</td>
          <td>{{ teacher.contact_info }}</td>
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