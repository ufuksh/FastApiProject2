// frontend/src/store/StudentStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "../store/backendStore"; // Relatif yol ile import

// Öğrenci Modeli (TypeScript Interface)
interface Student {
  id: string; // UUID olarak kullanılıyor
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
  grade?: string;
  contact_info?: string;
}

export const useStudentStore = defineStore("studentStore", () => {
  const backendStore = useBackendStore();
  const students = ref<Student[]>([]); // stateStudent yerine students
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Tüm öğrencileri getirir
  async function fetchStudents() {
    isLoading.value = true;
    try {
      const response = await backendStore.getStudents();
      console.log("GET /api/students yanıtı:", response.data);
      students.value = response.data as Student[];
    } catch (error) {
      console.error("GET /api/students hata:", error);
      errorMessage.value = "Öğrencileri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni öğrenci oluşturur
  async function createStudent(newStudent: Partial<Student>) {
    isLoading.value = true;
    try {
      const response = await backendStore.createStudent(newStudent);
      console.log("POST /api/students yanıtı:", response.data);
      students.value.push(response.data);
      // İsteğe bağlı olarak listeyi tekrar çekebilirsiniz
      // await fetchStudents();
    } catch (error) {
      console.error("POST /api/students hata:", error);
      errorMessage.value = "Yeni öğrenci eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci günceller
  async function updateStudent(updatedStudent: Student) {
    isLoading.value = true;
    try {
      const response = await backendStore.updateStudent(updatedStudent.id, updatedStudent);
      console.log("PATCH /api/students/{id} yanıtı:", response.data);
      const index = students.value.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        students.value[index] = response.data;
      }
    } catch (error) {
      console.error("PATCH /api/students hata:", error);
      errorMessage.value = "Öğrenciyi güncellerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrenci siler
  async function deleteStudent(studentId: string) {
    isLoading.value = true;
    try {
      await backendStore.deleteStudent(studentId);
      console.log("DELETE /api/students yanıtı: Silme başarılı");
      students.value = students.value.filter(student => student.id !== studentId);
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

  // Öğrenciyi ID ile getirir
  async function getStudentById(studentId: string): Promise<Student | undefined> {
    isLoading.value = true;
    try {
      const response = await backendStore.getStudentById(studentId);
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
    students, // stateStudent yerine students
    isLoading,
    errorMessage,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
});
