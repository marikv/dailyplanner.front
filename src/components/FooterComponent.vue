<template>
<!--  <div class="fixed-bottom">-->
  <q-footer class="bg-deep-purple-10 q-pb-lg">
    <q-toolbar
      class="bg-deep-purple-10">
      <q-btn
        flat
        :dense="true"
        size="md"
        color="white"
        round
        icon="las la-home"
        aria-label="Dashboard"
        @click="toggleLeftDrawer"
        class="bg-deep-purple-10"
      />
      <q-space></q-space>
      <q-btn
        flat
        :dense="true"
        size="md"
        color="white"
        round
        icon="las la-calendar"
        aria-label="Calendar"
        @click="toggleLeftDrawer"
        class="bg-deep-purple-10"
      />
      <q-space></q-space>
      <div class="relative-position">
<!--        <q-btn-->
<!--          flat-->
<!--          :dense="false"-->
<!--          size="xl"-->
<!--          color="white"-->
<!--          round-->
<!--          icon="las la-plus"-->
<!--          @click="openAddDialog"-->
<!--          class="bg-secondary absolute-center"-->
<!--        />-->
        <q-fab
          vertical-actions-align="center"
          color="primary"
          icon="las la-plus"
          direction="up"
        >
          <q-fab-action color="accent" @click="openAddTodoDialog"
                        icon="lar la-check-circle" label="To-Do" />
          <q-fab-action color="primary" @click="openAddDialog"
                        icon="mail" label="Email" />
          <q-fab-action color="secondary" @click="openAddDialog"
                        icon="alarm" label="Alarm" />
          <q-fab-action color="orange" @click="openAddDialog"
                        icon="airplay" label="Airplay" />
        </q-fab>
      </div>
      <q-space></q-space>
      <q-btn
        flat
        :dense="true"
        size="md"
        color="white"
        round
        icon="las la-chart-bar"
        aria-label="Progress"
        @click="toggleLeftDrawer"
        class="bg-deep-purple-10"
      />
      <q-space></q-space>
      <q-btn
        flat
        :dense="true"
        size="md"
        color="white"
        round
        icon="las la-user-cog"
        aria-label="User"
        @click="openSettingsDialog"
        class="bg-deep-purple-10"
      />
    </q-toolbar>

    <AddDialog></AddDialog>
    <AddDialogTodo></AddDialogTodo>

    <Suspense>
      <!-- main content -->
      <SettingsDialog></SettingsDialog>
      <!-- loading state -->
<!--      <template #fallback>-->
<!--        Loading...-->
<!--      </template>-->
    </Suspense>
<!--  </div>-->
  </q-footer>
</template>

<script>
import { useGlobalStore } from 'stores/globalStore';
import SettingsDialog from 'components/Dialogs/SettingsDialog.vue';
import AddDialog from 'components/Dialogs/AddDialog.vue';
import AddDialogTodo from 'components/Dialogs/AddDialogTodo.vue';
// import AddDialog from 'components/Dialogs/AddDialogWithTabs.vue';

export default {
  name: 'FooterComponent',
  components: {
    AddDialogTodo,
    AddDialog,
    SettingsDialog,
  },
  setup() {
    const globalStore = useGlobalStore();
    const openAddDialog = () => {
      globalStore.setShowDialog('AddDialog', true);
    };
    const openSettingsDialog = () => {
      globalStore.setShowDialog('SettingsDialog', true);
    };
    const openAddTodoDialog = () => {
      globalStore.setShowDialog('AddTodoDialog', true);
    };
    const toggleLeftDrawer = () => {
      globalStore.setShowLeftDrawer(!globalStore.getShowLeftDrawer);
    };
    return {
      toggleLeftDrawer,
      openAddDialog,
      openSettingsDialog,
      openAddTodoDialog,
    };
  },
};
</script>

<style scoped>

</style>
