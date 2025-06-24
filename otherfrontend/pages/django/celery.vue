<template>
  <section id="school" class="w-4/6">
    <div class="py-5">
      <button v-if="websocketConnected" type="button" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="getSchools">
        {{ $t("Get schools") }}
      </button>
      
      <button v-if="websocketConnected" type="button" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="ws.close()">
        {{ $t("Disconnect to websocket") }}
      </button>

      <button v-else type="button" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="ws.open()">
          {{ $t("Connect to websocket") }}
      </button>
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
  </section>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import { getWebsocketUrl } from '~/composables/client'
import type { School } from '~/types'

interface WebsocketMessage {
  action: 'connection' | 'disconnection' | 'update'
  message?: string
}

useHead({
  title: 'Celery'
})

const { $djangoClient } = useNuxtApp()

const { data } = useFetch('/api/schools', {
  transform(data: School[]) {
    return data
  }
})

const items = ref<School[]>([])

if (data.value) {
  items.value = data.value
}


function sendMessage(action: string, data?: Record<string, string>) {
  const template = { action }
  if (data) {
    Object.assign(template, data)
  }
  return JSON.stringify(template)
}

const ws = useWebSocket<School[]>(getWebsocketUrl('ws/government'), {
  immediate: false,
  onConnected() {
    console.log('Connected')
  },
  onMessage(_ws, event) {
    const data = JSON.parse(event.data) as WebsocketMessage
    
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

async function getProtectedData() {
  try {
    const response = await $djangoClient.get<School>('schools/v1/1')
    console.log(response.data)
  } catch (e) {
    console.error(e)
  }
}

async function getSchools() {
  const data = sendMessage('start_requests')
  ws.send(data)
}
</script>
