<template>
  <form @submit.prevent="save">
    <AppFormModal :title="title">
      <template v-slot:content>
        <AppFormField :form-control="v$.form.name">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" v-model="v$.form.name.$model" id="name"/>
        </AppFormField>

        <AppFormField :form-control="v$.form.description">
          <label for="description">Descripción</label>
          <textarea type="text" class="form-control" v-model="v$.form.description.$model" id="description"></textarea>
        </AppFormField>

        <AppFormField :form-control="v$.form.profileId">
          <label for="profile">Perfil</label>
          <v-select v-model="v$.form.profileId.$model" :options="profiles" label="name"
                    :reduce="(profile) => profile.id"></v-select>
          <div v-if="profile" class="form-text text-muted tw-flex tw-items-center tw-gap-2">
            <AppIcon icon="exclamation-circle"></AppIcon>
            <span>{{ profile.description }}</span>
          </div>
        </AppFormField>
      </template>
      <template v-slot:actions>
        <AppButtonLoading class="btn-primary text-white">
          Guardar
        </AppButtonLoading>
      </template>
    </AppFormModal>
  </form>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, reactive} from 'vue';
import {useVuelidate} from '@vuelidate/core';

import AppFormModal from '../../../shared/components/AppFormModal.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';

import {required} from '../../../shared/plugins/vuelidate.plugin';
import {ProfileDto} from '../../../shared/dto/profile.dto';
import {CreateOrUpdateRoleService} from '../services/createOrUpdateRole.service';

const createOrUpdateRoleService = new CreateOrUpdateRoleService();

export default defineComponent({
  name: 'RoleForm',
  components: {AppButtonLoading, AppLoading, AppIcon, AppFormField, AppFormModal},
  props: ['data', 'profiles'],
  emits: ['close'],
  setup(props, {emit}) {
    let title = 'Nuevo rol';
    const data = props.data;

    if (props.data?.id) {
      title = 'Editar rol';
    }

    const form = reactive({
      name: data?.name,
      description: data?.description,
      profileId: data?.profileId,
    });

    const profile: ComputedRef<ProfileDto | null> = computed(() => {
      return props.profiles.find((prof: ProfileDto) => prof.id === form.profileId);
    });

    const v$ = useVuelidate({
      form: {
        name: {required},
        description: {required},
        profileId: {},
      },
    }, {form});

    const save = async () => {
      const formIsValid = await v$.value.$validate();

      if (!formIsValid) return;

      try {
        await createOrUpdateRoleService.run(form, data?.id);

        emit('close');
      } catch (e) {

      }
    };

    return {
      title,
      v$,
      profile,
      save,
    };
  },
});

</script>