<template>
  <button class="btn d-flex align-items-center gap-2" :disabled="loading">
    <div class="spinner-border spinner-border-sm" role="status" v-if="loading">
      <span class="visually-hidden">Loading...</span>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import ButtonLoadingStore from '../stores/buttonLoading.store';

export default defineComponent({
  name: 'AppButtonLoading',
  props: ['loading'],
  setup() {
    const store = inject('store', ButtonLoadingStore.state);

    const loading = computed(() => store.loading);

    return {
      loading,
    };
  },
});
</script>

<style scoped>

</style>