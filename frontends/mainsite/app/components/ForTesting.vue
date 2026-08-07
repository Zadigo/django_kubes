<template>
  <u-card>
    <h1>Great testing!</h1>
    <span id="state">{{ isTesting }}</span>
    <u-button @click="() => { toggle() }">Toggle</u-button>
  </u-card>
</template>

<script setup lang="ts">
const { isTesting, toggle } = useForTesting()
</script>
