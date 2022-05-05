<template>
  <form @submit.prevent="save">
    <AppFormModal :title="title">
      <template v-slot:content>
        <AppFormField :form-control="v$.form.name">
          <label for="name">Nombre</label>
          <input class="form-control" type="text" id="name" v-model="v$.form.name.$model">
        </AppFormField>

        <AppFormField :form-control="v$.form.abbreviation">
          <label for="abbreviation">Abreviación</label>
          <input class="form-control" type="text" id="abbreviation" v-model="v$.form.abbreviation.$model">
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
import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import {CreateOrUpdateDegreeService} from '../services/createOrUpdateDegree.service';

const createOrUpdateDegreeService = new CreateOrUpdateDegreeService();

export default defineComponent({
  name: 'DegreeForm',
  components: {AppButtonLoading, AppFormField, AppFormModal},
  props: ['data', 'levelId'],
  emits: ['close'],
  setup(props, {emit}) {
    const data = props.data ?? {};
    let title = 'Nuevo grado';

    if (props.data?.id) {
      title = 'Editar grado';
    }

    const form = reactive({
      name: data?.name ?? null,
      abbreviation: data?.abbreviation ?? null,
    });

    const v$ = useVuelidate({
      form: {
        name: {required},
        abbreviation: {},
      },
    }, {form});

    const save = async () => {
      const formIsValid = await v$.value.$validate();

      if (!formIsValid) return;

      try {
        await createOrUpdateDegreeService.run({...form, levelId: props.levelId}, data?.id);
        emit('close');
      } catch (e) {

      }
    };

    return {
      v$,
      title,
      save,
    };
  },
});
</script>

<style scoped>

</style>