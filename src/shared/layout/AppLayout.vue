<template>
  <div class="d-flex h-100">
    <AppNavBar class="d-none d-md-flex col-md-3 col-lg-2"></AppNavBar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavBar from './AppNavBar.vue';
</script>

<style scoped>
</style>