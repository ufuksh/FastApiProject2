import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useStudentStore = defineStore("studentStore", () => {
  const backendStore = useBackendStore();
  const stateStudent = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Tüm öğrencileri getir
  async function getStudent() {
    isLoading.value = true;
    try {
      const backend = await backendStore.backend();
      const response = await backend.read_students_students__get(); // API yöntemi doğru şekilde çağrılıyor

      console.log("GET /students yanıtı:", response.data);
      stateStudent.value = response.data; // Gelen veriler state'e atanıyor
    } catch (error) {
      console.error("GET /students hata:", error);
      errorMessage.value = "Öğrencileri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni öğrenci oluştur
  async function createStudent(newStudent) {
    isLoading.value = true;
    try {
      const backend = await backendStore.backend();
      const response = await backend.create_student_students__post(null, newStudent);

      console.log("POST /students yanıtı:", response.data);
      stateStudent.value.push(response.data); // Yeni öğrenci listeye ekleniyor

      // Sunucudan veriyi tekrar çek
      await getStudent();
    } catch (error) {
      console.error("POST /students hata:", error);
      errorMessage.value = "Yeni öğrenci eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci güncelle
  async function updateStudent(updatedStudent) {
    isLoading.value = true;
    try {
      const backend = await backendStore.backend();
      const response = await backend.update_student_students__student_id__put(
        { student_id: updatedStudent.id },
        updatedStudent
      );

      console.log("PUT /students yanıtı:", response.data);

      // Local state'de güncelle
      const index = stateStudent.value.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (index !== -1) {
        stateStudent.value[index] = response.data;
      }
    } catch (error) {
      console.error("PUT /students hata:", error);
      errorMessage.value = "Öğrenciyi güncellerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci sil
  async function deleteStudent(studentId) {
    isLoading.value = true;
    try {
      const backend = await backendStore.backend();
      await backend.delete_student_students__student_id__delete({
        student_id: studentId,
      });

      console.log("DELETE /students yanıtı: Silme başarılı");

      // Local state'den çıkar
      stateStudent.value = stateStudent.value.filter(
        (student) => student.id !== studentId
      );
    } catch (error) {
      console.error("DELETE /students hata:", error);
      errorMessage.value = "Öğrenciyi silerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Tek bir öğrenci getir (id ile)
  async function getStudentById(studentId) {
    isLoading.value = true;
    try {
      const backend = await backendStore.backend();
      const response = await backend.read_student_students__student_id__get({
        student_id: studentId,
      });

      console.log("GET /students/{id} yanıtı:", response.data);
      return response.data;
    } catch (error) {
      console.error("GET /students/{id} hata:", error);
      errorMessage.value = "Öğrenciyi getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    stateStudent,
    isLoading,
    errorMessage,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
});
