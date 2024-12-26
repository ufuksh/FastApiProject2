import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useStudentStore = defineStore("studentStore", () => {
  const backendStore = useBackendStore();
  const stateStudent = ref([]);

  // Tüm öğrencileri getir
  async function getStudent() {
    const backend = await backendStore.backend();
    const response = await backend.read_students_students__get();
    stateStudent.value = response.data;
  }

  // Yeni öğrenci oluştur
  async function createStudent(newStudent) {
    const backend = await backendStore.backend();
    // /students/ POST
    const response = await backend.create_student_students__post(null, newStudent);

    // 1) Local state'e ekleyerek ekranda anında göster
    stateStudent.value.push(response.data);

    // 2) Sunucudan tekrar çekerek veriyi eşitle
    //    (Opsiyonel - sunucuda otomatik alanlar set ediliyorsa yararlı olur)
    await getStudent();
  }

  // Öğrenci güncelle
  async function updateStudent(updatedStudent) {
    const backend = await backendStore.backend();
    const response = await backend.update_student_students__student_id__put(
      { student_id: updatedStudent.id },
      updatedStudent
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
    await backend.delete_student_students__student_id__delete({
      student_id: studentId,
    });

    // Local state'den çıkar
    stateStudent.value = stateStudent.value.filter(
      (student) => student.id !== studentId
    );
  }

  // Tek bir öğrenci getir (id ile)
  async function getStudentById(studentId) {
    const backend = await backendStore.backend();
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
