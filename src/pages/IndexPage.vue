<template>
  <q-page class="flex flex-center content-start main-page q-px-sm vertical-top">
    <main-top></main-top>
    <main-todos></main-todos>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import MainTop from 'components/Main/MainTop.vue';
import MainTodos from 'components/Main/MainTodos.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    MainTodos,
    MainTop,
  },
  setup() {
    return {
    };
  },
});
</script>
