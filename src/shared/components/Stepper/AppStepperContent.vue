<template>
  <Transition name="slide-fade">
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

</style>