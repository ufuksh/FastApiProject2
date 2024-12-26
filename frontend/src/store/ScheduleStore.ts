// frontend/src/store/scheduleStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "./backendStore"; // Relatif yol ile import

// Program Modeli
interface Schedule {
  id: string;
  name: string;
  description?: string;
  date?: string;
  // Diğer alanlar...
}

export const useScheduleStore = defineStore("scheduleStore", () => {
  const backendStore = useBackendStore();
  const stateSchedule = ref<Schedule[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Tüm programları getir
  async function getSchedule() {
    isLoading.value = true;
    try {
      const response = await backendStore.getSchedules();
      stateSchedule.value = response.data;
    } catch (error) {
      console.error("GET /api/schedules hata:", error);
      errorMessage.value = "Programları getirirken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Yeni program oluştur
  async function createSchedule(newSchedule: Partial<Schedule>) {
    isLoading.value = true;
    try {
      const response = await backendStore.createSchedule(newSchedule);
      stateSchedule.value.push(response.data);
    } catch (error) {
      console.error("POST /api/schedules hata:", error);
      errorMessage.value = "Yeni program eklerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Program güncelle
  async function updateSchedule(updatedSchedule: Schedule) {
    isLoading.value = true;
    try {
      const response = await backendStore.updateSchedule(updatedSchedule.id, updatedSchedule);
      const index = stateSchedule.value.findIndex((s) => s.id === updatedSchedule.id);
      if (index !== -1) {
        stateSchedule.value[index] = response.data;
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
    isLoading.value = true;
    try {
      await backendStore.deleteSchedule(scheduleId);
      stateSchedule.value = stateSchedule.value.filter((s) => s.id !== scheduleId);
    } catch (error) {
      console.error("DELETE /api/schedules hata:", error);
      errorMessage.value = "Programı silerken bir hata oluştu.";
    } finally {
      isLoading.value = false;
    }
  }

  // Tek bir program getir (id ile)
  async function getScheduleById(scheduleId: string): Promise<Schedule | undefined> {
    isLoading.value = true;
    try {
      const response = await backendStore.getScheduleById(scheduleId);
      return response.data;
    } catch (error) {
      console.error("GET /api/schedules/{id} hata:", error);
      errorMessage.value = "Programı getirirken bir hata oluştu.";
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    stateSchedule,
    isLoading,
    errorMessage,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
  };
});
