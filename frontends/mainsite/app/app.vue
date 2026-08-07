<template>
  <nuxt-layout>
    <nuxt-loading-indicator />
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
useState('isAuthenticated', () => false)

onBeforeMount(() => {
  const htmlEl = document.querySelector('html')
  if (isDefined(htmlEl)) {
    htmlEl.classList.add('dark:bg-surface-800')
  }
})
</script>
