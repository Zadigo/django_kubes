<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const htmlEl = document.querySelector('html')
  if (isDefined(htmlEl)) {
    htmlEl.classList.add('font-sans')
  }
})
</script>
