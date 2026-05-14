<template>
  <div class="flex items-stretch flex-auto">
    <div v-if="$slots.start" class="flex items-center justify-center border-y border-s border-surface-300 dark:border-surface-700 rounded-s-md overflow-hidden">
      <slot name="start" />
    </div>

    <slot />

    <div v-if="$slots.end" class="flex items-center justify-center border-y border-e border-surface-300 dark:border-surface-700 rounded-e-md overflow-hidden">
      <slot name="end" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
