<template>
  <div class="tw-flex tw-flex-col tw-flex-auto tw-min-w-0">
    <!-- Header -->
    <div
        class="tw-flex tw-flex-col tw-flex-0 p-4 sm:tw-py-4 sm:tw-px-6 tw-border-b tw-bg-white">
      <!-- Breadcrumbs -->
      <AppBreadCrumbs :routes="routes"></AppBreadCrumbs>

      <!-- Title -->
      <div class="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-gap-4 sm:tw-gap-2">
        <div>
          <h2 class="tw-text-3xl md:tw-text-4xl tw-tracking-tight tw-leading-7 sm:tw-leading-10 tw-truncate">
            <span>{{ title }}</span> <!--Texto plano-->
          </h2>
          <div class="tw-mt-1.5 tw-text-lg tw-text-secondary">
            <span>{{ subtitle }}</span>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center gap-2">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <!--  Content  -->
    <div class="tw-flex-auto tw-p-4 sm:tw-p-6">
      <div class="card">
        <div class="card-body">
          <slot name="content"></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppBreadCrumbs from './AppBreadCrumbs.vue';

export default defineComponent({
  name: 'AppBaseList',
  props: ['routes', 'title', 'subtitle'],
  components: {AppBreadCrumbs},
});
</script>