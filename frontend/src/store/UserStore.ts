import { defineStore } from "pinia";
import api from "@/api/api.js";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    stateUser: [], // Kullanıcı verilerini tutar
  }),
  actions: {
    async getUser() {
      const response = await api.getUsers();
      this.stateUser = response.data;
    },
    async createUser(data) {
      await api.createUser(data);
      await this.getUser();
    },
    async deleteUser(id) {
      await api.deleteUser(id);
      await this.getUser();
    },
    async updateUser(data) {
      await api.updateUser(data.id, data);
      await this.getUser();
    },
  },
});
