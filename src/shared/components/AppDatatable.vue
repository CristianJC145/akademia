<template>
  <div class="card">
    <div class="card-body d-flex flex-column gap-3">
      <slot name="filters"></slot>

      <div>
        <AppProgressBar v-if="loading"></AppProgressBar>
        <table class="table table-hover table-bordered">
          <thead>
          <slot name="head"></slot>
          </thead>
          <tbody>
          <slot name="body" :data="data.value"></slot>
          </tbody>
        </table>

        <AppEmptyResponse
            v-if="notFound"
            :show-image="true"
            :subtitle="showSubtitleNotFound ? '' : false"
        ></AppEmptyResponse>

        <AppPagination
            v-else
            class="mt-2"
            v-model="currentPage"
            :total="total"
            :per-page="perPage"
        ></AppPagination>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue';
import {ResponsePaginationDto} from '../dto/responsePagination.dto';
import AppPagination from './AppPagination.vue';
import AppProgressBar from './AppProgressBar.vue';
import AppEmptyResponse from './AppEmptyResponse.vue';

export default defineComponent({
  name: 'AppDatatable',
  components: {AppEmptyResponse, AppProgressBar, AppPagination},
  props: ['service', 'pageSizeOptions', 'params', 'showSubtitleNotFound'],
  setup(props) {
    const showSubtitleNotFound = props.showSubtitleNotFound === undefined ? true : props.showSubtitleNotFound;
    const perPage = ref(10);
    const total = ref(0);
    const currentPage = ref(1);
    const loading = ref(true);
    const notFound = ref(false);
    const data: { value: any[] } = reactive({
      value: [],
    });

    watch(() => props.params, async () => {
      await getData();
    });

    const params = computed(() => {
      let params = {
        perPage: perPage.value,
        page: currentPage.value,
      };

      // TODO: Agregar search
      if (props.params) {
        console.log(props.params);
        params = {
          ...params,
          ...props.params,
        };
      }

      return params;
    });

    const getData = async () => {
      loading.value = true;
      try {
        const response: ResponsePaginationDto<any> = await props.service.run(params.value);

        data.value = response.data;
        total.value = response.total;
        currentPage.value = response.page;
        perPage.value = response.perPage;

        notFound.value = !data.value.length;
      } catch (e) {
      }

      loading.value = false;
    };

    watch(currentPage, async () => {
      await getData();
    });

    onMounted(async () => {
      await getData();

      document.addEventListener('updateDatatable', async () => {
        await getData();
      });
    });

    return {
      currentPage,
      total,
      perPage,
      data,
      loading,
      notFound,
      showSubtitleNotFound,
    };
  },
});
</script>

<style scoped>

</style>