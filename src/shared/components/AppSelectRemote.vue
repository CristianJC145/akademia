<template>
  <v-select
      v-if="!loading"
      v-model="value"
      :filterable="false"
      @search="search"
      :options="options.value"
      :label="label"
      :reduce="reduce">
  </v-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, watch} from 'vue';
import {debounce} from 'ts-debounce';

export default defineComponent({
  name: 'AppSelectRemote',
  props: ['modelValue', 'service', 'label', 'reduce', 'init'],
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const value = ref(props.modelValue);
    const loading = ref(true);
    const options: { value: any[] } = reactive({
      value: [],
    });

    const search = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);
        const response = await props.service.run({
          search,
          page: 1,
          perPage: 25,
        });
        options.value = response.data;
        loading(false);
      }
    }, 800);

    watch(value, (newValue) => {
      emit('update:modelValue', newValue);
    });

    onMounted(() => {
      if (props.init) {
        options.value.push(props.init);
      }

      loading.value = false;
    });

    return {
      value,
      options,
      loading,
      search,
    };
  },
});
</script>

<style scoped>

</style>