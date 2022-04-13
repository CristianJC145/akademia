<template>
  <app-base-list
      title="Roles"
      subtitle="Administre los roles del sistema"
  >
    <template v-slot:actions>
      <div class="align-content-center">
        <AppBackButton></AppBackButton>
      </div>

    </template>

    <template v-slot:content>
      <div content class="container">
        <AppContainerNewRecord
            text="Nuevo"
            @click=""
        ></AppContainerNewRecord>
      </div>

      <div class="card tw-flex tw-flex-col tw-max-w-80 tw-w-full tw-justify-between tw-min-h-56"
           v-for="role in roles"
      >
        <div class="tw-flex tw-items-center tw-justify-center tw-object-center bg-primary tw-h-auto text-white">
          <div class="tw-flex tw-flex-col tw-items-center m-3">
            <span class="tw-text-lg tw-font-bold">{{ role.name }}</span>
            <span class="tw-text-sm tw-font-light">{{ role.profile?.name }}</span>
          </div>
        </div>

        <div class="m-5">
          {{ role.description }}
        </div>

        <div class="tw-flex m-5">
          <div class="tw-w-1/2">
            <a>
              <AppIcon class="icon-size-5" icon="key"></AppIcon>
            </a>
          </div>

          <div class="tw-flex tw-justify-end tw-items-end tw-w-1/2 tw-gap-4">
            <button
                appCheckPermission=""
                tooltip=""
                @click="">
              <AppIcon class="icon-size-5 text-primary" icon="pencil-alt"></AppIcon>
            </button>
            <button
                    appCheckPermission=""
                    tooltip=""
                    (click)="">
              <AppIcon class="icon-size-5 text-red-500" icon="trash"></AppIcon>
            </button>
          </div>
        </div>
      </div>
    </template>
  </app-base-list>

</template>

<script lang="ts">
import AppBaseList from '../../../shared/components/AppBaseList.vue'
import {defineComponent} from "vue";
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppContainerNewRecord from "../../../shared/components/AppContainerNewRecord.vue";
import {GetAllRolesService} from "../services/getAllRoles.service";
import {GetRoleRelatedDataFormService} from "../services/getRoleRelateDataForm.service";
import {DeleteRoleService} from "../services/deleteRole.service";
import {RoleDto} from "../../../shared/dto/role.dto";
import {ProfileDto} from "../../../shared/dto/profile.dto";
import {ProductCatalogueDto} from "../../casurid/dtos/productCatalogue.dto";
import {ProductContentDto} from "../../casurid/dtos/productContent.dto";

const getAllRolesService = new GetAllRolesService();
const getRoleRelatedDataFormService = new GetRoleRelatedDataFormService();
const deleteRoleService = new DeleteRoleService();

export default defineComponent ({
  components: {AppIcon, AppBackButton, AppBaseList, AppContainerNewRecord },
  name: 'Roles',
  data(): IRoles {
    return {
      loading: false,
      profiles: [],
      roles: [],
    }
  },
  async mounted() {
    this.loading = true;
    const roles = await getAllRolesService.run();
    this.roles =  roles.data;

    const profiles = await getRoleRelatedDataFormService.run();
    this.profiles = profiles.data;
    this.loading = false;
  },
  methods: {
    deleteRole(id: any): Promise<any> {
      return deleteRoleService.run(id);
    }
  },
})

</script>