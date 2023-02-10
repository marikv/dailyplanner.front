<template>
  <div :class="`todo-field todo-field-${todoIndex} ${className} full-width q-mt-xs`">
    <div class="full-width row no-wrap q-px-xs q-py-sm">
      <div class="q-px-sm">
        <q-icon size="sm" name="lar la-circle" />
      </div>
      <div >
        <span>{{todoItem.name}}</span>
      </div>
    </div>
    <q-separator></q-separator>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'TodoField',
  props: {
    index: {
      type: Number,
      default: 0,
      required: false,
    },
    todo: {
      type: Object,
      default: null,
      required: true,
    },
  },
  setup(props) {
    const todoItem = ref(props.todo);
    const todoIndex = ref(props.index);
    let className = '';

    if (!todoItem.value.id) {
      className = 'bounce-bg-color';
      setTimeout(() => {
        document.querySelectorAll(`.${className}`).forEach((el) => {
          el.classList.remove(className);
        });
      }, 4000);
    }

    return {
      todoItem,
      todoIndex,
      className,
    };
  },
};
</script>

<style scoped>

</style>
