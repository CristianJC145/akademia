<template>
  <AppBaseList
      :title="title"
      :routes="routes"
  >
    <template v-slot:content>
      <div class="card">
        <div class="card-body d-flex flex-column">
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <span>
              Filtros:
            </span>

            <select class="form-select">
              <option value="" selected disabled>Nivel</option>
            </select>

            <select class="form-select">
              <option value="" selected disabled>Grado</option>
            </select>

            <select class="form-select">
              <option value="" selected disabled>Asignatura</option>
            </select>
          </div>
          <div>
            Tabla
          </div>
        </div>
      </div>
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