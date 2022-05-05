<template>
  <input type="file" class="form-control" @change="changeFile"
         id="file"/>
  <a :href="currentThumbnail" target="_blank" v-if="currentThumbnail">
    <small>Ver archivo actual</small>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppUploadImage',
  props: ['currentThumbnail', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const changeFile = (event: any) => {
      const files = event.target.files;

      if (files[0]) {
        // form.thumbnail = files[0];
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