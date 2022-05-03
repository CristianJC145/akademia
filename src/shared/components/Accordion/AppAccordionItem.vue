<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              :data-bs-target="`#${id}`"
              aria-expanded="true" aria-controls="collapseOne">
        <slot name="head"></slot>
      </button>
    </h2>
    <div :id="id" class="accordion-collapse collapse" :data-bs-parent="`#${accordionId}`">
      <div class="accordion-body">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {GenerateIdForComponentsService} from '../../services/generateIdForComponents.service';

const generateIdForComponentsService = new GenerateIdForComponentsService();

export default defineComponent({
  name: 'AppAccordionItem',
  props: ['accordionId'],
  setup() {
    const id = generateIdForComponentsService.run('accordion_item');

    return {
      id,
    };
  },
});
</script>

<style scoped>

</style>