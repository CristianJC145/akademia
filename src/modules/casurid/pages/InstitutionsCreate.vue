<template>
  <InstitutionsForm :title="title" :routes="routes"></InstitutionsForm>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useMeta} from 'vue-meta';

import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';

import InstitutionsForm from '../components/institutionsForm.vue';

export default defineComponent({
  name: 'InstitutionsCreate',
  components: {InstitutionsForm, AppButtonLoading, AppFormField, AppBackButton, AppBaseList},

  setup() {
    const title = 'Nueva Institución';
    useMeta({
      title: title,
    });

    const routes = [
      {
        name: 'Instituciones',
        url: {
          name: 'casurid.institutionsList',
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