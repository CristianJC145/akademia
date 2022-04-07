<template>
  <nav class="navbar navbar-light bg-light shadow-sm px-3 justify-content-between">
    <div>
      <router-link to="/" class="app-name">
        Casurid
      </router-link>

    </div>
    <div class="d-flex gap-2">
      <button class="d-block d-md-none btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
        <AppIcon icon="bars"/>
      </button>

      <template v-for="(item, key) in items">
        <router-link v-if="key > 0" :to="item.route" class="d-none d-md-block btn" :key="key" v-tooltip="item.name">
          <AppIcon :icon="item.icon" size="lg"/>
        </router-link>
      </template>

    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="d-flex flex-column flex-shrink-0 pb-3 bg-light h-100">

        <ul class="nav nav-pills flex-column mb-auto px-3 pt-4">
          <li class="nav-item mt-2" v-for="(item, key) in items">
            <router-link :to="item.route" class="nav-link"
                         :class="{ active: isActive(item.route), 'text-secondary': !isActive(item.route)}" :key="key">
              <AppIcon :icon="item.icon" size="lg" class="me-2"/>
              {{ item.name }}
            </router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
  name: 'NavBar',
  components: {AppIcon},
  data() {
    return {
      items: [
        {
          name: 'Inicio',
          route: '/',
          icon: 'home',
        },
        {
          name: 'Carrito de compras',
          route: '/shopping-cart',
          icon: 'shopping-cart',
        },
      ],
    };
  },
  methods: {
    isActive(route: string) {
      if (route == this.$route.path) {
        return true;
      }

      return false;
    },
  },
});
</script>

<style scoped>
.app-name {
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 300;
}
</style>