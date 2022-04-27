<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <h2>Bienvenido a Casurid</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'LoginLTI',
  setup(){
    const route = useRoute();

    onMounted(async () => {

      const ltik = route.query.LTItoken
      console.log(ltik)

      localStorage.setItem('ltik',route.query.LTItoken);

      const urlRedirect = route.query.redirect
      console.log(urlRedirect)

      window.location.href=urlRedirect;
    });
  }
});
</script>