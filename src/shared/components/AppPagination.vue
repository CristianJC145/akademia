<template>
  <nav class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <button type="button" class="page-link btn" @click="changePage('last')" :disabled="currentPage === 1">
          Anterior
        </button>
      </li>
      <li class="page-item" :class="{ active: currentPage === page }" v-for="page in numberOfPages">
        <button type="button" class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>
      <li class="page-item">
        <button type="button" class="btn page-link" @click="changePage('next')"
                :disabled="numberOfPages === currentPage">Siguiente
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'AppPagination',
  props: ['modelValue', 'total', 'perPage'],
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const currentPage = ref(parseInt(props.modelValue));
    const totalPagination = ref(parseInt(props.total));
    const perPagePagination = ref(parseInt(props.perPage));

    watch(() => props.total, (value) => {
      totalPagination.value = parseInt(value);
    });

    watch(() => props.perPage, (value) => {
      perPagePagination.value = value;
    });

    watch(() => props.modelValue, (value) => {
      currentPage.value = parseInt(value);
    });

    const numberOfPages = computed(() => {
      return Math.ceil(totalPagination.value / perPagePagination.value);
    });

    const changePage = (page: string | number) => {
      if (page === currentPage.value) return;

      let newCurrentPage = null;

      if (page === 'next') {
        newCurrentPage = currentPage.value + 1;
      } else if (page === 'last') {
        newCurrentPage = currentPage.value - 1;
      } else {
        newCurrentPage = page;
      }

      emit('update:modelValue', newCurrentPage);
    };

    return {
      currentPage,
      numberOfPages,
      changePage,
    };
  },
});
</script>

<style scoped>

</style>