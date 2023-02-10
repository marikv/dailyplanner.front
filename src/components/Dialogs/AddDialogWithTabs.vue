<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="showAddDialog"
    full-height
    class="add-dialog"
  >
    <q-card class="full-height" style="width: 500px; max-width: 95vw;">
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="goal" label="Habit" />
          <q-tab name="todo" label="Todo" />
<!--          <q-tab name="note" label="Note" />-->
<!--          <q-tab name="piggyBank" label="Piggy Bank" />-->
        </q-tabs>
      </q-card-section>

      <q-card-section :style="innerStyle" class="scroll">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="goal">
            <AddDialogGoal></AddDialogGoal>
          </q-tab-panel>

          <q-tab-panel name="todo">
            <AddDialogTodo></AddDialogTodo>
          </q-tab-panel>

          <q-tab-panel name="note">
            <AddDialogNote></AddDialogNote>
          </q-tab-panel>

          <q-tab-panel name="piggyBank">
            <AddDialogPiggyBank></AddDialogPiggyBank>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Close" @click="closeAddDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, ref } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import AddDialogGoal from 'components/Dialogs/AddDialogGoal.vue';
import AddDialogTodo from 'components/Dialogs/AddDialogTodo.vue';
import AddDialogNote from 'components/Dialogs/AddDialogNote.vue';
import AddDialogPiggyBank from 'components/Dialogs/AddDialogPiggyBank.vue';
import { useQuasar } from 'quasar';

export default {
  name: 'AddDialog',
  components: {
    AddDialogNote,
    AddDialogTodo,
    AddDialogGoal,
    AddDialogPiggyBank,
  },
  setup() {
    const $q = useQuasar();
    const globalStore = useGlobalStore();
    const showAddDialog = computed(() => globalStore.getShowDialog('AddDialog'));

    const closeAddDialog = () => {
      globalStore.setShowDialog('AddDialog', false);
    };

    const conentHeight = $q.screen.height - 170;
    const innerStyle = `min-height: ${conentHeight}px; max-height: ${conentHeight}px; height: ${conentHeight}px;`;

    return {
      innerStyle,
      showAddDialog,
      closeAddDialog,
      tab: ref('goal'),
    };
  },
};
</script>

<style scoped>

</style>
