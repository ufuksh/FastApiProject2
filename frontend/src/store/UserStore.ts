import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useUserStore = defineStore("userStore", () => {
  const backendStore = useBackendStore();
  const stateUser = ref([]);

  // Tüm kullanıcıları getir (Eğer backend'de read_users_users__get varsa)
  // Not: OpenAPI şemanızda "read_users_users__get" yoksa bu fonksiyonu eklemeyebilirsiniz.
  async function getUsers() {
    const backend = await backendStore.backend();
    // Şemanızda "read_users_users__get" şeklinde bir endpoint yoksa bu satır hata verebilir.
    // Varsa, tıpkı read_students_students__get gibi çağırırsınız:
    // const response = await backend.read_users_users__get();
    // stateUser.value = response.data;
    // (Burada varsayımsal, eğer kullanıcı listeleme yoksa bu fonksiyon gerekmeyebilir.)
  }

  // Yeni kullanıcı oluştur
  async function createUser(newUser) {
    const backend = await backendStore.backend();
    // /users/ POST
    // Fonksiyon imzası: create_user_users__post(parameters?, data?, config?)
    const response = await backend.create_user_users__post(
      null,
      newUser
    );
    stateUser.value.push(response.data);
  }

  // Kullanıcı güncelle
  async function updateUser(updatedUser) {
    const backend = await backendStore.backend();
    // /users/{user_id} PUT
    const response = await backend.update_user_users__user_id__put(
      { user_id: updatedUser.id },
      updatedUser
    );

    // Local state'i güncelle
    const index = stateUser.value.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      // API response’ı tam ne döndürüyor bakmak gerek.
      // Bazı durumlarda { } boş obje dönebilir, API’nizin implementasyonuna bağlı.
      // Yine de tutarlılık adına:
      // stateUser.value[index] = response.data;
    }
  }

  // Kullanıcı sil
  async function deleteUser(userId) {
    const backend = await backendStore.backend();
    // /users/{user_id} DELETE
    await backend.delete_user_users__user_id__delete({
      user_id: userId,
    });

    // Local state'den çıkar
    stateUser.value = stateUser.value.filter((u) => u.id !== userId);
  }

  // Tek bir kullanıcı getir (id ile) - Şemanızda read_user_users__user_id__get yoksa eklemeyebilirsin
  async function getUserById(userId) {
    const backend = await backendStore.backend();
    // /users/{user_id} GET
    // Bu endpoint şemanızda tanımlı mı bakın, yoksa 404 verebilir.
    // const response = await backend.read_user_users__user_id__get({
    //   user_id: userId,
    // });
    // return response.data;
  }

  return {
    stateUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  };
});
