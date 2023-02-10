<template>
  <q-dialog v-model="showAddTodoDialog" position="bottom">
    <q-card>
      <q-card-section class="row">
        <div class="col-12 q-pb-sm">
          <q-input color="primary"
                   filled
                   ref="addTodoInputRef"
                   v-model="newTodoName"
                   class="full-width"
                   placeholder="Add New To-Do"
          >
            <template v-slot:prepend>
              <q-icon name="lar la-circle" />
            </template>
          </q-input>
          <q-input color="primary"
                   filled
                   dense
                   ref="addTodoInputDescriptionRef"
                   v-model="newTodoDescription"
                   class="full-width"
                   placeholder="Optional description"
                   input-class="add-todo-description"
          >
          </q-input>
        </div>

        <div class="col-10"></div>
        <div class="col-2 text-right">
          <q-btn :flat="true"
                 round
                 dense
                 size="md"
                 icon="las la-arrow-up"
                 class="bg-primary q-mr-xs"
                 color="white"
                 @click="addNewTodo"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  computed,
  ref,
  watchEffect,
} from 'vue';
import { useTasksStore } from 'stores/tasksStore';
import { useGlobalStore } from 'stores/globalStore';

export default {
  name: 'AddDialogTodo',
  components: {},
  setup() {
    const tasksStore = useTasksStore();
    const globalStore = useGlobalStore();
    const newTodoName = ref('');
    const newTodoDescription = ref('');
    const addTodoInputRef = ref(null);
    const addTodoInputDescriptionRef = ref(null);
    const showAddTodoDialog = computed(() => globalStore.getShowDialog('AddTodoDialog'));

    watchEffect(
      () => {
        if (showAddTodoDialog.value) {
          setTimeout(() => {
            if (addTodoInputRef.value && addTodoInputRef.value.focus) {
              addTodoInputRef.value.focus();
            }
          }, 20);
        }
      },
      {
        flush: 'post',
      },
    );

    const addNewTodo = () => {
      if (newTodoName.value) {
        tasksStore.addNewTask({
          name: newTodoName.value,
          isGoal: null,
          isTodo: 1,
        });
        newTodoName.value = '';
      }
    };

    return {
      newTodoName,
      newTodoDescription,
      addNewTodo,
      showAddTodoDialog,
      addTodoInputRef,
      addTodoInputDescriptionRef,
    };
  },
};
</script>

<style scoped>

</style>
