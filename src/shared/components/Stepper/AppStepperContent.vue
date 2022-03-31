<template>
  <Transition>
    <div v-show="step == currentStep">
      <slot></slot>
    </div>
  </Transition>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppStepperContent',
  props: ['step'],
  computed: {
    currentStep() {
      const parent: any = this.$parent;

      return parent.step;
    },
  },
});
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>