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
        <template v-for="item in items">
          <li v-if="item.children.length" class="nav-item mt-4 text-primary text-uppercase main-item">
            {{ t(item.title) }}
          </li>
          <li v-else class="nav-item mt-2">
            <AppLinkNavigation :title="item.title" :icon="item.icon" :link="item.link"></AppLinkNavigation>
          </li>

          <li v-for="child in item.children" class="nav-item mt-2">
            <AppLinkNavigation :title="child.title" :icon="child.icon" :link="child.link"></AppLinkNavigation>
          </li>
        </template>

        <!--        <li class="nav-item mt-2">
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
                    <AppIcon class="me-2" icon="calendar-minus"></AppIcon>
                    Información Auxiliar
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="building"></AppIcon>
                    Información Institucional
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Programas Académicos
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="book-open"></AppIcon>
                    Áreas y asignaturas
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="graduation-cap"></AppIcon>
                    Niveles y grados
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="chart-line"></AppIcon>
                    Plan de estudios
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Planeación Académica
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="calendar-week"></AppIcon>
                    Ciclos académicos
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="user-friends"></AppIcon>
                    Oferta académica
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="users"></AppIcon>
                    Especialistas
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Administración Académica
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="user-friends"></AppIcon>
                    Administración de cursos
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="clipboard-list"></AppIcon>
                    Matricular estudiante
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Administración de usuarios
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="users"></AppIcon>
                    Roles
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="user"></AppIcon>
                    Usuarios
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="file-medical"></AppIcon>
                    Historias clínicas
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Salón de clases
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="school"></AppIcon>
                    Inicio (Profesores)
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="arrow-circle-up"></AppIcon>
                    Sincronizar cursos
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="house-user"></AppIcon>
                    Inicio (Estudiantes)
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="calendar"></AppIcon>
                    Horario
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="tasks"></AppIcon>
                    Actividades
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="calendar-minus"></AppIcon>
                    Configurar horario
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="address-card"></AppIcon>
                    Perfil Estudiantes
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Control disciplinario
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="layer-group"></AppIcon>
                    Ofensas
                  </a>
                </li>
                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="ban"></AppIcon>
                    Faltas disciplinarias
                  </a>
                </li>

                <li class="nav-item mt-4 text-primary text-uppercase" style="font-size: .75rem">
                  Reportes
                </li>

                <li class="nav-item mt-2">
                  <a href="#" class="nav-link text-secondary" aria-current="page">
                    <AppIcon class="me-2" icon="chart-bar"></AppIcon>
                    Reportes
                  </a>
                </li>-->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import AppIcon from '../components/AppIcon.vue';
import {SignOutService} from '../services/signOut.service';
import NavigationStore from '../stores/navigation.store';
import {useI18n} from 'vue-i18n';
import AppLinkNavigation from '../components/AppLinkNavigation.vue';

const signOutService = new SignOutService();

export default defineComponent({
  components: {AppLinkNavigation, AppIcon},
  setup() {
    const state = inject('state', NavigationStore.state);
    const {t} = useI18n();

    const items = computed(() => state.items);

    const signOut = () => {
      signOutService.run();
      window.location.reload();
    };

    return {
      signOut,
      state,
      items,
      t,
    };
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

.main-item {
  font-size: .75rem;
}
</style>