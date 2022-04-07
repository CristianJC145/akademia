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

    </template>
  </app-base-list>

</template>

<script lang="ts">
import AppBaseList from '../../../shared/components/AppBaseList.vue'
import {defineComponent} from "vue";
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppContainerNewRecord from "../../../shared/components/AppContainerNewRecord.vue";

export default defineComponent ({
  components: {AppIcon, AppBackButton, AppBaseList, AppContainerNewRecord },
  name: 'Roles',
  data() {
    return {

    }
  }
})

</script>