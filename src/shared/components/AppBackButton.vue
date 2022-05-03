<template>
  <router-link :to="to" class="btn btn-outline-secondary">
    {{ text }}
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppBackButton',
  props: ['to', 'text'],
  setup(props) {
    let text = 'Volver';

    if (props.text) {
      text = props.text;
    }

    return {
      text,
    };
  },
});
</script>