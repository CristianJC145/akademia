<template>
  <button :class="{
    btn: true,
    'flex': true,
    'gap-1.5': true,
    'btn-primary': validateColor(ColorType.primary),
    'btn-secondary': validateColor(ColorType.secondary),
    'btn-info': validateColor(ColorType.info),
    'btn-accent': validateColor(ColorType.accent),
    'btn-success': validateColor(ColorType.success),
    'btn-error': validateColor(ColorType.error),
    'btn-warning': validateColor(ColorType.warning),
    'btn-ghost': validateColor(ColorType.ghost),
    'btn-xs': validateSize(ButtonSizeType.xs),
    'btn-sm': validateSize(ButtonSizeType.sm),
    'btn-md': validateSize(ButtonSizeType.md),
    'btn-lg': validateSize(ButtonSizeType.lg),
    'btn-block': validateType(ButtonTypeType.block),
    'btn-link': validateType(ButtonTypeType.link),
    'btn-outline': validateType(ButtonTypeType.outline),
    'btn-circle': validateType(ButtonTypeType.circle),
    'btn-square': validateType(ButtonTypeType.square),
    'loading': props.loading,
  }">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {ColorType, ColorTypeStrings} from '../types/color.type';
import {ButtonSizeType, ButtonSizeTypeStrings} from '../types/buttonSize.type';
import {ButtonTypeType, ButtonTypeTypeStrings} from '../types/buttonType.type';

const props = defineProps<{
  color?: ColorTypeStrings,
  size?: ButtonSizeTypeStrings,
  type?: ButtonTypeTypeStrings,
  loading?: boolean,
}>();

function validateColor(color: ColorTypeStrings) {
  return props.color === ColorType[color];
}

function validateSize(size: ButtonSizeTypeStrings) {
  return props.size === ButtonSizeType[size];
}

function validateType(type: ButtonTypeTypeStrings) {
  return props.type === ButtonTypeType[type];
}
</script>

<style scoped>

</style>