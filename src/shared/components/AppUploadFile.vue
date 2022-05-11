<template>
  <input type="file" class="form-control" @change="changeFile" :id="inputId"/>

  <small class="text-danger">{{ errorMessage.value }}</small> <br>  

  <a :href="currentFile" target="_blank" v-if="currentFile">
    <small>Ver archivo actual</small>
  </a>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  name: 'AppUploadFile',
  props: ['currentFile', 'modelValue', 'inputId'],
  emits: ['update:modelValue', 'update:errorFile'],
  setup(props, {emit}) {
    let errorMessage: any = reactive({
      value: '',
    });;

    const changeFile = (event: any) => {
      const files = event.target.files;
      errorMessage.value = validateFile(files[0]);

      if (errorMessage.value.length) {
        emit('update:errorFile', true);
      } else {
        emit('update:errorFile', false);
      }

      if (files[0]) {
        emit('update:modelValue', files[0]);
      } else {
        emit('update:modelValue', null);
      }
    };

    const validateFile = (files: any) => {
      const extensions =['.zip', '.rar', '.rar5', '.7z', '.ace', '.gz', '.tar'];
      let validExtension = false;
      let validSize = false;
      let errMessage = '';

      const fileName = files.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'),fileName.length);
      const fileSize = files.size;

      extensions.forEach((ext) => {
        if (fileExtension == ext) {
          validExtension = true;
        }
      });

      if (fileSize < 10000000) {
        validSize = true;
      }

      if (!validExtension && props.inputId == 'urlLocation') {
        errMessage += 'se debe enviar un archivo comprimido';
      }

      if (!validSize) {
        let mesage = 'el tamaño maximo del archivo es de 10MB'
        errMessage += !validExtension && props.inputId == 'urlLocation' ? ', ' + mesage : mesage;
      }

      return errMessage;
    };

    return {
      changeFile,
      errorMessage,
    };

  },
});
</script>

<style scoped>

</style>