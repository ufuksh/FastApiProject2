import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useTeacherStore = defineStore("teacherStore", () => {
  const backendStore = useBackendStore();
  const stateTeacher = ref([]);

  // Tüm öğretmenleri getir
  async function getTeacher() {
    const backend = await backendStore.backend();
    // /teachers/ GET
    const response = await backend.read_teachers_teachers__get();
    stateTeacher.value = response.data;
  }

  // Yeni öğretmen oluştur
  async function createTeacher(newTeacher) {
    const backend = await backendStore.backend();
    // /teachers/ POST
    // Fonksiyon imzası: create_teacher_teachers__post(parameters?, data?, config?)
    const response = await backend.create_teacher_teachers__post(
      null,
      newTeacher
    );
    stateTeacher.value.push(response.data);
  }

  // Öğretmen güncelle
  async function updateTeacher(updatedTeacher) {
    const backend = await backendStore.backend();
    // /teachers/{teacher_id} PUT
    const response = await backend.update_teacher_teachers__teacher_id__put(
      { teacher_id: updatedTeacher.id },  // path param
      updatedTeacher                      // requestBody
    );

    // Local state'i güncelle
    const index = stateTeacher.value.findIndex(
      (teacher) => teacher.id === updatedTeacher.id
    );
    if (index !== -1) {
      stateTeacher.value[index] = response.data;
    }
  }

  // Öğretmen sil
  async function deleteTeacher(teacherId) {
    const backend = await backendStore.backend();
    // /teachers/{teacher_id} DELETE
    await backend.delete_teacher_teachers__teacher_id__delete({
      teacher_id: teacherId,
    });

    // Local state'den çıkar
    stateTeacher.value = stateTeacher.value.filter(
      (teacher) => teacher.id !== teacherId
    );
  }

  // Tek bir öğretmen getir (id ile)
  async function getTeacherById(teacherId) {
    const backend = await backendStore.backend();
    // /teachers/{teacher_id} GET
    const response = await backend.read_teacher_teachers__teacher_id__get({
      teacher_id: teacherId,
    });
    return response.data;
  }

  return {
    stateTeacher,
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
  };
});
