<template>
  <div>
    <q-tabs
      v-model="tab"
      :dense="false"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="register" label="Sign Up" />
      <q-tab name="login" label="Sign In" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated keep-alive swipeable>
      <q-tab-panel name="register">
        <SignUpForm></SignUpForm>
      </q-tab-panel>
      <q-tab-panel name="login">
        <SignInForm></SignInForm>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator />
    <SocialButtons></SocialButtons>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import SignUpForm from 'components/Auth/SignUpForm.vue';
import SignInForm from 'components/Auth/SignInForm.vue';
import SocialButtons from 'components/Auth/SocialButtons.vue';
import { useAuthStore } from 'stores/authStore';

export default {
  name: 'AuthForm',
  components: { SocialButtons, SignInForm, SignUpForm },
  setup() {
    const authStore = useAuthStore();
    const currentUser = computed(() => authStore.getCurrentUser);
    return {
      tab: ref('register'),
      currentUser,
    };
  },
};
</script>

<style scoped>

</style>
