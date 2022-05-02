<template>
  <div class="d-flex justify-content-center mt-4">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppLoading',
});
</script>

<style scoped>

</style>