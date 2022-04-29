<template>
  <app-base-list
    title="Home"
    subtitle="Welcome"
  >
    <template v-slot:actions>
      <div class="align-content-center">
        <AppBackButton></AppBackButton>
      </div>

    </template>

    <template v-slot:content>
      <div class="flex flex-col flex-auto min-w-0">
        <!-- Header -->
        <div class="bg-card">
          <div class="flex flex-col w-full max-w-screen-xl mx-auto px-6 sm:px-8">
            <div class="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-8 sm:my-12">
              <!-- Avatar and name -->
              <div class="flex flex-auto items-center min-w-0">
                <div class="flex-0 w-16 h-16 rounded-full overflow-hidden">
                  <!--img
                      class="w-full h-full object-cover"
                      v-if="user.avatar"
                      :src="user.avatar">
                  <AppIcon
                      class="icon-size-16"
                      v-if="!user.avatar"
                      :svgIcon="'heroicons_solid:user-circle'"></AppIcon-->
                </div>
                <div class="flex flex-col min-w-0 ml-4">

                </div>
              </div>

            </div>

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
import AppIcon from "../../../shared/components/AppIcon.vue";

  export default defineComponent ({
  components: {AppIcon, AppBackButton, AppBaseList },
    name: 'Home',
    data() {
      return {

      }
    }
  })

</script>

<style scoped>

</style>