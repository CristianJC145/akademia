<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Guardar</button>
        </div>
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
}

export default defineComponent({
  name: 'AppModal',
  props: ['show'],
  data(): IModal {
    return {
      showModal: Boolean(this.show),
      modal: null,
    };
  },
  mounted() {
    const refModal: any = this.$refs.modal;

    this.modal = new Modal(refModal);
    this.actionModal();
    refModal.addEventListener('hidden.bs.modal', () => {
      this.closeModal();
    });
  },
  watch: {
    show(value) {
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
      this.$emit('update:show', false);
    },
  },
});
</script>

<style scoped>

</style>