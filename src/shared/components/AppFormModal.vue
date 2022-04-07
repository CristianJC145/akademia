<template>
  <div class="modal-header bg-primary text-white">
    <h5 class="modal-title">{{ title }}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <slot name="content"></slot>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
    <slot name="actions"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppFormModal',
  props: ['title'],
});
</script>

<style scoped>

</style>