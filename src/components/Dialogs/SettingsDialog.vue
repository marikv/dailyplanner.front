<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="showSettingsDialog"
    @update:model-value="showSettingsDialogChangedValue"
    full-height
    class="add-dialog">
    <q-card class="full-height" style="width: 500px; max-width: 95vw;">
      <dialog-header @clickCloseBtn="closeAddDialog"></dialog-header>
      <q-card-section class="q-pt-xs">
        <q-list :bordered="false">

          <q-item v-if="!currentUser.token" clickable v-ripple @click="showAuthDialog = true">
            <q-item-section avatar>
              <q-avatar text-color="primary" icon="las la-user" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle1">
                {{currentUser.name || 'Guest'}}
              </q-item-label>
            </q-item-section>
            <q-item-section side>Sign In/Up</q-item-section>

            <q-dialog
              transition-show="slide-left"
              transition-hide="slide-right"
              v-model="showAuthDialog"
              full-height>
              <q-card class="full-height" style="width: 500px; max-width: 95vw;">
                <dialog-header @clickCloseBtn="showAuthDialog = false"></dialog-header>
                <q-card-section class="scroll">
                  <AuthForm></AuthForm>
                </q-card-section>
              </q-card>
            </q-dialog>

          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section>
              <q-toggle :model-value="false" label="Use goals"></q-toggle>
            </q-item-section>
          </q-item>
        </q-list>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, ref } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import DialogHeader from 'components/Dialogs/DialogHeader.vue';
import AuthForm from 'components/Auth/AuthForm.vue';
import { User } from 'src/db/User';

export default {
  name: 'SettingsDialog',
  components: {
    AuthForm,
    DialogHeader,
  },
  async setup() {
    const showAuthDialog = ref(false);
    const currentUser = ref({ name: 'Guest' });
    const globalStore = useGlobalStore();
    const showSettingsDialog = computed(() => globalStore.getShowSettingsDialog);

    await User.getFirst().then((user) => {
      currentUser.value = user;
    });
    const closeAddDialog = () => {
      globalStore.setShowSettingsDialog(false);
    };

    const showSettingsDialogChangedValue = (v) => {
      if (!v) {
        closeAddDialog();
      }
    };

    return {
      showSettingsDialog,
      closeAddDialog,
      showSettingsDialogChangedValue,
      currentUser,
      showAuthDialog,
    };
  },
};
</script>

<style scoped>

</style>
