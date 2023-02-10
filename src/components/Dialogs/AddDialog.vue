<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="showAddDialog"
    full-height
    class="add-dialog"
  >
    <q-card class="full-height" style="width: 500px; max-width: 95vw;">
      <dialog-header @clickCloseBtn="closeAddDialog()"></dialog-header>
      <q-card-section class="q-pt-xs">
        <div class="row">
          <div v-for="(step2item, step2Index) in step2Array"
               v-bind:key="`step2${step2Index}`"
               class="col-12 text-center q-mt-md">
            <q-btn outline
                   unelevated
                   no-caps
                   rounded
                   size="lg"
                   align="between"
                   style="max-width: 287px;"
                   :color="step2item.color"
                   class="full-width"
                   @click="setStep2(step2item.alias)"
                   :icon-right="step2item.iconRight"
                   :icon="step2item.iconLeft"
                   :label="step2item.label" />
          </div>
        </div>

        <q-dialog
          transition-show="slide-left"
          transition-hide="slide-right"
          v-model="showStep2"
          full-height
        >
          <q-card class="full-height" style="width: 500px; max-width: 95vw;">
            <dialog-header @clickCloseBtn="setStep2(null)"></dialog-header>
            <q-card-section class="scroll">
              <AddDialogGoal v-if="step2 === 'goal'"></AddDialogGoal>
              <AddDialogTodo v-else-if="step2 === 'todo'"></AddDialogTodo>
              <AddDialogNote v-else-if="step2 === 'note'"></AddDialogNote>
              <AddDialogPiggyBank v-else-if="step2 === 'piggyBank'"></AddDialogPiggyBank>
            </q-card-section>
          </q-card>
        </q-dialog>

      </q-card-section>
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
import DialogHeader from 'components/Dialogs/DialogHeader.vue';

export default {
  name: 'AddDialog',
  components: {
    AddDialogNote,
    AddDialogTodo,
    AddDialogGoal,
    AddDialogPiggyBank,
    DialogHeader,
  },
  setup() {
    const globalStore = useGlobalStore();
    const showAddDialog = computed(() => globalStore.getShowDialog('AddDialog'));

    const step2Array = ref([{
      alias: 'goal',
      color: 'primary',
      label: 'Habit / Goal',
      iconRight: 'las la-angle-right',
      iconLeft: null,
    }, {
      alias: 'todo',
      color: 'accent',
      label: 'Todo',
      iconRight: 'las la-angle-right',
      iconLeft: null,
    }, {
      alias: 'piggyBank',
      color: 'secondary',
      label: 'Piggy Bank',
      iconRight: 'las la-angle-right',
      iconLeft: null,
    }]);

    const closeAddDialog = () => {
      globalStore.setShowDialog('AddDialog', false);
    };

    const showStep2 = ref(false);
    const step2 = ref(null);
    const setStep2 = (step2Value) => {
      step2.value = step2Value;
      showStep2.value = !!step2Value;
    };

    return {
      showAddDialog,
      closeAddDialog,
      setStep2,
      step2,
      showStep2,
      step2Array,
    };
  },
};
</script>

<style scoped>

</style>
