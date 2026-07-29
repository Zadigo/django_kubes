<template>
  <section class="p-10">
    <div class="mx-20">
      <div class="rounded-xl shadow-lg p-10 bg-white">
        <input type="text" class="border rounded p-2 w-full" placeholder="Type something..." @keypress.enter="sendMessage" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const ws = useWebSocket('ws://127.0.0.1:9000/connect', {
  immediate: true,
  onConnected() {
    console.log('connected')
  },
})

function sendMessage() {
  
}
</script>
