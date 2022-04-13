<template>
  <div class="tw-flex tw-flex-col -m-6">
    <!-- Header -->
    <div v-if="title"
         class="tw-flex tw-flex-0 tw-items-center tw-justify-between tw-h-16 tw-pr-3 sm:tw-pr-5 tw-pl-6 sm:tw-pl-8 bg-primary text-on-primary">
      <div class="tw-text-lg tw-font-medium">
        <div v-if="!mode" :key="title"></div>
        <span v-if="mode">
                <span v-if="mode.includes('core.')">Mode</span>
          <div
            v-if="!mode.includes('core.')" :key="mode"></div>&nbsp;
          <div
            :key="title"></div>
            </span>
      </div>
      <button
          type="button"
          :tabIndex="-1"
          @click="close()">
        <AppIcon
            class="tw-text-current"
            icon="window-close"></AppIcon>
      </button>
    </div>

    <div class="tw-px-6 tw-py-4">

    </div>

    <div class="tw-flex tw-flex-row tw-justify-end p-2 border-t-2">
      <slot name="content"></slot>
    </div>
  </div>

</template>
<script lang="ts">
import {defineComponent} from "vue";
import AppIcon from "./AppIcon.vue";

export default defineComponent({
  name: "AppBaseDialog",
  components: {AppIcon},
  props: ['title', 'mode'],
  model: {
    emit: 'closeDialog',
  },
  methods: {
   close(): void {
     //this.closeDialog.$emit();
     this.$emit('closeDialog');
   }
  }
})

</script>