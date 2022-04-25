<template>
  <div>
    <table class="table table-hover table-bordered">
      <thead>
      <slot name="head"></slot>
      </thead>
      <tbody>
      <slot name="body" :data="data.value"></slot>
      </tbody>
    </table>

    <AppPagination
        v-model="currentPage"
        :total="total"
        :per-page="perPage"
    ></AppPagination>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {ResponsePaginationDto} from '../dto/responsePagination.dto';
import AppPagination from './AppPagination.vue';

export default defineComponent({
  name: 'AppDatatable',
  components: {AppPagination},
  props: ['service', 'pageSizeOptions', 'params'],
  setup(props) {
    const perPage = ref(10);
    const total = ref(0);
    const currentPage = ref(1);
    const data: { value: any[] } = reactive({
      value: [],
    });

    onMounted(async () => {
      const response: ResponsePaginationDto<any> = await props.service.run();

      data.value = response.data;
      total.value = response.total;
      currentPage.value = response.page;
      perPage.value = response.perPage;
    });

    return {
      currentPage,
      total,
      perPage,
      data,
    };
  },
});
</script>

<style scoped>

</style>