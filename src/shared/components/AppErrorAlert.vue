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
import {defineComponent, inject} from 'vue';
import AppIcon from './AppIcon.vue';
import errorAlertStore from '../stores/errorAlert.store';

export default defineComponent<{
  state: any,
}>({
  name: 'AppErrorAlert',
  components: {AppIcon},
  setup() {
    const state = inject('state', errorAlertStore.state);

    return {
      state,
    };
  },
  computed: {
    message() {
      return this.state.message;
    },
    validationErrors() {
      return this.state.validationErrors;
    },
  },
  mounted() {
  },
});
</script>

<style scoped>

</style>