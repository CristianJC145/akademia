<template>
  <router-link :to="link" class="nav-link" :class="{
    'text-secondary': !isActive,
    'text-white': isActive,
    'active': isActive,
  }">
    <AppIcon class="me-2" icon="home"></AppIcon>
    {{ t(title) }}
  </router-link>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import AppIcon from './AppIcon.vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'AppLinkNavigation',
  props: ['title', 'icon', 'link'],
  components: {AppIcon},
  setup(props) {
    const {t} = useI18n();
    const route = useRoute();

    const isActive = computed(() => {
      return route.fullPath === props.link;
    });

    return {
      title: props.title,
      icon: props.icon,
      isActive,
      t,
    };
  },
});
</script>

<style scoped>

</style>