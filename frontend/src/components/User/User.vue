<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/UserStore.ts";

const userStore = useUserStore();

const isEdit = ref(false);
const selectedUser = ref({ id: null, username: "", email: "" });

const getUsers = async () => {
  await userStore.getUser();
};

const editUser = (user) => {
  isEdit.value = true;
  selectedUser.value = { ...user };
};

const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};

const updateUser = async () => {
  await userStore.updateUser(selectedUser.value);
  isEdit.value = false;
};

const newUser = ref({ username: "", email: "" });

const createNewUser = async () => {
  await userStore.createUser(newUser.value);
  newUser.value = { username: "", email: "" }; // Formu temizle
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="user-form">
    <h2>Kullanıcı Ekle</h2>
    <form @submit.prevent="createNewUser">
      <div class="form-group">
        <label for="username">Kullanıcı Adı</label>
        <input
          v-model="newUser.username"
          type="text"
          id="username"
          placeholder="Kullanıcı adını girin"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="newUser.email"
          type="email"
          id="email"
          placeholder="Kullanıcı email adresini girin"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Ekle</button>
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

  <div v-if="isEdit" class="user-form">
    <h3>Kullanıcı Güncelle</h3>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="id">ID</label>
        <input v-model="selectedUser.id" type="text" id="id" disabled />
      </div>
      <div class="form-group">
        <label for="username">Kullanıcı Adı</label>
        <input
          v-model="selectedUser.username"
          type="text"
          id="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="selectedUser.email" type="email" id="email" required />
      </div>
      <button type="submit" class="submit-btn">Güncelle</button>
    </form>
  </div>
</template>

<style scoped>
/* Genel Stil */
.user-form,
.user-table {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  color: #333;
}

.user-form h2,
.user-table h2 {
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
