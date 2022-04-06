<script lang="ts">
import AppToast from './shared/components/AppToast.vue';

export default {
  components: {AppToast},
};
</script>

<template>
  <router-view></router-view>
  <AppToast></AppToast>
</template>

<style>

</style>
