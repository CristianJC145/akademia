<template>
  <font-awesome-icon :icon="props.icon" :size="props.size"></font-awesome-icon>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {IconSizeTypeStrings} from '../types/iconSize.type';

const props = defineProps<{
  icon?: string,
  size?: IconSizeTypeStrings,
}>();
</script>

<style scoped>

</style>