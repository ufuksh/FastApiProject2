import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useStudentStore = defineStore("studentStore", () => {
  const backendStore = useBackendStore();
  const stateStudent = ref([]);

  // Tüm öğrencileri getir
  async function getStudent() {
    const backend = await backendStore.backend();
    // /students/ GET
    const response = await backend.read_students_students__get();
    stateStudent.value = response.data;
  }

  // Yeni öğrenci oluştur
  async function createStudent(newStudent) {
    const backend = await backendStore.backend();
    // /students/ POST
    // Fonksiyon imzası: create_student_students__post(parameters?, data?, config?)
    const response = await backend.create_student_students__post(
      null,        // path veya query param yoksa null veya undefined
      newStudent   // requestBody
    );
    stateStudent.value.push(response.data);
  }

  // Öğrenci güncelle
  async function updateStudent(updatedStudent) {
    const backend = await backendStore.backend();
    // /students/{student_id} PUT
    // Fonksiyon imzası: update_student_students__student_id__put(parameters?, data?, config?)
    const response = await backend.update_student_students__student_id__put(
      { student_id: updatedStudent.id },  // path param
      updatedStudent                      // requestBody
    );

    // Local state'de güncelle
    const index = stateStudent.value.findIndex(
      (student) => student.id === updatedStudent.id
    );
    if (index !== -1) {
      stateStudent.value[index] = response.data;
    }
  }

  // Öğrenci sil
  async function deleteStudent(studentId) {
    const backend = await backendStore.backend();
    // /students/{student_id} DELETE
    // Fonksiyon imzası: delete_student_students__student_id__delete(parameters?, data?, config?)
    await backend.delete_student_students__student_id__delete({
      student_id: studentId, // path param
    });

    // Local state'den çıkar
    stateStudent.value = stateStudent.value.filter(
      (student) => student.id !== studentId
    );
  }

  // Tek bir öğrenci getir (id ile)
  async function getStudentById(studentId) {
    const backend = await backendStore.backend();
    // /students/{student_id} GET
    const response = await backend.read_student_students__student_id__get({
      student_id: studentId,
    });
    return response.data;
  }

  return {
    stateStudent,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
});
