<template>
  <div class="bg-white full-width border-radius-15 q-my-sm q-pb-md">
    <div class="full-width text-primary text-h6 q-pl-md q-pt-md">ToDo:</div>

    <div class="flex column reverse">
      <template v-for="(todo, indexTodo) in todos" :key="`todo${indexTodo}`">
        <todo-field
          :index="indexTodo"
          :todo="todo"
        ></todo-field>
      </template>
    </div>
  </div>
</template>

<script>
import TodoField from 'components/Fields/TodoField.vue';
import { useTasksStore } from 'stores/tasksStore';
import { computed } from 'vue';

export default {
  name: 'MainTodos',
  components: { TodoField },
  setup() {
    const tasksStore = useTasksStore();
    const todos = computed(() => tasksStore.getTodos);

    const scrollHandler = () => {};
    return {
      scrollHandler,
      todos,
    };
  },
};
</script>

<style scoped>

</style>
