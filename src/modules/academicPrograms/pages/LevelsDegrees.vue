<template>
  <h1>Niveles y grados</h1>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {GetLevelsWithDegreesService} from '../services/getLevelsWithDegrees.service';

const getLevelsWithDegreesService = new GetLevelsWithDegreesService();

export default defineComponent({
  name: 'LevelsDegrees',
  setup() {
    onMounted(async () => {
      const response = await getLevelsWithDegreesService.run();

      console.log(response[0]);
    });
  },
});
</script>

<style scoped>

</style>