<template>
  <section>
    <VoltCard>
      <template #content>
        <VoltButton v-if="websocketConnected" @click="getSchools">
          {{ $t("Get schools") }}
        </VoltButton>
        
        <VoltButton v-if="websocketConnected" @click="ws.close()">
          {{ $t("Disconnect to websocket") }}
        </VoltButton>

        <VoltButton v-else @click="ws.open()">
            {{ $t("Connect to websocket") }}
        </VoltButton>
      </template>
    </VoltCard>

    <VoltCard>
      <template v-if="items" #content>
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
      </template>

      <template v-else #content>
        <h1 class="font-bold text-3xl text-center">
          No schools
        </h1>
      </template>
    </VoltCard>
  </section>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import type { School } from '~/types'

type Action = 'connection' | 'disconnection' | 'update'

interface WebsocketMessage {
  action: Action
  message?: string
  results: School[]
}

useHead({
  title: 'Celery'
})

const { $client } = useNuxtApp()
const { data: items } = useFetch<School[]>('/api/schools')

const { sendMessage, parseMessage } = useWebsocketUtilities()

const websocketItems = ref<School[]>([])

/**
 *
 */
const ws = useWebSocket<School[]>('ws://127.0.0.1:8000/ws/government', {
  immediate: false,
  onConnected() {
    // Do something
  },
  onMessage(_ws, event) {
    const data = parseMessage<WebsocketMessage>(event.data)

    if (data) {
      if (data.action === 'connection') {
        // Do something
      }
  
      if (data.action === 'update') {
        websocketItems.value.push(...data.results)
      }
    }
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
  const result = sendMessage('start_requests')
  if (result) {
    ws.send(result)
  }
}
</script>
