<template>
  <div class="d-flex h-100">
    <AppSideBar v-if="showSideBar" class="d-none d-md-flex col-md-3 col-lg-2 sidebar"></AppSideBar>

    <div class="d-flex flex-column w-100">
      <AppNavBar @showSideBar="(show) => showSideBar=show"></AppNavBar>
      <div class="container-fluid">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import AppNavBar from './AppNavBar.vue';
import AppSideBar from './AppSideBar.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {AppNavBar, AppSideBar},
  setup() {
    const showSideBar = ref(true);

    return {
      showSideBar,
    };
  },
});
</script>

<style scoped>
.sidebar {
  width: 280px;
}
</style>