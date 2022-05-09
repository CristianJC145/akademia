<template>
  <AppLoading v-if="loading"></AppLoading>
  <InstitutionsForm v-else :title="title" :routes="routes" :data="data.value"></InstitutionsForm>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';

import {useRoute} from 'vue-router';
import AppLoading from '../../../shared/components/AppLoading.vue';

import InstitutionsForm from '../components/institutionsForm.vue';
import {GetInstitutionByIdService} from '../services/getInstitutionById.service';

const getInstitutionByIdService = new GetInstitutionByIdService();

export default defineComponent({
  name: 'InstitutionsEdit',
  components: {InstitutionsForm, AppLoading},

  setup() {
    const title = 'Ediar Institución';

    const routes = [
      {
        name: 'Institucion',
        url: {
          name: 'casurid.institutionsList',
        },
      },
      {
        name: title,
      },
    ];


    const loading = ref(true);
    const route = useRoute();
    const data = reactive({
      value: {},
    });

    onMounted(async () => {
      try {
        data.value = await getInstitutionByIdService.run(route.params.institutionId as string);
      } catch (e) {
        console.log(e);
      }

      loading.value = false;
    });

    return {
      title,
      routes,
      loading,
      data,
    };
  },
});
</script>

<style scoped>

</style>