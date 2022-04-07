<template>
  <AppFormModal :title="title">
    
  </AppFormModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';

export default defineComponent({
  name: 'LoginCasurid',
  components: {AppFormModal},
  data() {
    return {
      title: 'Iniciar sesión',
    };
  },
});
</script>

<style scoped>

</style>