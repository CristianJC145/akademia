<template>
  <form
    @submit=""
  >
    <AppBaseDialog
      title="Editar rol"
    >
      <div content class="tw-flex tw-flex-col tw-flex-auto tw-overflow-y-auto">
        <form>
          <label>Nombre</label>
          <input type="text" id="name" required>
          <div v-if="!name">Datos no validos</div>
        </form>

        <form>
          <label>Descripción</label>
          <input type="text" id="description" required>
          <div v-if="!description">Datos no validos</div>
        </form>


      </div>
    </AppBaseDialog>


  </form>
</template>

<script lang="ts">
import AppBaseDialog from '../../../shared/components/AppBaseDialog';
import {defineComponent} from "vue";

export default defineComponent({
  components: {AppBaseDialog}

})

</script>