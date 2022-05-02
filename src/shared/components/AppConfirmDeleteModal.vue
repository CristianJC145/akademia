<template>
  <AppFormModal :title="'Eliminar ' + entity">
    <template v-slot:content>
      <div class="d-flex align-items-center gap-2">
        <AppIcon icon="exclamation-circle" size="3x" class="text-warning"></AppIcon>
        <span class="tw-font-light tw-text-lg">¿Está seguro que desea realizar esta acción?</span>
      </div>
    </template>
    <template v-slot:actions>
      <AppButtonLoading class="btn-primary text-white" @click="confirmDeleteModal">
        Eliminar
      </AppButtonLoading>
    </template>
  </AppFormModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppFormModal from './AppFormModal.vue';
import AppIcon from './AppIcon.vue';
import AppButtonLoading from './AppButtonLoading.vue';

export default defineComponent({
  name: 'AppConfirmDeleteModel',
  components: {AppButtonLoading, AppIcon, AppFormModal},
  props: ['entity'],
  emits: ['confirmDelete'],
  setup(props, {emit}) {
    const confirmDeleteModal = async () => {
      emit('confirmDelete');
    };

    return {
      entity: props.entity,
      confirmDeleteModal,
    };
  },
});
</script>

<style scoped>

</style>