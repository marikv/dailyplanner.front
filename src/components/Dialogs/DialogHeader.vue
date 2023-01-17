<template>
  <div class="btn-in-dialog-sticky-top bg-white q-py-xs z-index-9999">
    <div class="text-right full-width">
      <q-icon class="cursor-pointer"
              color="blue-grey-3"
              size="md"
              @click="onClickCloseBtn"
              name="las la-times-circle close-dialog-icon"></q-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogHeader',
  emits: ['clickCloseBtn'],
  setup(props, context) {
    const onClickCloseBtn = () => {
      context.emit('clickCloseBtn');
    };
    return {
      onClickCloseBtn,
    };
  },
};
</script>

<style scoped>

</style>
