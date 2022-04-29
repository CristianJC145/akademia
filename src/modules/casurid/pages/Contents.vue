<template>
  <AppBaseList title="Contenidos">
    aqui
  </AppBaseList>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {GetFiltersContentService} from '../services/getFiltersContent.service';

const getFiltersContentService = new GetFiltersContentService();

export default defineComponent({
  name: 'Contents',
  components: {AppBaseList},
  setup() {
    onMounted(async () => {
      const response = await getFiltersContentService.run();

      console.log(response);
    });

    return {};
  },
});
</script>

<style scoped>

</style>