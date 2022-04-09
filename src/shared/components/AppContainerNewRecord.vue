<template>
  <div
      class="
        tw-flex
        tw-flex-row
        tw-items-center
        tw-justify-center
        tw-rounded-lg
        tw-cursor-pointer
        tw-border-2
        tw-border-gray-300
        tw-border-dashed
        hover:tw-bg-gray-200
        tw-transition-colors
        tw-duration-150
        tw-ease-in-out
        tw-h-full"
  >
    <AppIcon
        class="icon-size-8 align-items-lg-center m-1"
        icon="plus"></AppIcon>
    {{ text }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AppIcon from './AppIcon.vue';

export default defineComponent({
  name: 'AppContainerNewRecord',
  props: ['text'],
  components: {AppIcon}
})
</script>

<style scoped>


</style>