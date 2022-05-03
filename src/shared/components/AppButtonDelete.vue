<template>
  <button class="btn btn-outline-primary" v-tooltip="title" @click="showModal = true">
    <AppIcon :icon="icon"></AppIcon>
  </button>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AppIcon from './AppIcon.vue';
import AppModal from './AppModal.vue';
import AppFormModal from './AppFormModal.vue';
import AppConfirmDeleteModal from './AppConfirmDeleteModal.vue';

export default defineComponent({
  name: 'AppButtonDelete',
  components: {AppConfirmDeleteModal, AppFormModal, AppModal, AppIcon},
  setup() {
    const icon = 'trash';
    const title = 'Eliminar';

    return {
      icon,
      title,
    };
  },
});
</script>

<style scoped>

</style>