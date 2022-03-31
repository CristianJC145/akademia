<template>
  <div class="accordion" :id="id">
    <!--        <progress id="progress" value=0 max=100></progress>-->
    <div class="d-flex flex-column flex-md-row justify-content-around mb-3 gap-4 gap-md-2 position-relative">
      <slot name="header"></slot>
    </div>

    <slot name="items"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppStepper',
  props: ['modelValue'],
  data() {
    return {
      id: '',
      step: this.modelValue,
    };
  },
  mounted() {
    this.id = 'stepper_' + Date.now().toString() + Math.round(Math.random() * 10000);
    this.step = this.modelValue;
  },
  methods: {
    changeStep(step: number) {
      this.$emit('update:modelValue', this.step);
      this.step = step;
    },
  },
});
</script>

<style scoped>
</style>