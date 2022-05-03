<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <h2>Bienvenido a Casurid</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue';
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
      const success = route.query ? route.query.success: null;

      const message = route.query.msg ? route.query.msg.toString():'';

      if(message) alert(message);

      if(ltik) tokenLtiService.set(ltik.toString());
      if(token) tokenService.set(token.toString());
      if(urlRedirect && success==='true'){
        window.location.href=urlRedirect.toString();
      }

    });

  }
});
</script>