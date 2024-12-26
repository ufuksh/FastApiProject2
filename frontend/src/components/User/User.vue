<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/UserStore.ts";

// Pinia Store
const userStore = useUserStore();

// Düzenleme (edit) durumunu takip eder
const isEdit = ref(false);

// Seçili kullanıcı
const selectedUser = ref({
  id: null,
  username: "",
  email: "",
});

// Yeni kullanıcı verisi
const newUser = ref({
  username: "",
  email: "",
  password: "",
});

// Tüm kayıtları getir
const getUsers = async () => {
  await userStore.getUsers();
};

// Yeni kullanıcı oluştur
const createNewUser = async () => {
  await userStore.createUser(newUser.value);
  // Formu temizle
  newUser.value = { username: "", email: "", password: "" };
};

// Düzenlemeye geç
const editUser = (user) => {
  isEdit.value = true;
  selectedUser.value = { ...user };
};

// Güncelle
const updateUser = async () => {
  await userStore.updateUser(selectedUser.value);
  isEdit.value = false;
  selectedUser.value = { id: null, username: "", email: "" };
};

// Sil
const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};

// Bileşen yüklendiğinde verileri getir
onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="user-form">
    <h2>{{ isEdit ? "Kullanıcı Güncelle" : "Kullanıcı Ekle" }}</h2>
    <form @submit.prevent="isEdit ? updateUser() : createNewUser()">
      <div class="form-group">
        <label for="username">Kullanıcı Adı</label>
        <template v-if="isEdit">
          <input
            v-model="selectedUser.username"
            type="text"
            id="username"
            placeholder="Kullanıcı adı"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newUser.username"
            type="text"
            id="username"
            placeholder="Kullanıcı adı"
            required
          />
        </template>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <template v-if="isEdit">
          <input
            v-model="selectedUser.email"
            type="email"
            id="email"
            placeholder="Kullanıcı email"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="newUser.email"
            type="email"
            id="email"
            placeholder="Kullanıcı email"
            required
          />
        </template>
      </div>

      <!-- Sadece yeni kullanıcı eklerken gözüken şifre alanı -->
      <div v-if="!isEdit" class="form-group">
        <label for="password">Şifre</label>
        <input
          v-model="newUser.password"
          type="password"
          id="password"
          placeholder="Kullanıcı şifresi"
          required
        />
      </div>

      <button type="submit" class="submit-btn">
        {{ isEdit ? "Güncelle" : "Ekle" }}
      </button>
    </form>
  </div>

  <div class="user-table">
    <h2>Kullanıcı Listesi</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Kullanıcı Adı</th>
          <th>Email</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.stateUser" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="edit-btn" @click="editUser(user)">Düzenle</button>
            <button class="delete-btn" @click="deleteUser(user.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.user-form,
.user-table {
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

.user-form h2,
.user-table h2 {
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

.user-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.user-table thead tr {
  background-color: #f1f3f5;
  color: #495057;
}

.user-table thead th {
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
}

.user-table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.user-table tbody td {
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
