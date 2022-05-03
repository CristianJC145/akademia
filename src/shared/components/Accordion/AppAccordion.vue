<template>
  <div class="accordion" :id="id">
    <slot :accordionId="id"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {GenerateIdForComponentsService} from '../../services/generateIdForComponents.service';

const generateIdForComponentsService = new GenerateIdForComponentsService();

export default defineComponent({
  name: 'AppAccordion',
  setup() {
    const id = generateIdForComponentsService.run('accordion');

    return {
      id,
    };
  },
});
</script>

<style scoped>

</style>