<template>
  <u-card>
    <h1>Great testing!</h1>
    <span id="state">{{ isTesting }}</span>
  </u-card>
</template>

<script setup lang="ts">
const { isTesting } = useForTesting()
</script>
