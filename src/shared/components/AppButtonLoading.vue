<template>
  <button class="btn d-flex align-items-center gap-2" :disabled="loading">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="visually-hidden">Loading...</span>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'AppButtonLoading',
  props: ['loading'],
  setup(props) {
    const loading = ref(props.loading);

    watch(() => props.loading, (value) => {
      loading.value = value;
    });

    return {
      loading,
    };
  },
});
</script>

<style scoped>

</style>