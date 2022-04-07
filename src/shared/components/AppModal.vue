<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog" :class="{
      'modal-dialog-centered': centerModal
    }">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Modal} from 'bootstrap';

interface IModal {
  showModal: boolean;
  modal: any;
  centerModal: boolean,
}

export default defineComponent({
  name: 'AppModal',
  props: ['modelValue', 'center'],
  data(): IModal {
    return {
      showModal: Boolean(this.modelValue),
      modal: null,
      centerModal: true,
    };
  },
  mounted() {
    if (this.center == undefined) {
      this.centerModal = true;
    } else {
      this.centerModal = this.center;
    }

    const refModal: any = this.$refs.modal;

    this.modal = new Modal(refModal);
    this.actionModal();
    refModal.addEventListener('hidden.bs.modal', () => {
      this.closeModal();
    });
  },
  watch: {
    modelValue(value) {
      this.showModal = value;
      this.actionModal();
    },
  },
  methods: {
    actionModal() {
      if (this.showModal) {
        this.modal.show();
      } else {
        this.modal.hide();
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('update:modelValue', false);
    },
  },
});
</script>

<style scoped>

</style>