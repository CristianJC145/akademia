<template>
  <div class="d-flex flex-column flex-shrink-0 pb-3 bg-light h-100">
    <router-link to="/" class="px-2 text-center">
      <img
          src="https://academia-user-serverless-deployment.s3.amazonaws.com/files/prod/2/2022/institution/logo1.png"
          class="img-fluid logo-institution">
    </router-link>
    <div class="d-flex flex-column h-100">
      <div class="d-flex flex-column justify-content-center align-items-center gap-2 px-4 text-center">
        <div class="dropdown">
          <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
             id="dropdownUser2"
             data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" class="rounded-circle me-2 main-avatar">
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li>
              <a class="dropdown-item" href="#">
                <AppIcon class="me-2" icon="user-circle"></AppIcon>
                Perfil
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="signOut">
                <AppIcon class="me-2" icon="sign-out-alt"></AppIcon>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>

        <span class="text-truncate w-100">
          Admin SGA Pruebas
        </span>

        <span class="text-truncate w-100">
          SGA Pruebas
        </span>
      </div>
      <ul class="nav nav-pills flex-column mb-auto px-3 pt-4">
        <li class="nav-item mt-2">
          <a href="#" class="nav-link active" aria-current="page">
            <AppIcon class="me-2" icon="home"></AppIcon>
            Inicio
          </a>
        </li>

        <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
          Configuración institucional
        </li>

        <li class="nav-item mt-2">
          <a href="#" class="nav-link text-secondary" aria-current="page">
            <AppIcon class="me-2" icon="home"></AppIcon>
            Información Auxiliar
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppIcon from '../components/AppIcon.vue';
import {SignOutService} from '../services/signOut.service';

const signOutService = new SignOutService();

export default defineComponent({
  components: {AppIcon},
  methods: {
    signOut() {
      signOutService.run();
      window.location.reload();
    },
  },
});

</script>

<style scoped>
.logo-institution {
  max-height: 125px;
}

.main-avatar {
  width: 5rem;
  height: 5rem;
}

.nav-item .nav-link:not(.active):hover {
  background-color: rgba(128, 128, 128, 0.1);
}
</style>