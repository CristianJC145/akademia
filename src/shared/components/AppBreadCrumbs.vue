<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" :class="{ active: index === routes.length - 1 }" v-for="(route, index) in routes">
        <router-link v-if="route.url" :to="route.url">{{ route.name }}</router-link>
        <template v-else :to="route.url">{{ route.name }}</template>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';

export default defineComponent({
  name: 'AppBreadCrumbs',
  props: ['routes'],
});
</script>