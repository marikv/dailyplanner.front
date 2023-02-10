import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {},
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  actions: {
    setCurrentUser(v) {
      this.currentUser = v;
    },
  },
});
