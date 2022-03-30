<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <div class="w-100 text-center">
      <img class="img-main"
           src="https://academia-user-serverless-deployment.s3.amazonaws.com/files/prod/2/2022/institution/logo1.png">
    </div>
    <div class="card login-container shadow-sm w-100">
      <div class="card-body px-4 py-5">
        <form @submit.prevent="login">
          <AppFormField :form-control="v$.form.username">
            <label for="username">Nombre de usuario</label>
            <input type="text" class="form-control" id="username"
                   v-model="v$.form.username.$model"/>
          </AppFormField>
          <!--          <div class="mb-3 ">
                      <label for="username">Nombre de usuario</label>
                      <input type="text" class="form-control" :class="{ 'is-invalid': v$.form.username.$error }" id="username" v-model="v$.form.username.$model"/>
                      <small class="text-danger" v-if="v$.form.username.$errors.length">
                        {{ v$.form.username.$errors[0].$message }}
                      </small>
                    </div>-->

          <AppFormField :form-control="v$.form.password">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                     v-model="v$.form.password.$model">
              <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                <AppIcon :icon="showPassword ? 'eye-slash' : 'eye'"></AppIcon>
              </button>
            </div>
          </AppFormField>

          <div class="d-grid">
            <button class="btn btn-primary text-white btn-block">
              Iniciar sesión
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';
import useVuelidate from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import {IsAuthenticatedService} from '../../../shared/services/isAuthenticated.service';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import {LoginService} from '../services/login.service';

const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();
const loginService = new LoginService();

export default defineComponent({
  name: 'Login',
  components: {AppFormField, AppIcon},
  setup() {
    return {
      showPassword: ref(false),
      v$: useVuelidate(),
    };
  },
  async mounted(): Promise<void> {
    const isAuth = isAuthenticatedService.run();

    if (isAuth) {
      await this.redirect();
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      defaultRouteRedirect: '/admin/home',
    };
  },
  validations() {
    return {
      form: {
        username: {required},
        password: {required},
      },
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

        await this.redirect();
      } catch (e) {
        console.log(e);
      }
    },
    async redirect(): Promise<void> {
      await this.$router.push(this.defaultRouteRedirect);
    },
  },
})
;
</script>

<style scoped>
.login-container {
  max-width: 450px;
}

.img-main {
  max-width: 350px;
}
</style>