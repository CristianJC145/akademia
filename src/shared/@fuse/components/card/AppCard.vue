<template>
  <!-- Flippable card -->
  <div v-if="flippable">
    <!-- Front -->
    <div class="fuse-card-front">
      <slot name="fuseCardFront"></slot>
    </div>

    <!-- Back -->
    <div class="fuse-card-back">
      <slot name="fuseCardBack"></slot>
    </div>
  </div>

  <div v-if="!flippable">
    <!-- Content -->
    <slot></slot>

    <!-- Expansion -->
    <div
        class="fuse-card-expansion"
        v-if="expanded"
        v-model:@expandCollapse
    >
      <slot name="fuseCardExpansion"></slot>
    </div>
  </div>

</template>

<script lang="ts">
import {FuseCardFace} from "./card.type";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'AppCard',
  props: ['text'],
  components: {}
})

</script>