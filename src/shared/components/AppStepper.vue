<template>
  <div>
    <div class="d-flex flex-column flex-md-row stepper-header justify-content-around gap-2">
      <div class="stepper-item">
        <span class="btn btn-primary text-white">
          1
        </span>
        <span class="lead">
           Nivel Educativo
         </span>
      </div>

      <div class="vr d-none d-md-block"></div>

      <div class="stepper-item disabled">
        <span class="btn btn-secondary text-white">
          2
        </span>
        <span class="lead">
           Grados
         </span>
      </div>

      <div class="vr d-none d-md-block"></div>

      <div class="stepper-item disabled">
        <span class="btn btn-secondary text-white">
          3
        </span>
        <span class="lead">
           Áreas
         </span>
      </div>

      <div class="vr d-none d-md-block"></div>

      <div class="stepper-item disabled">
        <span class="btn btn-secondary text-white">
          4
        </span>
        <span class="lead">
           Asignaturas
         </span>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppStepper',
});
</script>

<style scoped>
.stepper-header {
}

.stepper-header > .stepper-item {
  cursor: pointer;
}

.stepper-header > .stepper-item.disabled {
  opacity: 50%;
  cursor: not-allowed;
}

.stepper-header > .stepper-item > span {
  border-radius: 50%;
  padding: 5px 12px;
  font-size: 1rem;
}
</style>