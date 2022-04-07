<template>
  <div class="flex flex-col flex-auto min-w-0">
    <!-- Header -->
    <div
        class="flex flex-col flex-0 p-6 sm:py-8 sm:px-10 border-b bg-card dark:bg-transparent">
      <!-- Breadcrumbs -->
      <AppBreadCrumbs :routes="routes"></AppBreadCrumbs>

      <!-- Title -->
      <div class="mt-2 flex flex-col sm:flex-row justify-between gap-4 sm:gap-2">
        <div>
          <h2 class="text-3xl md:text-4xl tracking-tight leading-7 sm:leading-10 truncate">
            <span>{{ title }}</span> <!--Texto plano-->
          </h2>
          <div class="mt-1.5 text-lg text-secondary">
            <span>{{ subtitle }}</span>
          </div>
        </div>

        <slot name="actions"></slot>
      </div>
    </div>

    <!--  Content  -->
    <div class="flex-auto p-6 sm:p-10">
      <!--        <div class="prose prose-sm max-w-5xl">-->
      <slot name="content"></slot>
      <!--        </div>-->
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AppBreadCrumbs from "./AppBreadCrumbs.vue";

export default defineComponent({
  name: 'AppBaseList',
  props: ['routes', 'title', 'subtitle'],
  components: {AppBreadCrumbs}
})
</script>