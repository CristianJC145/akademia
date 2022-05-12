<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppBaseList
      v-else
      :title="title"
      :routes="routes"
  >
    <template v-slot:actions>
      <div class="align-content-center">

      </div>

    </template>

    <template v-slot:content>
      <div class="items">
        <AppContainerNewRecord
            text="Nuevo"
            @click=""
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
              <AppButtonEdit></AppButtonEdit>
              <AppButtonDelete></AppButtonDelete>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppBaseList>

</template>

<script lang="ts">
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {defineComponent, onMounted, reactive, ref} from 'vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppContainerNewRecord from '../../../shared/components/AppContainerNewRecord.vue';
import {GetAllRolesService} from '../services/getAllRoles.service';
import {GetRoleRelatedDataFormService} from '../services/getRoleRelateDataForm.service';
import {DeleteRoleService} from '../services/deleteRole.service';
import {RoleDto} from '../../../shared/dto/role.dto';
import {ProfileDto} from '../../../shared/dto/profile.dto';
import {useMeta} from 'vue-meta';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';

const getAllRolesService = new GetAllRolesService();
const getRoleRelatedDataFormService = new GetRoleRelatedDataFormService();
const deleteRoleService = new DeleteRoleService();

export default defineComponent({
  components: {AppButtonDelete, AppButtonEdit, AppLoading, AppIcon, AppBackButton, AppBaseList, AppContainerNewRecord},
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
      roles.value = await getAllRolesService.run();
      profiles.value = await getRoleRelatedDataFormService.run();
      loading.value = false;
    });

    return {
      title,
      routes,
      loading,
      profiles,
      roles,
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