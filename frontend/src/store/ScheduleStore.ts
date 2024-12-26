import { defineStore } from "pinia";
import api from "@/api/api.js";

export const useScheduleStore = defineStore("scheduleStore", {
  state: () => ({
    stateSchedule: [], // Program verilerini tutar
  }),
  actions: {
    async getSchedule() {
      const response = await api.getSchedules();
      this.stateSchedule = response.data;
    },
    async createSchedule(data) {
      await api.createSchedule(data);
      await this.getSchedule();
    },
    async deleteSchedule(id) {
      await api.deleteSchedule(id);
      await this.getSchedule();
    },
    async updateSchedule(data) {
      await api.updateSchedule(data.id, data);
      await this.getSchedule();
    },
  },
});
