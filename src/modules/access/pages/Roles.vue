<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppBaseList
      v-else
      :title="title"
      :routes="routes"
  >
    <template v-slot:content>
      <div class="items">
        <AppContainerNewRecord
            @click="openFormModal"
        ></AppContainerNewRecord>

        <div class="card" v-for="role in roles.value" :key="role.id">
          <div
              class="card-title bg-primary text-white tw-h-20 tw-flex tw-justify-center tw-items-center tw-flex-col tw-px-2">
            <span class="tw-font-bold tw-line-clamp-2 text-center">{{ role.name }}</span>
            <span class="tw-font-extralight tw-line-clamp-1 text-center">
              {{ role.profile.name ?? 'Sin perfil asignado' }}</span>
          </div>
          <div class="card-body ">
            <p class="tw-line-clamp-3">
              {{ role.description }}
            </p>
          </div>

          <div class="card-footer bg-transparent">
            <div>

            </div>
            <div class="tw-flex tw-justify-end tw-gap-2">
              <AppButtonEdit @click="openFormModal(role)"></AppButtonEdit>
              <AppButtonDelete></AppButtonDelete>
            </div>
          </div>
        </div>
      </div>

      <AppModal v-model="modalForm">
        <RoleForm v-if="modalForm" :profiles="profiles.value" :data="currentRole.value"
                  @close="closeModalForm"></RoleForm>
      </AppModal>
    </template>
  </AppBaseList>

</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {useMeta} from 'vue-meta';

import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppContainerNewRecord from '../../../shared/components/AppContainerNewRecord.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';
import AppModal from '../../../shared/components/AppModal.vue';
import RoleForm from '../components/RoleForm.vue';

import {GetAllRolesService} from '../services/getAllRoles.service';
import {GetRoleRelatedDataFormService} from '../services/getRoleRelateDataForm.service';
import {DeleteRoleService} from '../services/deleteRole.service';
import {RoleDto} from '../../../shared/dto/role.dto';
import {ProfileDto} from '../../../shared/dto/profile.dto';

const getAllRolesService = new GetAllRolesService();
const getRoleRelatedDataFormService = new GetRoleRelatedDataFormService();
const deleteRoleService = new DeleteRoleService();

export default defineComponent({
  components: {
    AppModal,
    RoleForm,
    AppButtonDelete, AppButtonEdit, AppLoading, AppIcon, AppBackButton, AppBaseList, AppContainerNewRecord,
  },
  name: 'Roles',
  setup() {
    const title = 'Roles';
    const routes = [
      {
        name: title,
      },
    ];

    useMeta({
      title,
    });

    const loading = ref(true);
    const profiles: { value: ProfileDto[] } = reactive({value: []});
    const roles: { value: RoleDto[] } = reactive({value: []});

    onMounted(async () => {
      await getData();
      const response = await getRoleRelatedDataFormService.run();
      profiles.value = response.profiles;
      loading.value = false;
    });

    const getData = async () => {
      roles.value = await getAllRolesService.run();
    };

    const modalForm = ref(false);
    const currentRole: { value: RoleDto | null } = reactive({
      value: null,
    });

    const openFormModal = (role: RoleDto | null) => {
      currentRole.value = role;
      modalForm.value = true;
    };

    const closeModalForm = () => {
      modalForm.value = false;
      getData();
    };

    return {
      title,
      routes,
      loading,
      profiles,
      roles,
      modalForm,
      currentRole,
      openFormModal,
      closeModalForm,
    };
  },
});

</script>

<style>
.items {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr));
}
</style>