<template>
  <PlansForm :title="title" :routes="routes"></PlansForm>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import PlansForm from '../components/PlansForm.vue';

export default defineComponent({
  name: 'PlansCreate',
  components: {PlansForm},
  setup() {
    const title = 'Nuevo plan';

    const routes = [
      {
        name: 'Planes',
        url: {
          name: 'casurid.plansList',
        },
      },
      {
        name: title,
      },
    ];

    return {
      title,
      routes,
    };
  },
});
</script>

<style scoped>

</style>