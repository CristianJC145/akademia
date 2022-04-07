<template>
  <div
      class="targetContainer
      d-flex
      flex-row
      text-hint
      ease-in-out
      h-100"
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
  props: ['routes', 'title', 'subtitle', 'text'],
  components: {AppIcon}
})
</script>

<style scoped>
.targetContainer{
  align-content: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;
  border-color: darkgray;
  text-decoration-color: darkgray;
  transition: color;
  transition-duration: 150s;
  height: 100px;
  borde: dashed;
  borde: 2px;
  hover: bg-hover;
}

</style>