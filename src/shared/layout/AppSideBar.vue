<template>
  <div class="d-flex flex-column flex-shrink-0 pb-3 bg-light h-100">
    <router-link to="/" class="p-4 text-center">
      <img
          :src="appLogo"
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
import {settings} from '../constant/settings.contants';

const signOutService = new SignOutService();

export default defineComponent({
  components: {AppLinkNavigation, AppIcon},
  setup() {
    const state = inject('state', NavigationStore.state);
    const {t} = useI18n();
    const appLogo = settings.appLogo;

    const items = computed(() => state.items);

    const signOut = () => {
      signOutService.run();
      window.location.reload();
    };

    return {
      signOut,
      state,
      items,
      appLogo,
      t,
    };
  },
});

</script>

<style scoped>
.logo-institution {
  max-height: 90px;
}

.main-avatar {
  width: 5rem;
  height: 5rem;
}

.main-item {
  font-size: .75rem;
}
</style>