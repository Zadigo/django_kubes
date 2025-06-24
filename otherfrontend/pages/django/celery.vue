<template>
  <VoltCtonainer id="school" class="w-4/6">
    <div class="py-5">
      <VoltButton v-if="websocketConnected" @click="getSchools">
        {{ $t("Get schools") }}
      </VoltButton>
      
      <VoltButton v-if="websocketConnected" @click="ws.close()">
        {{ $t("Disconnect to websocket") }}
      </VoltButton>

      <VoltButton v-else @click="ws.open()">
          {{ $t("Connect to websocket") }}
      </VoltButton>
    </div>

    <div class="grid grid-cols-4 grid-rows-1 gap-2">
      <div v-for="item in items" :key="item.name" class="block w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h2 class="font-bold text-sm">
          {{ item.name }}
        </h2>

        <a href="#" @click.prevent="getProtectedData">
          Test protected view
        </a>
      </div>
    </div>
  </VoltCtonainer>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import type { School } from '~/types'

interface WebsocketMessage {
  action: 'connection' | 'disconnection' | 'update'
  message?: string
}

useHead({
  title: 'Celery'
})

const { $client } = useNuxtApp()

const { data } = useFetch('/api/schools', {
  transform(data: School[]) {
    return data
  }
})

const items = ref<School[]>([])

if (data.value) {
  items.value = data.value
}

const { sendMessage, parseMessage } = useWebsocketUtilities()

/**
 *
 */
const ws = useWebSocket<School[]>('ws://127.0.0.1:8000/ws/government', {
  immediate: false,
  onConnected() {
    console.log('Connected')
  },
  onMessage(_ws, event) {
    const data = parseMessage<WebsocketMessage>(event.data)

    if (data.action === 'connection') {
      // Do something
    }

    if (data.action === 'update') {
      items.value.push(...data.results)
    }
  },
  onDisconnected() {
    // Do something
    items.value = []
  }
})

const websocketConnected = computed(() =>  {
  return ws.status.value === 'OPEN'
})

/**
 *
 */
async function getProtectedData() {
  try {
    const response = await $client<School>('schools/v1/1', {
      method: 'GET'
    })  
    console.log(response)
  } catch (e) {
    console.error(e)
  }
}

/**
 *
 */
async function getSchools() {
  const data = sendMessage('start_requests')
  ws.send(data)
}
</script>
