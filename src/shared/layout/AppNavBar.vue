<template>
  <AppMainDrawer :change-state-menu="showMenu">
    <div id="nav"
         class="w-full border-b border-base-300 bg-base-200 text-base-content">
      <div class="mx-auto space-x-1 navbar max-w-none">
        <div class="flex-none">
          <AppButton class="lg:hidden" color="ghost" @click="showMenu = !showMenu">
            <AppIcon icon="bars" size="lg"></AppIcon>
          </AppButton>
        </div>
        <div class="flex-1 px-2 mx-2">

        </div>
        <div class="flex-none">

          <!--      <AppButton color="ghost" @click="fullScreen()">
                  <AppIcon icon="expand" size="lg"></AppIcon>
                </AppButton>-->
        </div>

      </div>
    </div>

    <div class="p-5 sm:py-7 sm:px-9">
      <slot></slot>
    </div>
  </AppMainDrawer>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AppButton from '../components/AppButton.vue';
import AppIcon from '../components/AppIcon.vue';
import AppMainDrawer from './AppMainDrawer.vue';

const showMenu = ref(false);

</script>

<style scoped>

</style>