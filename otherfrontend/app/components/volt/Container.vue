<template>
  <section :class="theme">
    <slot />
  </section>
</template>

<script setup lang="ts">
const theme = ref([
  'w-full px-10 mx-auto'
])
</script>
