<template>
  <div class="flex flex-wrap items-center font-medium" :active="$route.length">
    <div class="flex items-center ml-1 whitespace-nowrap" v-for="route of routes" :key="route">
      <font-awesome-icon :icon="props.icon" :size="props.size"></font-awesome-icon>
      <a class="whitespace-nowrap text-primary-500" v-if="!route.url">{{ route.name }}</a>
      <a class="whitespace-nowrap text-primary-500" v-if="route.url" :routerLink="route.url">{{ route.name }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppBreadCrumbs',
  props: ['routes'],
  data() {
    return {
    };
  },
})
</script>