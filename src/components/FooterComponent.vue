<template>
  <q-footer>
    <q-toolbar>
      <q-btn
        flat
        dense
        v-if="isAdmin"
        size="lg"
        round
        icon="las la-bars"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <q-btn
        flat
        dense
        size="xl"
        round
        icon="las la-list"
        aria-label="Dashboard"
        @click="toggleLeftDrawer"
      />
      <q-space></q-space>
      <q-btn
        flat
        dense
        size="xl"
        round
        icon="las la-chart-bar"
        aria-label="Progress"
        @click="toggleLeftDrawer"
      />
      <q-space></q-space>
      <q-btn
        flat
        dense
        size="xl"
        round
        icon="las la-plus-circle"
        @click="toggleAddDialog"
      />
      <q-space></q-space>
      <q-btn
        flat
        dense
        size="xl"
        round
        icon="las la-user-cog"
        aria-label="User"
        @click="toggleSettingsDialog"
      />
    </q-toolbar>
  </q-footer>
</template>

<script>
import { useGlobalStore } from 'stores/globalStore';
import { ref } from 'vue';

export default {
  name: 'FooterComponent',
  setup() {
    const isAdmin = ref(false);
    const globalStore = useGlobalStore();
    const toggleAddDialog = () => {
      globalStore.setShowAddDialog(!globalStore.getShowAddDialog);
    };
    const toggleSettingsDialog = () => {
      globalStore.setShowSettingsDialog(!globalStore.getShowSettingsDialog);
    };
    const toggleLeftDrawer = () => {
      globalStore.setShowLeftDrawer(!globalStore.getShowLeftDrawer);
    };
    return {
      toggleLeftDrawer,
      toggleAddDialog,
      toggleSettingsDialog,
      isAdmin,
    };
  },
};
</script>

<style scoped>

</style>
