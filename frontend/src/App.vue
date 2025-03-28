<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="h4 text-center">
              Welcome to Vite
            </h1>
          </div>

          <div class="card-body">
            <div v-if="showAlert" class="alert alert-success">
              <span v-if="isWebsocket">Rabbit loaded via websocket</span>
              <span v-else>Rabbit loaded via API</span>
            </div>

            <div v-if="showError" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <input v-model="eventData" type="text" class="form-control mb-3 p-3" placeholder="Test Rabbit MQ events..." @keypress.enter="handleTestRabbitMQEvent">

            <div class="list-group">
              <a v-for="(item, i) in urls" :key="i" :href="item.url" class="list-group-item list-group-item-action p-3">
                <IconLib :icon="item.icon" class="me-2" />
                {{ item.title }}
              </a>
            </div>
          </div>

          <div class="card-footer d-flex gap-2">
            <button type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartBackend">
              <IconLib icon="refresh" class="me-2" />
              Load rabbit 1
            </button>

            <button :disabled="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartWebsocket">
              <div v-if="websocketOpened" class="spinner-grow me-2" style="width: 1rem; height: 1rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <IconLib v-else icon="refresh" class="me-2" />
              Load rabbit 2
            </button>

            <button v-if="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="ws.close(1000)">
              <IconLib icon="close" class="me-2" />
              Close rabbit 1
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import { ref, computed } from 'vue'

const urls = [
  {
    icon: 'fa-solid:link',
    title: 'Main site',
    url: 'http://johnpm.fr'
  },
  {
    icon: 'fa-solid:database',
    title: 'Postgres',
    url: 'http://postgres.johnpm.fr'
  }
]

type WebsocketData = {
  state: boolean
}

const isLoading = ref(false)
const showAlert = ref(false)
const isWebsocket = ref(false)
const websocketCounter = ref<WebsocketData[]>([])

const ws = useWebSocket('http://api.johnpm.fr/ws/test', {
  immediate: false,
  onConnected() {
    isWebsocket.value = true
    showAlert.value = true
  },
  onMessage(_ws, event) {
    websocketCounter.value.push(JSON.parse(event.data))
  },
  onError() {
    isWebsocket.value = false
    showAlert.value = false
  },
  onDisconnected() {
    isWebsocket.value = false
    showAlert.value = false
  }
})
const eventData = ref<string>('')
const errorMessage = ref<string>('')
const showError = ref(false)

const websocketOpened = computed(() => {
  return ws.status.value === 'OPEN'
})

async function handleTestRabbitMQEvent() {
  try {
    isLoading.value = true
    const response = await $django_client.post('/test')
    if (response.status === 200) {
      showAlert.value = true
    }
    isLoading.value = false
  } catch (e) {
    errorMessage.value = `Could not send event: ${e}`
    showError.value = true
  }
}

async function handleTestQuartBackend() {
  try {
    isLoading.value = true
    const response = await $client.post('/test')
    if (response.status === 200) {
      showAlert.value = true
    }
    isLoading.value = false
  } catch (e) {
    errorMessage.value = `Could not contact quart API: ${e}`
    showError.value = true
  }
}

async function handleTestQuartWebsocket() {
  try {
    ws.open()
  } catch (e) {
    errorMessage.value = `Could not connect to websocket: ${e}`
    showError.value = true
  }
}
</script>
