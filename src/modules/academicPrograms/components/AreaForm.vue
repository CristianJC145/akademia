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
        <input type="text" class="form-control" name="abbreviation" id="abbreviation" v-model="v$.form.abbreviation.$model">
        
      </AppFormField>
    </template>
    <template v-slot:actions>
      <AppButtonLoading type="submit" class="btn-primary text-white" >
        Guardar
      </AppButtonLoading>
    </template>
  </AppFormModal>
  </form>
</template>

<script lang="ts">
import {defineComponent, reactive } from "vue";
import AppFormModal from "../../../shared/components/AppFormModal.vue";
import AppFormField from "../../../shared/components/AppFormField.vue";
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import {CreateOrUpdateAreaService} from "../services/createOrUpdateArea.service"

import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
const createOrUpdateAreaService = new CreateOrUpdateAreaService();
export default defineComponent({
  name: "AreaForm",
  components: { AppFormModal, AppFormField, AppButtonLoading },
  props: ["data"],
  emits: ["close"],
  setup(props, {emit}) {
    const data = props.data ?? {};
    let title = "Nueva área";

    if (props.data?.id) {
      title = "Editar área";
    }

    const form =reactive({
      name: data?.name ?? null,
      abreviation: data?.abreviation ?? null,
    });
    const v$ = useVuelidate({
      form: {
        name: {required},
        abbreviation: {},
      },
    }, {form});

    const save = async () =>{
      const formIsValid = await v$.value.$validate();
      if (!formIsValid) return;
      try {
        await createOrUpdateAreaService.run(form,data?.id);
        emit('close');
      }catch(e){
        console.log(e)
      }
    };
    return {
      title,
      v$,
      save,
    };
  },
});
</script>

<style scoped></style>
