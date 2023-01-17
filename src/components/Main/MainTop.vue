<template>
  <div>
    <div>2022/11/01 - 2022/11/07</div>
    <q-scroll-area class="">
      <q-scroll-observer @scroll="scrollHandler" />
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: 'MainTop',
  setup() {
    const scrollHandler = () => {};
    return {
      scrollHandler,
    };
  },
};
</script>

<style scoped>

</style>
