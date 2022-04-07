<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <div class="w-100 d-flex justify-content-center">
      <img class="img-main"
           src="https://academia-user-serverless-deployment.s3.amazonaws.com/files/prod/2/2022/institution/logo1.png"/>
    </div>

    <div class="card login-container shadow-sm w-100">
      <div class="card-body p-4">
        <AppLogin :redirect="defaultRouteRedirect" ref="login"></AppLogin>

        <div class="d-grid">
          <button class="btn btn-primary text-white btn-block" @click="$refs.login.login">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IsAuthenticatedService} from '../../../shared/services/isAuthenticated.service';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import {LoginService} from '../services/login.service';
import AppErrorAlert from '../../../shared/components/AppErrorAlert.vue';
import AppLogin from '../../../shared/components/AppLogin.vue';

const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();
const loginService = new LoginService();

export default defineComponent({
  name: 'Login',
  components: {AppLogin, AppErrorAlert, AppFormField, AppIcon},
  async mounted(): Promise<void> {
    const isAuth = isAuthenticatedService.run();

    if (isAuth) {
      // await this.redirect();
    }
  },
  data() {
    return {
      defaultRouteRedirect: '/admin/home',
      showModal: false,
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