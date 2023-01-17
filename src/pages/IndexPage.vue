<template>
  <q-page class="flex flex-center content-start main-page q-px-sm vertical-top">
    <main-top></main-top>
    <div class="white-glass border-radius-15 q-pa-lg q-ma-lg full-width text-left">
      <h6>Goals22</h6>
    </div>
    <AddDialog></AddDialog>
    <Suspense>
      <!-- main content -->
      <SettingsDialog></SettingsDialog>
      <!-- loading state -->
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import AddDialog from 'components/Dialogs/AddDialog.vue';
import SettingsDialog from 'components/Dialogs/SettingsDialog.vue';
import MainTop from 'components/Main/MainTop.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    MainTop,
    AddDialog,
    SettingsDialog,
  },
  setup() {
    const globalStore = useGlobalStore();
    const rightDrawerOpen = computed(() => globalStore.getShowAddDialog);
    return {
      rightDrawerOpen,
    };
  },
});
</script>
