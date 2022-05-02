<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <h2>Bienvenido a Casurid</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import {TokenLtiService} from "../../../shared/services/tokenLti.service";
import {TokenService} from "../../../shared/services/token.service";

export default defineComponent({
  name: 'LoginLTI',
  setup(){
    const route = useRoute();
    const tokenLtiService = new TokenLtiService();
    const tokenService = new TokenService();

    onMounted(async () => {

      const ltik = route.query ? route.query.LTItoken: null;
      const urlRedirect = route.query ? route.query.redirect: null;
      const token = route.query ? route.query.SGAtoken: null;

      if(ltik) tokenLtiService.set(ltik.toString());
      if(token) tokenService.set(token.toString());
      if(urlRedirect) window.location.href=urlRedirect.toString();

    });
  }
});
</script>