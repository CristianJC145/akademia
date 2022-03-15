<template>
  <div class="d-flex h-100">
    <Transition name="fade">
      <AppSideBar v-if="showSideBar" class="d-none d-md-flex col-md-3 col-lg-2 sidebar"></AppSideBar>
    </Transition>

    <div class="d-flex flex-column w-100">
      <AppNavBar @showSideBar="show"></AppNavBar>
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

    function show(data: boolean) {
      showSideBar.value = data;
    }

    return {
      show,
      showSideBar,
    };
  },
});
</script>

<style scoped>
.sidebar {
  width: 280px;
}

.fade-enter-active,
.fade-leave-active {
  transition: margin-left 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  margin-left: -280px;
}
</style>