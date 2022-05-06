<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <router-link to="/" class="w-100 d-flex justify-content-center">
      <img class="img-main"
           :src="appLogo"/>
    </router-link>

    <div class="card login-container shadow-sm w-100 mt-4">
      <div class="card-body p-4">
        <AppLogin :redirect="defaultRouteRedirect" ref="login"></AppLogin>

        <div class="d-grid">
          <button class="btn btn-primary text-white btn-block" @click="$refs.login.login">
            Iniciar sesión
          </button>
        </div>

        <div class="text-center mt-2" v-if="allowRegistration">
          <router-link to="/register">
            ¿Aún no te has registrado?
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {IsAuthenticatedService} from '../../../shared/services/isAuthenticated.service';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppErrorAlert from '../../../shared/components/AppErrorAlert.vue';
import AppLogin from '../../../shared/components/AppLogin.vue';
import {settings} from '../../../shared/constant/settings.contants';
import {useRoute} from 'vue-router';

const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();

export default defineComponent({
  name: 'Login',
  components: {AppLogin, AppErrorAlert, AppFormField, AppIcon},
  setup() {
    const appLogo = settings.appLogo;
    let defaultRouteRedirect = '/';
    const showModal = ref(false);
    const allowRegistration = settings.appAllowRegistration;

    const route = useRoute();

    if (route.query.redirectURL) {
      defaultRouteRedirect = route.query.redirectURL as string;
    }

    onMounted(() => {
      const isAuth = isAuthenticatedService.run();

      if (isAuth) {
        // await this.redirect();
      }
    });

    return {
      appLogo,
      defaultRouteRedirect,
      showModal,
      allowRegistration,
    };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 450px;
}

.img-main {
  max-width: 300px;
}
</style>