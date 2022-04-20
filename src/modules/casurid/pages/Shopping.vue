<template>
  <AppBaseList
      :title="title"
      :routes="routes"
  >
    <template v-slot:content>
      <h1>Aqui</h1>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {BreadCrumbsType} from '../../../shared/types/breadCrumbs.type';

export default defineComponent({
  name: 'Shopping',
  components: {AppBaseList},
  setup() {
    const title = 'Mis Compras';
    const routes: BreadCrumbsType[] = [
      {
        name: 'Inicio',
        url: '/',
      },
      {
        name: 'Mis compras',
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