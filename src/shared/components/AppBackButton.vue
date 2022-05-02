<template>
  <router-link :to="route" class="btn btn-outline-secondary">
    {{ text }}
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppBackButton',
  props: ['route', 'text'],
  setup(props) {
    let text = 'Volver';

    if (props.text) {
      text = props.text;
    }

    return {
      route: props.route,
      text,
    };
  },
});
</script>