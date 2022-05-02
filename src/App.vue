<script lang="ts">
import AppToast from './shared/components/AppToast.vue';
import {computed, onMounted} from 'vue';
import {settings} from './shared/constant/settings.contants';

export default {
  components: {AppToast},
  setup() {
    const appName = settings.appName;

    onMounted(() => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = settings.appFavicon as string;
      document.getElementsByTagName('head')[0].appendChild(link);
      if (!document.title) {
        document.title = appName as string;
      }
    });

    return {
      appName,
    };
  },
};
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ${appName}` : `${appName}` }}</template>
  </metainfo>
  <router-view></router-view>
  <AppToast></AppToast>
</template>

<style>

</style>
