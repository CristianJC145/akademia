<template>
  <ContentsForm :title="title" :routes="routes"></ContentsForm>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import ContentsForm from '../components/ContentsForm.vue';

export default defineComponent({
  name: 'ContentsCreate',
  components: {ContentsForm, AppButtonLoading, AppFormField, AppBackButton, AppBaseList},
  setup() {
    const title = 'Nuevo contenido';

    const routes = [
      {
        name: 'Contenidos',
        url: {
          name: 'casurid.contentsList',
        },
      },
      {
        name: title,
      },
    ];

    return {
      title,
      routes,
    };
  },
});
</script>

<style scoped>

</style>