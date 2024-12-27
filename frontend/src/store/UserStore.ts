import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

// Kullanıcı Modeli
interface User {
  id: string;
  username: string;
  email: string;
  hashed_password?: string; // Bu alan genelde backend'de tutulur, frontend'e gerek olmayabilir
}

export const useUserStore = defineStore("userStore", () => {
  const backendStore = useBackendStore();
  const users = ref<User[]>([]); // Kullanıcı listesi
  const isLoading = ref(false); // Yüklenme durumu
  const errorMessage = ref(""); // Hata mesajı

  // Tüm kullanıcıları getir
  async function fetchUsers() {
    isLoading.value = true;
    try {
      const response = await backendStore.getUsers();
      console.log("GET /users yanıtı:", response.data);
      users.value = response.data as User[];
    } catch (error) {
      console.error("Kullanıcıları getirirken hata oluştu:", error);
      errorMessage.value = "Kullanıcıları getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni kullanıcı oluştur
  async function createUser(newUser: Partial<User>) {
    isLoading.value = true;
    try {
      const response = await backendStore.createUser(newUser);
      console.log("POST /users yanıtı:", response.data);
      users.value.push(response.data);
    } catch (error) {
      console.error("Kullanıcı oluşturulurken hata oluştu:", error);
      errorMessage.value = "Kullanıcı oluşturulurken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Kullanıcı güncelle
  async function updateUser(updatedUser: User) {
    isLoading.value = true;
    try {
      const response = await backendStore.updateUser(updatedUser.id, updatedUser);
      console.log("PUT /users yanıtı:", response.data);

      // Local state'i güncelle
      const index = users.value.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        users.value[index] = response.data;
      }
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
      errorMessage.value = "Kullanıcı güncellenirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Kullanıcı sil
  async function deleteUser(userId: string) {
    isLoading.value = true;
    try {
      await backendStore.deleteUser(userId);
      console.log("DELETE /users yanıtı: Kullanıcı başarıyla silindi");

      // Local state'den çıkar
      users.value = users.value.filter((user) => user.id !== userId);
    } catch (error) {
      console.error("Kullanıcı silinirken hata oluştu:", error);
      errorMessage.value = "Kullanıcı silinirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Tek bir kullanıcı getir (ID ile)
  async function getUserById(userId: string): Promise<User | undefined> {
    isLoading.value = true;
    try {
      const response = await backendStore.getUserById(userId);
      console.log("GET /users/{id} yanıtı:", response.data);
      return response.data;
    } catch (error) {
      console.error("Kullanıcı getirilirken hata oluştu:", error);
      errorMessage.value = "Kullanıcı getirilirken bir hata oluştu.";
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    users,
    isLoading,
    errorMessage,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  };
});