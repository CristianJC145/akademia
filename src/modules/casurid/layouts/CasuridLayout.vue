<template>
  <NavBar></NavBar>
  <div class="mt-3 container-fluid">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
  name: 'CasuridLayout',
  components: {NavBar},
});
</script>