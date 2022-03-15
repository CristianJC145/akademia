<template>
  <div class="h-screen m-auto">
    <authenticator
        v-if="!loading"
        class="h-screen"
        :social-providers="['google']">
    </authenticator>
  </div>
</template>

<script setup lang="ts">
import {Authenticator} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import {onMounted, ref} from 'vue';
import {Hub} from 'aws-amplify';
import {useRouter} from 'vue-router';
import {IsAuthenticatedService} from '../../../shared/services/isAuthenticated.service';

const router = useRouter();
const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();
let loading = ref(true);
const defaultRouteRedirect = '/admin/home';

async function onAuthEvent(data: any): Promise<void> {
  switch (data.event) {
    case 'signIn':
      await router.push(defaultRouteRedirect);
      // document.getElementsByTagName('body')[0].style.display = 'none';

      // window.location.href = this.redirectURL;
      break;
  }
}

onMounted(async () => {
  const isAuthenticated = await isAuthenticatedService.run();
  if (isAuthenticated) {
    await router.push(defaultRouteRedirect);
  }

  loading.value = false;

  Hub.listen('auth', (data) => {
    onAuthEvent(data.payload);
  });
});

</script>

<style scoped>
:deep(.amplify-tabs) {
  display: none;
}
</style>