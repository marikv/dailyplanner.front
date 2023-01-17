import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    showAddDialog: false,
    showSettingsDialog: false,
    showLeftDrawer: true,
  }),
  getters: {
    getShowAddDialog: (state) => state.showAddDialog,
    getShowSettingsDialog: (state) => state.showSettingsDialog,
    getShowLeftDrawer: (state) => state.showLeftDrawer,
  },
  actions: {
    setShowAddDialog(v) {
      this.showAddDialog = v;
    },
    setShowSettingsDialog(v) {
      this.showSettingsDialog = v;
    },
    setShowLeftDrawer(v) {
      this.showLeftDrawer = v;
    },
  },
});
