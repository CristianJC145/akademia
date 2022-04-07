<template>
  <AppFormModal :title="title">
    <template v-slot:content>
      <AppLogin ref="login" @success="successLogin"></AppLogin>
    </template>
    <template v-slot:actions>
      <button class="btn btn-primary text-white" @click="$refs.login.login">
        Iniciar
      </button>
    </template>
  </AppFormModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';
import AppLogin from '../../../shared/components/AppLogin.vue';

interface ComponentPublicInstance {
  $parent: any;
}

export default defineComponent({
  name: 'LoginCasurid',
  components: {AppLogin, AppFormModal},
  data() {
    return {
      title: 'Iniciar sesión',
    };
  },
  methods: {
    successLogin() {
      this.$parent?.$emit('close');
    },
  },
});
</script>

<style scoped>

</style>