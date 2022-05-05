<template>
  <input type="file" class="form-control" @change="changeFile"
         :id="inputId"/>
  <a :href="currentThumbnail" target="_blank" v-if="currentThumbnail">
    <small>Ver archivo actual</small>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppUploadImage',
  props: ['currentThumbnail', 'modelValue', 'inputId'],
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const changeFile = (event: any) => {
      const files = event.target.files;

      if (files[0]) {
        emit('update:modelValue', files[0]);
      } else {
        emit('update:modelValue', null);
      }
    };

    return {
      changeFile,
    };

  },
});
</script>

<style scoped>

</style>