<template>
  <div>
    <q-input color="primary" v-model="text" label="Label">
      <template v-slot:prepend>
        <q-icon name="add" />
      </template>
      <template v-slot:append>
        <q-icon name="las la-ellipsis-h" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AddDialogTodo',
  setup() {
    const text = ref();
    return {
      text,
    };
  },
};
</script>

<style scoped>

</style>
