import { defineStore } from "pinia";
import { ref } from "vue";
import { useBackendStore } from "@/store/backendStore";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const backendStore = useBackendStore();
  const stateSchedule = ref([]);

  // Tüm programları getir
  async function getSchedule() {
    const backend = await backendStore.backend();
    // /schedules/ GET
    const response = await backend.read_schedules_schedules__get();
    stateSchedule.value = response.data;
  }

  // Yeni program oluştur
  async function createSchedule(newSchedule) {
    const backend = await backendStore.backend();
    // /schedules/ POST
    // Fonksiyon imzası: create_schedule_schedules__post(parameters?, data?, config?)
    const response = await backend.create_schedule_schedules__post(
      null,
      newSchedule
    );
    stateSchedule.value.push(response.data);
  }

  // Program güncelle
  async function updateSchedule(updatedSchedule) {
    const backend = await backendStore.backend();
    // /schedules/{schedule_id} PUT
    const response = await backend.update_schedule_schedules__schedule_id__put(
      { schedule_id: updatedSchedule.id },
      updatedSchedule
    );

    // Local state'i güncelle
    const index = stateSchedule.value.findIndex(
      (s) => s.id === updatedSchedule.id
    );
    if (index !== -1) {
      stateSchedule.value[index] = response.data;
    }
  }

  // Program sil
  async function deleteSchedule(scheduleId) {
    const backend = await backendStore.backend();
    // /schedules/{schedule_id} DELETE
    await backend.delete_schedule_schedules__schedule_id__delete({
      schedule_id: scheduleId,
    });

    // Local state'den çıkar
    stateSchedule.value = stateSchedule.value.filter(
      (s) => s.id !== scheduleId
    );
  }

  // Tek bir program getir (id ile)
  async function getScheduleById(scheduleId) {
    const backend = await backendStore.backend();
    // /schedules/{schedule_id} GET
    const response = await backend.read_schedule_schedules__schedule_id__get({
      schedule_id: scheduleId,
    });
    return response.data;
  }

  return {
    stateSchedule,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
  };
});
