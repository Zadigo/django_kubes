<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'

useState('isAuthenticated', () => false)

onBeforeMount(() => {
  const htmlEl = document.querySelector('html')
  if (isDefined(htmlEl)) {
    htmlEl.classList.add('dark:bg-surface-800')
  }
})
</script>
