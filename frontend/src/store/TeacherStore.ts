import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "../store/backendStore"; // Relatif yol ile import

// Öğretmen Modeli (TypeScript Interface)
interface Teacher {
  id: string; // UUID olarak kullanılıyor
  first_name: string;
  last_name: string;
  email?: string;
  subject_specialization?: string;
  contact_info?: string;
}

export const useTeacherStore = defineStore("teacherStore", () => {
  const backendStore = useBackendStore();
  const teachers = ref<Teacher[]>([]); // Öğretmen listesini tutan state
  const isLoading = ref(false); // Yüklenme durumu
  const errorMessage = ref(""); // Hata mesajı

  // UUID doğrulama fonksiyonu (Tekrar tanımlamayı önlemek için burada sadece bir kez tanımlanmıştır)
  function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Tüm öğretmenleri getirir
  async function fetchTeachers() {
    isLoading.value = true;
    try {
      const response = await backendStore.getTeachers();
      console.log("GET /api/teachers yanıtı:", response);

      // response.data'yı önce unknown sonra Teacher[] olarak cast ediyoruz
      teachers.value = response as unknown as Teacher[];
    } catch (error) {
      console.error("GET /api/teachers hata:", error);
      errorMessage.value = "Öğretmenleri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni öğretmen oluşturur
  async function createTeacher(newTeacher: Partial<Teacher>) {
    isLoading.value = true;
    try {
      const response = await backendStore.createTeacher(newTeacher);
      teachers.value.push(response as unknown as Teacher); // Yeni öğretmen listeye eklenir
    } catch (error) {
      console.error("POST /api/teachers hata:", error);
      errorMessage.value = "Yeni öğretmen eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğretmen günceller
  async function updateTeacher(updatedTeacher: Teacher) {
    if (!isValidUUID(updatedTeacher.id)) {
      errorMessage.value = "Geçersiz öğretmen ID'si.";
      console.error("Geçersiz UUID:", updatedTeacher.id);
      return;
    }

    isLoading.value = true;
    try {
      const response = await backendStore.updateTeacher(updatedTeacher.id, updatedTeacher);
      const index = teachers.value.findIndex((teacher) => teacher.id === updatedTeacher.id);
      if (index !== -1) {
        teachers.value[index] = response as unknown as Teacher; // Güncellenmiş öğretmeni listeye ekler
      } else {
        console.warn("Güncellenmek istenen öğretmen listede bulunamadı.");
      }
    } catch (error) {
      console.error("PUT /api/teachers hata:", error);
      errorMessage.value = "Öğretmen güncellenirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğretmen silme fonksiyonu
  async function deleteTeacher(teacherId: string) {
    // UUID kontrolü
    if (!isValidUUID(teacherId)) {
      errorMessage.value = "Geçersiz öğretmen ID'si.";
      console.error("Geçersiz UUID:", teacherId);
      return;
    }

    // Silme işlemi başlatılıyor
    isLoading.value = true;
    try {
      // Öğretmeni silmek için backend metodunu çağırıyoruz
      await backendStore.deleteTeacher(teacherId);
      // Öğretmen başarıyla silindiyse, listeyi güncelliyoruz
      teachers.value = teachers.value.filter((teacher) => teacher.id !== teacherId);
    } catch (error) {
      // Silme işlemi sırasında hata olursa
      console.error("DELETE /api/teachers hata:", error);
      errorMessage.value = "Öğretmeni silerken bir hata oluştu.";
    } finally {
      // Silme işlemi tamamlandığında yükleniyor durumunu kaldırıyoruz
      isLoading.value = false;
    }
  }

  // Öğretmeni ID ile getirir
  async function getTeacherById(teacherId: string): Promise<Teacher | undefined> {
    if (!isValidUUID(teacherId)) {
      errorMessage.value = "Geçersiz öğretmen ID'si.";
      console.error("Geçersiz UUID:", teacherId);
      return undefined;
    }

    isLoading.value = true;
    try {
      const response = await backendStore.getTeacherById(teacherId);
      return response as unknown as Teacher;
    } catch (error) {
      console.error("GET /api/teachers hata:", error);
      errorMessage.value = "Öğretmen getirilirken bir hata oluştu.";
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    teachers,
    isLoading,
    errorMessage,
    fetchTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
  };
});