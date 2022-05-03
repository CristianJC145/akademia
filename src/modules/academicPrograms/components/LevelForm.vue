<template>
  <AppFormModal :title="title">
    <template v-slot:content>
      aqui!!!
    </template>
  </AppFormModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';

export default defineComponent({
  name: 'LevelForm',
  components: {AppFormModal},
  props: ['data'],
  setup(props) {
    let title = 'Nuevo nivel';

    if (props.data?.id) {
      title = 'Editar nivel';
    }

    return {
      title,
    };
  },
});
</script>

<style scoped>

</style>