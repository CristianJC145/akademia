<template>
  <div class="alert alert-danger d-flex flex-row align-items-center" role="alert"
       v-if="message || validationErrors.length">
    <AppIcon icon="exclamation-triangle" class="me-4" size="lg"></AppIcon>
    <div>
      {{ message }}

      <ul class="mt-2" v-if="validationErrors.length">
        <li v-for="error in validationErrors" class="tw-list-disc">
          {{ error }}
          <!--        {{ error[0] | transloco: error[1] }}-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import AppIcon from './AppIcon.vue';
import errorAlertStore from '../stores/errorAlert.store';

export default defineComponent<{
  state: any,
}>({
  name: 'AppErrorAlert',
  components: {AppIcon},
  setup() {
    const state = inject('state', errorAlertStore.state);

    const message = computed(() => state.message);
    const validationErrors = computed(() => state.validationErrors);

    return {
      state,
      message,
      validationErrors
    };
  },
});
</script>

<style scoped>

</style>