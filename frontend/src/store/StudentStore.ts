// frontend/src/store/StudentStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "../store/backendStore"; // Relatif yol ile import

// Öğrenci Modeli (TypeScript Interface)
interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  grade?: string;
  contact_info?: string;
}

export const useStudentStore = defineStore("studentStore", () => {
  const backendStore = useBackendStore();
  const stateStudent = ref<Student[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Tüm öğrencileri getir
  async function getStudents() {
    isLoading.value = true;
    try {
      const response = await backendStore.getStudents(); // backendStore.backend().getStudents() yerine doğrudan çağırın
      console.log("GET /api/students yanıtı:", response.data);
      stateStudent.value = response.data;
    } catch (error) {
      console.error("GET /api/students hata:", error);
      errorMessage.value = "Öğrencileri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni öğrenci oluştur
  async function createStudent(newStudent: Partial<Student>) {
    isLoading.value = true;
    try {
      const response = await backendStore.createStudent(newStudent);
      console.log("POST /api/students yanıtı:", response.data);
      stateStudent.value.push(response.data);
      // İsteğe bağlı olarak listeyi tekrar çekebilirsiniz
      // await getStudents();
    } catch (error) {
      console.error("POST /api/students hata:", error);
      errorMessage.value = "Yeni öğrenci eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci güncelle
  async function updateStudent(updatedStudent: Student) {
    isLoading.value = true;
    try {
      const response = await backendStore.updateStudent(updatedStudent.id, updatedStudent);
      console.log("PUT /api/students/{id} yanıtı:", response.data);
      const index = stateStudent.value.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        stateStudent.value[index] = response.data;
      }
    } catch (error) {
      console.error("PUT /api/students hata:", error);
      errorMessage.value = "Öğrenciyi güncellerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci sil
  async function deleteStudent(studentId: string) {
    isLoading.value = true;
    try {
      await backendStore.deleteStudent(studentId);
      console.log("DELETE /api/students yanıtı: Silme başarılı");
      stateStudent.value = stateStudent.value.filter(student => student.id !== studentId);
    } catch (error: any) {
      if (error.response?.status === 404) {
        errorMessage.value = "Silinmek istenen öğrenci bulunamadı.";
      } else {
        errorMessage.value = "Öğrenciyi silerken bir hata oluştu.";
      }
      console.error("DELETE /api/students hata:", error);
    } finally {
      isLoading.value = false;
    }
  }

  // Tek bir öğrenci getir (id ile)
  async function getStudentById(studentId: string): Promise<Student | undefined> {
    isLoading.value = true;
    try {
      const response = await backendStore.getStudentById(studentId);
      console.log("GET /api/students/{id} yanıtı:", response.data);
      return response.data;
    } catch (error) {
      console.error("GET /api/students/{id} hata:", error);
      errorMessage.value = "Öğrenciyi getirirken bir hata oluştu.";
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    stateStudent,
    isLoading,
    errorMessage,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
});
