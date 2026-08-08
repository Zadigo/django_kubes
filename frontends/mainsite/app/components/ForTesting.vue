<template>
  <u-card>
    <h1>Great testing!</h1>
    <p id="message">{{ message }}</p>
    <span id="state">{{ isTesting }}</span>

    <u-button id="toggle" @click="() => { toggle() }">
      Toggle
    </u-button>

    <u-button id="search" @click="() => { search(toggle) }">
      Search
    </u-button>
  </u-card>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
}>()
const { isTesting, toggle } = useForTesting()

console.log(useForTesting)

const { search } = useTodo()
</script>
