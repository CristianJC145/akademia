<template>
  <nav class="navbar navbar-light bg-light shadow-sm px-3 justify-content-between">
    <div>
      <button class="d-none d-md-block btn" @click="sideBar()">
        <AppIcon icon="bars"></AppIcon>
      </button>
      <button class="d-block d-md-none btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
        <AppIcon icon="bars"></AppIcon>
      </button>
    </div>
    <div>
      <button class="btn d-none d-md-block">
        <AppIcon icon="expand"></AppIcon>
      </button>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="p-0 w-100 h-100">
        <AppSideBar></AppSideBar>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AppIcon from '../components/AppIcon.vue';
import AppSideBar from './AppSideBar.vue';

export default defineComponent({
  components: {AppSideBar, AppIcon},
  setup(props, context) {
    const showSideBar = ref(true);

    function sideBar() {
      showSideBar.value = !showSideBar.value;
      context.emit('showSideBar', showSideBar.value);
    }

    return {
      sideBar,
    };
  },
  emits: ['showSideBar'],
});
</script>

<style scoped>
.offcanvas {
  width: 280px;
}
</style>