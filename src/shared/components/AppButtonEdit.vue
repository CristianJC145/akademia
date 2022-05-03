<template>
  <router-link v-if="to" :to="to"
               class="btn btn-outline-primary" v-tooltip="title">
    <AppIcon :icon="icon"></AppIcon>
  </router-link>

  <button v-else class="btn btn-outline-primary" v-tooltip="title">
    <AppIcon :icon="icon"></AppIcon>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppIcon from './AppIcon.vue';

export default defineComponent({
  name: 'AppButtonEdit',
  components: {AppIcon},
  props: ['to'],
  setup(props) {
    const icon = 'pencil-alt';
    const title = 'Editar';

    return {
      to: props.to,
      icon,
      title,
    };
  },
});
</script>

<style scoped>

</style>