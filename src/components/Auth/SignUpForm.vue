<template>
  <div class="full-width row">
    <q-input filled
             standout
             outlined
             label="Name"
             type="text"
             v-model="name"
             :error="nameError"
             @keyup="nameError = false"
             @focus="nameError = false"
             class="col-12 q-pa-xs">
    </q-input>
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
    <q-input filled
             standout
             outlined
             label="Confirm Password"
             :type="showConfirmPassword ? 'text' : 'password'"
             v-model="confirmPassword"
             :error="confirmPasswordError"
             @keyup="confirmPasswordError = false"
             @focus="confirmPasswordError = false"
             class="col-12 q-pa-xs">
      <template v-slot:append>
        <q-icon name="las la-eye" v-if="!showConfirmPassword"
                @click="showConfirmPassword = true"
                class="cursor-pointer" />
        <q-icon name="las la-eye-slash" v-if="showConfirmPassword"
                @click="showConfirmPassword = false"
                class="cursor-pointer" />
      </template>
    </q-input>
    <q-btn size="lg"
           class="col-12 q-my-sm"
           color="primary"
           @click="register()"
           label="Sign Up"></q-btn>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Tools } from 'src/helpers/Tools';
import { API } from 'src/api';
import { AuthApi } from 'src/api/AuthApi';
import { useGlobalStore } from 'stores/globalStore';

export default {
  name: 'SignUpForm',
  setup() {
    const globalStore = useGlobalStore();
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const passwordError = ref(false);
    const confirmPasswordError = ref(false);
    const confirmPassword = ref('');
    const password = ref('');
    const email = ref('');
    const emailError = ref(false);
    const name = ref('');
    const nameError = ref(false);
    const closeSettingsDialog = () => {
      globalStore.setShowDialog('SettingsDialog', false);
    };
    const register = () => {
      if (!name.value || name.value.length < 3) {
        nameError.value = true;
      } else if (!Tools.isEmail(email.value)) {
        emailError.value = true;
      } else if (!Tools.isPassword(password.value)) {
        passwordError.value = true;
      } else if (!Tools.isPassword(confirmPassword.value)) {
        confirmPasswordError.value = true;
      } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = true;
        passwordError.value = true;
      } else {
        API.Auth.register({
          name: name.value,
          password: password.value,
          email: email.value,
        }).then((response) => {
          AuthApi.setCurrentUser(response.data);
          closeSettingsDialog();
        });
      }
    };

    return {
      name,
      nameError,
      email,
      emailError,
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
      showPassword,
      showConfirmPassword,
      register,
    };
  },
};
</script>
