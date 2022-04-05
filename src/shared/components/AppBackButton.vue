<template>
  <router-link to="../../" v-slot="{routes}"></router-link>
  <button v-if="!$route" onclick="back()"></button>
</template>

<script lang="ts">
import { defineComponent} from "vue";

export default defineComponent({
  name: 'AppBackButton',
  props: ['routes'],
  methods: {
    back(): void {
      window.history.back();
    }
  }
})
</script>