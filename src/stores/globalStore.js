import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    showDialog: {},
    showLeftDrawer: true,
  }),
  getters: {
    getShowDialog(state) {
      return (dialogName) => !!state.showDialog[dialogName];
    },
    getShowLeftDrawer: (state) => state.showLeftDrawer,
  },
  actions: {
    setShowDialog(dialogName, value) {
      this.showDialog[dialogName] = value;
    },
    setShowLeftDrawer(v) {
      this.showLeftDrawer = v;
    },
  },
});
