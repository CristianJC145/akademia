<template>
  <div class="mb-3" ref="main">
    <slot></slot>
    <small class="text-danger" v-if="formControl && formControl.$errors.length">
      {{ formControl.$errors[0].$message }}
    </small>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

interface IData {
  hasError: boolean;
  control: Element | null;
  label: HTMLLabelElement | null;
}

export default defineComponent({
  props: ['formControl'],
  data(): IData {
    return {
      hasError: false,
      control: null,
      label: null,
    };
  },
  watch: {
    'formControl.$error'(value) {
      if (!this.control) {
        return;
      }

      if (value) {
        this.control.classList.add('is-invalid');
        this.label?.classList.add('text-danger');
      } else {
        this.control.classList.remove('is-invalid');
        this.label?.classList.remove('text-danger');
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const main = this.$refs.main as HTMLElement;
      Array.from(main.getElementsByClassName('form-control')).forEach((el) => {
        this.control = el;
      });

      Array.from(main.getElementsByTagName('label')).forEach((label) => {
        this.label = label;
      });
    });
  },
});
</script>