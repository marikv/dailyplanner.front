<template>
  <div class="full-width row">
    <q-input filled
             standout
             outlined
             label="Email"
             type="email"
             v-model="email"
             :error="emailError"
             @keyup="emailError = false"
             @focus="emailError = false"
             class="col-12 q-pa-xs">
    </q-input>
    <q-input filled
             standout
             outlined
             label="Password"
             :type="showPassword ? 'text' : 'password'"
             v-model="password"
             :error="passwordError"
             @keyup="passwordError = false"
             @focus="passwordError = false"
             class="col-12 q-pa-xs">
      <template v-slot:append>
        <q-icon name="las la-eye" v-if="!showPassword"
                @click="showPassword = true"
                class="cursor-pointer" />
        <q-icon name="las la-eye-slash" v-if="showPassword"
                @click="showPassword = false"
                class="cursor-pointer" />
      </template>
    </q-input>
    <q-btn size="lg" class="col-12 q-my-sm" color="primary" label="Sign In"></q-btn>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SignInForm',
  setup() {
    const showPassword = ref(false);
    const passwordError = ref(false);
    const password = ref('');
    const email = ref('');
    const emailError = ref(false);
    return {
      email,
      emailError,
      password,
      passwordError,
      showPassword,
    };
  },
};
</script>

<style scoped>

</style>
