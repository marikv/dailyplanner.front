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
import { ref } from 'vue';
import SignUpForm from 'components/Auth/SignUpForm.vue';
import SignInForm from 'components/Auth/SignInForm.vue';
import SocialButtons from 'components/Auth/SocialButtons.vue';

export default {
  name: 'AuthForm',
  components: { SocialButtons, SignInForm, SignUpForm },
  setup() {
    return {
      tab: ref('register'),
    };
  },
};
</script>

<style scoped>

</style>
