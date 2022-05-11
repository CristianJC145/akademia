<template>
  <input type="file" class="form-control" @change="changeFile" :id="inputId" accept="image/*"/>

  <small class="text-danger">{{ errorMessage.value }}</small> <br>  

  <a :href="currentThumbnail" target="_blank" v-if="currentThumbnail">
    <small>Ver archivo actual</small>
  </a>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  name: 'AppUploadImage',
  props: ['currentThumbnail', 'modelValue', 'inputId'],
  emits: ['update:modelValue', 'update:errorImg'],
  setup(props, {emit}) {
    let errorMessage: any = reactive({
      value: '',
    });;

    const changeFile = (event: any) => {
      const files = event.target.files;
      errorMessage.value = validateImage(files);

      if (errorMessage.value.length) {
        emit('update:errorImg', true);
      } else {
        emit('update:errorImg', false);
      }

      if (files[0]) {
        emit('update:modelValue', files[0]);
      } else {
        emit('update:modelValue', null);
      }
    };

    const validateImage = (files: any) => {
      const extensions =['.tiff', '.pip', '.jfif', '.bmp', '.gif', '.svg', '.png', '.xbm', '.dib', '.jx', '.jpeg', '.svgz', '.jpg', '.webp', '.ico', '.tif', '.pjpeg', '.avif'];
      let validExtension = false;
      let validSize = false;
      let errMessage = '';

      const fileName = files[0].name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'),fileName.length);
      const fileSize = files[0].size;

      extensions.forEach((ext) => {
        if (fileExtension == ext) {
          validExtension = true;
        }
      });

      if (fileSize < 10000000) {
        validSize = true;
      }

      if (!validExtension) {
        errMessage += 'el archivo debe ser de tipo imagen';
      }

      if (!validSize) {
        let mesage = 'el tamaño maximo de la imagen es de 10MB'
        errMessage += !validExtension ? ', ' + mesage : mesage;
      }

      return errMessage;
    }

    return {
      changeFile,
      errorMessage,
    };

  },
});
</script>

<style scoped>

</style>