<template>
  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="settingsDialog"
    full-height
    class="add-dialog">
    <q-card class="full-height" style="width: 500px; max-width: 95vw;">
      <dialog-header @clickCloseBtn="closeSettingsDialog()"></dialog-header>
      <q-card-section class="q-pt-xs">
        <q-list :bordered="false">

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar text-color="primary" icon="las la-user" />
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-if="!currentUser.token"
                @click="openAuthDialog()"
                class="text-subtitle1">
                Guest
              </q-item-label>
              <q-item-label
                v-else
                @click="logout()"
                class="text-subtitle1">
                {{currentUser.token ? currentUser.name : 'Guest'}}
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="!currentUser.token"
                            @click="openAuthDialog()"
                            side>Sign In/Up</q-item-section>
            <q-item-section v-else
                            @click="logout()"
                            side>
              <q-btn color="secondary" label="Log out"></q-btn>
            </q-item-section>
            <q-dialog
              transition-show="slide-left"
              transition-hide="slide-right"
              v-model="authDialog"
              full-height>
              <q-card class="full-height" style="width: 500px; max-width: 95vw;">
                <dialog-header @clickCloseBtn="closeAuthDialog()"></dialog-header>
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
import { useGlobalStore } from 'stores/globalStore';
import DialogHeader from 'components/Dialogs/DialogHeader.vue';
import AuthForm from 'components/Auth/AuthForm.vue';
import { User } from 'src/db/User';
import { useAuthStore } from 'stores/authStore';
import { computed, watchEffect } from 'vue';

export default {
  name: 'SettingsDialog',
  components: {
    AuthForm,
    DialogHeader,
  },
  async setup() {
    const globalStore = useGlobalStore();
    const authStore = useAuthStore();
    const settingsDialog = computed(() => globalStore.getShowDialog('SettingsDialog'));
    const authDialog = computed(() => globalStore.getShowDialog('AuthDialog'));
    const currentUser = computed(() => authStore.getCurrentUser);
    const closeSettingsDialog = () => {
      globalStore.setShowDialog('SettingsDialog', false);
    };
    const openAuthDialog = () => {
      globalStore.setShowDialog('AuthDialog', true);
    };
    const closeAuthDialog = () => {
      globalStore.setShowDialog('AuthDialog', false);
    };
    const logout = () => {
      const currentUser2 = currentUser.value;
      currentUser2.token = '';
      currentUser2.name = '';
      currentUser2.email = '';
      currentUser2.password = '';
      User.update(currentUser2);
      authStore.setCurrentUser(currentUser2);
      closeAuthDialog();
      closeSettingsDialog();
    };

    watchEffect(() => {
      if (currentUser.value.id > 0) {
        closeAuthDialog();
        closeSettingsDialog();
      }
    });

    return {
      settingsDialog,
      closeSettingsDialog,
      currentUser,
      authDialog,
      openAuthDialog,
      closeAuthDialog,
      logout,
    };
  },
};
</script>

<style scoped>

</style>
