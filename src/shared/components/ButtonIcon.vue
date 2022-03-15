<template>
  <button type="button" class="btn btn-">
<!--    <font-awesome-icon icon="bars" size="lg"></font-awesome-icon>-->
  </button>
</template>

<script setup lang="ts">
import {ColorTypeStrings} from '../types/color.type';

defineProps<{ color: ColorTypeStrings }>();
</script>

<style scoped>

</style>