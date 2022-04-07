<!--<AppLoadingPage v-if="loading"></AppLoadingPage>-->
<template>
  <app-base-list
    v-if="!loading"
    title="Administración de Cursos"
    subtitle="Visualiza y trabaja con tus cursos configurados"
  >
  </app-base-list>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AppBaseList from '../../../shared/components/AppBaseList.vue'
// import AppLoadingPage from "../../../shared/components/AppLoadingPage.vue";

export default defineComponent ({
  components: { AppBaseList },
  name: 'CourseAdministration',
  data() {
    return {
      loading: false,
    }
  }
})
</script>