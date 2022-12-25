<template>
  <v-sheet
      v-if="Number(height) > 0"
      :class="$style.wrap"
      :height="heightSheet"
      :max-height="maxHeightSheet"
      :min-height="0"
      :color="colorSheet">
      <v-progress-circular
          v-if="progress > 10"
          :theme="theme"
          :model-value="progress"
          :size="size"
          :color="colorProgress"
          :indeterminate="indeterminate" />
  </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps({
  height: { type: Number, default: 0 },
  theme: { type: String, default: 'light' },
});

const maxHeightSheet = 100
const colorSheet = computed(() => props.theme === 'light' ? 'grey-lighten-3' : props.theme)
const heightSheet = computed(() => props.height > maxHeightSheet ? maxHeightSheet : props.height)

const maxHeightProgress = 30
const slow = computed(() => Math.round(props.height - 10 <= 1 ? 1 : props.height - 10))
const progress = computed(() => Math.round(slow.value <= 0 ? 0 : (slow.value * 1.5 >= maxHeightSheet ? maxHeightSheet : slow.value * 1.5)))
const indeterminate = computed(() => progress.value >= maxHeightSheet)

const colorProgress = computed(() => slow.value >= maxHeightProgress ? 'primary' : props.theme)
const size = computed(() => Math.round(slow.value >= maxHeightProgress ? maxHeightProgress : (slow.value <= 10 ? 10 : slow.value)))
</script>

<style module lang="scss">
.wrap {
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap !important;
  justify-content: center;
}
</style>
