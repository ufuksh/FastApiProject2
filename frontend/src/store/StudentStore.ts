// frontend/src/store/StudentStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "../store/backendStore"; // Relatif yol ile import

// Öğrenci Modeli (TypeScript Interface)
interface Student {
  uuid?: string;
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
      stateStudent.value = response.data as Student[];
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
    const response = await backendStore.updateStudent(updatedStudent.uuid, updatedStudent);
    console.log("PATCH /api/students/{uuid} yanıtı:", response.data);
    const index = stateStudent.value.findIndex(student => student.uuid === updatedStudent.uuid);
    if (index !== -1) {
      stateStudent.value[index] = response.data;
    }
  } catch (error) {
    console.error("PATCH /api/students hata:", error);
    errorMessage.value = "Öğrenciyi güncellerken bir hata oluştu.";
  } finally {
    isLoading.value = false;
  }
}

// Öğrenci sil
async function deleteStudent(studentUuid: string) {
  isLoading.value = true;
  try {
    await backendStore.deleteStudent(studentUuid);
    console.log("DELETE /api/students yanıtı: Silme başarılı");
    stateStudent.value = stateStudent.value.filter(student => student.uuid !== studentUuid);
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

// Tek bir öğrenci getir (uuid ile)
async function getStudentByUuid(studentUuid: string): Promise<Student | undefined> {
  isLoading.value = true;
  try {
    const response = await backendStore.getStudentById(studentUuid);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      errorMessage.value = "Öğrenci bulunamadı.";
    } else {
      errorMessage.value = "Öğrenci getirilirken bir hata oluştu.";
    }
    console.error("GET /api/students hata:", error);
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
    getStudentByUuid,
  };
});
