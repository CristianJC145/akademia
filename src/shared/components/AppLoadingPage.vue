<template>
  <div class="flex justify-center items-center pt-10">
    <pulse-loader diameter="45"></pulse-loader>
  </div>
</template>

<script lang="ts">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import {defineComponent} from "vue";
export default defineComponent ({
  components: { PulseLoader },
  name: 'LoadingPage',
})
</script>