<template>
  <form @submit.prevent="save">
    <AppFormModal :title="title">
      <template v-slot:content>
        <AppFormField>
          <label for="whiteListEmails">Escriba el correo electrónico de los usuarios con acceso al contenido</label>
          <v-select inputId="whiteListEmails"
                    v-model="whiteListEmailsModel.value"
                    :options="whiteListEmailsOptions.value"
                    pushTags
                    taggable
                    multiple
                    :filterable="false"
                    :dropdownShouldOpen="() => false"
                    :reduce="(whiteList) => whiteList.label ?? whiteList"></v-select>
        </AppFormField>
      </template>

      <template v-slot:actions>
        <AppButtonLoading class="btn-primary text-white">Guardar</AppButtonLoading>
      </template>
    </AppFormModal>
  </form>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import {AddAuthorizedUsersService} from '../services/addAuthorizedUsers.service';

const addAuthorizedUsersService = new AddAuthorizedUsersService();

export default defineComponent({
  name: 'authorizedUsers',
  components: {AppFormField, AppButtonLoading, AppFormModal},
  props: ['whiteListEmails', 'shopId'],
  emits: ['finish'],
  setup(props, {emit}) {
    const title = 'Usuarios autorizados';
    const whiteListEmailsOptions: { value: any } = reactive({
      value: [],
    });
    const whiteListEmailsModel: { value: string[] } = reactive({
      value: [],
    });

    if (props.whiteListEmails) {
      props.whiteListEmails.split(',').forEach((email: string) => {
        whiteListEmailsOptions.value.push({
          value: email,
          label: email,
        });
        whiteListEmailsModel.value.push(email);
      });
    }

    const save = async () => {
      try {
        await addAuthorizedUsersService.run({
          whiteListEmails: whiteListEmailsModel.value.join(','),
        }, props.shopId);
        emit('finish');
      } catch (e) {

      }
    };

    return {
      title,
      whiteListEmailsOptions,
      whiteListEmailsModel,
      save,
    };
  },
});
</script>

<style scoped>

</style>