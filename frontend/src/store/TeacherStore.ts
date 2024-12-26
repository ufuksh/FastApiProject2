import { defineStore } from "pinia";
import api from "@/api/api.js";

export const useTeacherStore = defineStore("teacherStore", {
  state: () => ({
    stateTeacher: [],
  }),
  actions: {
    async getTeacher() {
      const response = await api.getTeachers();
      this.stateTeacher = response.data;
    },
    async createTeacher(data) {
      await api.createTeacher(data);
      await this.getTeacher();
    },
    async deleteTeacher(id) {
      await api.deleteTeacher(id);
      await this.getTeacher();
    },
    async updateTeacher(data) {
      await api.updateTeacher(data.id, data);
      await this.getTeacher();
    },
  },
});
