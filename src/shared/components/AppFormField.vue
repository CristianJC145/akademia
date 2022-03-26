<template>
  <div class="mb-3">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: ['formControl']
});
</script>

<style scoped>

</style>