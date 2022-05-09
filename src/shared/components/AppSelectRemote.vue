<template>
  <v-select
      v-model="value"
      :filterable="false"
      @search="search"
      :options="options.value"
      :label="label"
      :reduce="reduce">
  </v-select>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, watch} from 'vue';
import {debounce} from 'ts-debounce';

export default defineComponent({
  name: 'AppSelectRemote',
  props: ['modelValue', 'service', 'label', 'reduce', 'init'],
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const value = ref(props.init ? props.init[props.label] : props.modelValue);
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

    return {
      value,
      options,
      search,
    };
  },
});
</script>

<style scoped>

</style>