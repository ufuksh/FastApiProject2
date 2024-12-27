import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "./backendStore"; // Backend işlemleri için import

// Program Modeli
interface Schedule {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  student_id: string;
  teacher_id: string;
}

export const useScheduleStore = defineStore("scheduleStore", () => {
  const backendStore = useBackendStore();
  const schedules = ref<Schedule[]>([]);
  const students = ref([]);  // Öğrenci listesi
  const teachers = ref([]);  // Öğretmen listesi
  const isLoading = ref(false);
  const errorMessage = ref("");

  // UUID doğrulama fonksiyonu
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  function isValidUUID(uuid: string): boolean {
    return uuidRegex.test(uuid);
  }

  // Tüm programları getir
  async function getSchedules() {
    isLoading.value = true;
    try {
      const response = await backendStore.getSchedules();
      schedules.value = response.data as unknown as Schedule[];
    } catch (error) {
      console.error("GET /api/schedules hata:", error);
      errorMessage.value = "Programları getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğrencileri al
  async function getStudents() {
    isLoading.value = true;
    try {
      const response = await backendStore.getStudents();
      students.value = response.data;  // Öğrencileri kaydet
    } catch (error) {
      console.error("GET /api/students hata:", error);
      errorMessage.value = "Öğrencileri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Öğretmenleri al
  async function getTeachers() {
    isLoading.value = true;
    try {
      const response = await backendStore.getTeachers();
      teachers.value = response;  // Öğretmenleri kaydet
    } catch (error) {
      console.error("GET /api/teachers hata:", error);
      errorMessage.value = "Öğretmenleri getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni program oluştur
  async function createSchedule(newSchedule: Partial<Schedule>) {
    // Alan doğrulama
    if (
      !newSchedule.title ||
      !newSchedule.start_time ||
      !newSchedule.end_time ||
      !newSchedule.student_id ||
      !newSchedule.teacher_id
    ) {
      errorMessage.value = "Lütfen tüm alanları doldurun.";
      return;
    }

    // UUID doğrulama
    if (!isValidUUID(newSchedule.student_id) || !isValidUUID(newSchedule.teacher_id)) {
      errorMessage.value = "Geçersiz UUID formatı.";
      return;
    }

    isLoading.value = true;
    try {
      const response = await backendStore.createSchedule(newSchedule);
      schedules.value.push(response.data as unknown as Schedule);
    } catch (error) {
      console.error("POST /api/schedules hata:", error);
      errorMessage.value = "Yeni program eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Program güncelle
  async function updateSchedule(updatedSchedule: Schedule) {
    if (!isValidUUID(updatedSchedule.id)) {
      errorMessage.value = "Geçersiz program ID'si.";
      return;
    }

    isLoading.value = true;
    try {
      const response = await backendStore.updateSchedule(updatedSchedule.id, updatedSchedule);
      const index = schedules.value.findIndex((s) => s.id === updatedSchedule.id);
      if (index !== -1) {
        schedules.value[index] = response.data as unknown as Schedule;
      }
    } catch (error) {
      console.error("PUT /api/schedules hata:", error);
      errorMessage.value = "Programı güncellerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Program sil
  async function deleteSchedule(scheduleId: string) {
    if (!isValidUUID(scheduleId)) {
      console.error("Geçersiz UUID:", scheduleId);
      errorMessage.value = "Geçersiz program ID'si.";
      return;
    }
  
    isLoading.value = true;
    try {
      await backendStore.deleteSchedule(scheduleId);
      schedules.value = schedules.value.filter((s) => s.id !== scheduleId);
    } catch (error) {
      console.error("DELETE /api/schedules hata:", error);
      errorMessage.value = "Programı silerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Tek bir programı ID ile getir
  async function getScheduleById(scheduleId: string): Promise<Schedule | undefined> {
    if (!isValidUUID(scheduleId)) {
      errorMessage.value = "Geçersiz program ID'si.";
      return undefined;
    }

    isLoading.value = true;
    try {
      const response = await backendStore.getScheduleById(scheduleId);
      return response.data as unknown as Schedule;
    } catch (error) {
      console.error("GET /api/schedules/{id} hata:", error);
      errorMessage.value = "Programı getirirken bir hata oluştu.";
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    schedules,
    students,
    teachers,
    isLoading,
    errorMessage,
    getSchedules,
    getStudents,
    getTeachers,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
  };
});