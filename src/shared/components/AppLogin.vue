<template>
  <form @submit.prevent="login">
    <AppFormField :form-control="v$.form.username">
      <label for="username">Nombre de usuario</label>
      <input type="text" class="form-control" name="username" id="username" v-model="v$.form.username.$model"/>
    </AppFormField>

    <AppFormField :form-control="v$.form.password">
      <label for="password">Contraseña</label>
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" class="form-control" name="password" id="password"
               v-model="v$.form.password.$model"/>
        <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
          <AppIcon :icon="showPassword ? 'eye-slash' : 'eye'"></AppIcon>
        </button>
      </div>
    </AppFormField>
  </form>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import AppFormField from './AppFormField.vue';
import AppIcon from './AppIcon.vue';
import {useVuelidate} from '@vuelidate/core';
import {required} from '../plugins/vuelidate.plugin';
import {LoginService} from '../../modules/auth/services/login.service';

const loginService = new LoginService();

export default defineComponent({
  name: 'AppLogin',
  components: {AppFormField, AppIcon},
  props: ['redirect'],
  setup() {
    const form = reactive({
      username: '',
      password: '',
    });

    return {
      v$: useVuelidate({
        form: {
          username: {required},
          password: {required},
        },
      }, {form}),
      form,
    };
  },
  data() {
    return {
      messageWelcome: '',
      showModal: false,
      showPassword: false,
    };
  },
  methods: {
    async login(): Promise<void> {
      const formIsValid = await this.v$.$validate();

      if (!formIsValid) {
        return;
      }

      try {
        await loginService.run({
          username: this.form.username,
          password: this.form.password,
        });

        if (this.redirect) {
          await this.redirectToDefault();
        } else {
          this.$emit('success');
        }

      } catch (e) {
      }
    },
    async redirectToDefault(): Promise<void> {
      // await this.$router.push(this.redirect);
      window.location.href = this.redirect;
    },
  },
});
</script>

<style scoped>

</style>