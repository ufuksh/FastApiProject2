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
  const students = ref<Student[]>([]); // Öğrenci listesini tutan state
  const isLoading = ref(false); // Yüklenme durumu
  const errorMessage = ref(""); // Hata mesajı

  // UUID doğrulama fonksiyonu
  function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

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
      students.value.push(response.data); // Listeye yeni öğrenci eklenir
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
      if (!isValidUUID(updatedStudent.id)) {
        console.error("Geçersiz UUID:", updatedStudent.id);
        errorMessage.value = "Geçersiz öğrenci ID'si.";
        return;
      }
      const response = await backendStore.updateStudent(updatedStudent.id, updatedStudent); // PUT kullanımı
      console.log("PUT /api/students/{id} yanıtı:", response.data);
  
      const index = students.value.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        students.value[index] = response.data;
      }
    } catch (error) {
      console.error("PUT /api/students hata:", error);
      errorMessage.value = "Öğrenciyi güncellerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }
  
  

  // Öğrenci siler
  async function deleteStudent(studentId: string) {
    isLoading.value = true;
    try {
      if (!isValidUUID(studentId)) {
        console.error("Geçersiz UUID:", studentId);
        errorMessage.value = "Geçersiz öğrenci ID'si.";
        return;
      }
      await backendStore.deleteStudent(studentId);
      console.log("DELETE /api/students yanıtı: Silme başarılı");

      // Listeden silinen öğrenciyi kaldır
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
      if (!isValidUUID(studentId)) {
        console.error("Geçersiz UUID:", studentId);
        errorMessage.value = "Geçersiz öğrenci ID'si.";
        return undefined;
      }
      const response = await backendStore.getStudentById(studentId);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        errorMessage.value = "Öğrenci bulunamadı.";
      } else {
        errorMessage.value = "Öğrenci getirilirken bir hata oluştu.";
      }
      console.error("GET /api/students hata:", error);
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    students,
    isLoading,
    errorMessage,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };
});
