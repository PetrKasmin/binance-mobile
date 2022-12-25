<template>
  <v-app :theme="theme.getThem">
    <slot />
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from '~/stores/theme';
const theme = useTheme();
</script>