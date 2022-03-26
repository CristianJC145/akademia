<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <div class="w-100 text-center">
      <img class="img-main"
           src="https://academia-user-serverless-deployment.s3.amazonaws.com/files/prod/2/2022/institution/logo1.png">
    </div>
    <div class="card login-container shadow-sm w-100">
      <div class="card-body px-4 py-5">
        <form @submit.prevent="login">
          <div class="mb-3" :class="{ error: v$.form.username.$errors.length }">
            <label for="username">Nombre de usuario</label>
            <input type="text" class="form-control" id="username" v-model="v$.form.username.$model"/>

          </div>

          <div class="mb-3">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                     v-model="v$.form.password.$model">
              <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                <AppIcon :icon="showPassword ? 'eye-slash' : 'eye'"></AppIcon>
              </button>
            </div>

          </div>

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
import {onMounted, ref, defineComponent, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useVuelidate} from '@vuelidate/core';
import {required, minLength} from '@vuelidate/validators';
import {IsAuthenticatedService} from '../../../shared/services/isAuthenticated.service';
import AppIcon from '../../../shared/components/AppIcon.vue';

const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();
const defaultRouteRedirect = '/admin/home';

export default defineComponent({
  name: 'Login',
  components: {AppIcon},
  setup() {
    let loading = ref(true);
    let showPassword = ref(false);

    const router = useRouter();

    onMounted(async () => {
      const isAuthenticated = await isAuthenticatedService.run();
      if (isAuthenticated) {
        // await router.push(defaultRouteRedirect);
      }

      loading.value = false;
    });

    const login = () => {
      console.log('aqui');
    };

    const form = reactive({
      form: {
        username: '',
        password: '',
      },
    });

    const rules = {
      form: {
        username: {required},
        password: {required, min: minLength(6)},
      },
    };

    return {
      loading,
      showPassword,
      login,
      form,
      v$: useVuelidate(rules, form),
    };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 450px;
}

.img-main {
  max-width: 350px;
}
</style>