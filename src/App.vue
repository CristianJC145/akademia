<script lang="ts">
import AppToast from './shared/components/AppToast.vue';
import {onMounted} from 'vue';
import {settings} from './shared/constant/settings.contants';

export default {
  components: {AppToast},
  setup() {
    onMounted(() => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = settings.appFavicon as string;
      document.getElementsByTagName('head')[0].appendChild(link);
    });
  },
};
</script>

<template>
  <router-view></router-view>
  <AppToast></AppToast>
</template>

<style>

</style>
