<template>
  <router-link v-if="to" :to="to"
               class="btn btn-outline-primary">
    <AppIcon icon="pencil-alt"></AppIcon>
  </router-link>

  <button v-else class="btn btn-outline-primary">
    <AppIcon icon="pencil-alt"></AppIcon>
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
    return {
      to: props.to,
    };
  },
});
</script>

<style scoped>

</style>