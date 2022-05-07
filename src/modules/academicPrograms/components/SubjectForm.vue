<template>
  <form @submit.prevent="save">
    <AppFormModal :title="title">
      <template v-slot:content>
        <AppFormField :formControl="v$.form.name">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" required name="name" id="name" v-model="v$.form.name.$model">
        </AppFormField>
        <AppFormField :formControl="v$.form.abreviation">
          <label for="abbreviation">Abreviatura</label>
          <input type="text" class="form-control" id="abbreviation" v-model="v$.form.abbreviation.$model">
        </AppFormField>
        <AppFormField :form-control="v$.form.file">
          <label for="file">Imagen</label>
          <AppUploadImage input-id="file" v-model="v$.form.file.$model"
                          :current-thumbnail="currentFile"></AppUploadImage>
        </AppFormField>
      </template>
      <template v-slot:actions>
        <AppButtonLoading type="submit" class="btn-primary text-white">
          Guardar
        </AppButtonLoading>
      </template>
    </AppFormModal>
  </form>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import {CreateOrUpdateSubjectService} from '../services/createOrUpdateSubject.service';

import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import AppUploadImage from '../../../shared/components/AppUploadImage.vue';

const createOrUpdateSubjectService = new CreateOrUpdateSubjectService();

export default defineComponent({
  name: 'SubjectForm',
  components: {AppUploadImage, AppButtonLoading, AppFormField, AppFormModal},
  props: ['data', 'areaId'],
  emits: ['close'],
  setup(props, {emit}) {
    const data = props.data ?? {};
    let title = 'Nueva asignatura';

    if (props.data?.id) {
      title = 'Editar asignatura';
    }

    const currentThumbnail = data?.thumbnail;

    const form = reactive({
      name: data?.name ?? null,
      abbreviation: data?.abbreviation ?? null,
      file: null,
    });

    const v$ = useVuelidate({
      form: {
        name: {required},
        abbreviation: {},
        file: {},
      },
    }, {form});

    const save = async () => {
      const formIsValid = await v$.value.$validate();
      if (!formIsValid) return;
      try {
        await createOrUpdateSubjectService.run({...form, areaId: props.areaId}, data?.id);
        emit('close');
      } catch (e) {

      }
    };

    return {
      v$,
      title,
      currentFile: currentThumbnail,
      save,
    };
  },
});
</script>

<style scoped>

</style>