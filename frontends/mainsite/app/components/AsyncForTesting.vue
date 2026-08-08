<template>
  <section id="todos">
    {{ todo }}
  </section>
</template>

<script setup lang="ts">
const todo = await $fetch('/api/todo', {
  method: 'GET'
})
</script>
