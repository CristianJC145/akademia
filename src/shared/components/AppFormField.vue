<template>
  <div class="mb-3 tw-flex-1" ref="main">
    <slot></slot>
    <small class="text-danger" v-if="formControl && formControl.$errors.length">
      <!-- {{ formControl.$errors[0].$message }}    -->
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
  emits: ['errMessage'],
  setup() {
    const getTranslation = (error: any) => {
      let errMessage = '';

      const dictionary = [
        {errorMsg: 'Value is required', translated: 'Este campo es requerido'},
        {errorMsg: 'The maximum length allowed is 10', translated: 'La longitud máxima permitida es de 10 caracteres'},
        {errorMsg: 'Value must be numeric', translated: 'El valor debe ser numérico'},
        {errorMsg: 'The value is not a valid URL address', translated: 'El valor no es una dirección URL válida'},
      ];

      dictionary.forEach((err) => {
        if (err.errorMsg == error) {
          errMessage = err.translated;
        }
      });

      if (!errMessage.length && error.length) {
        errMessage = error;
      }

      return errMessage;
    };

    return {
      getTranslation,
    };
  },
  data(): IData {
    return {
      hasError: false,
      control: null,
      label: null,
    };
  },
  watch: {
    'formControl.$error'(value) {
      console.log(this.formControl.$errors);
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