<template>
  <div class="container">
    <volt-card>
      <template #header>
        <div class="p-5">
          <h1 class="text-2xl text-center">
            Welcome to Vite
          </h1>
        </div>
      </template>

      <template #content>
        <div v-if="showAlert" class="alert alert-success">
          <span v-if="isWebsocket">Rabbit loaded via websocket</span>
          <span v-else>Rabbit loaded via API</span>
        </div>

        <div v-if="showError" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <volt-input-text v-model="eventData" type="text" class="mb-3 p-3 w-full" placeholder="Test Rabbit MQ events" @keypress.enter="emit('rabbit-mq')" />

        <div class="space-y-2">
          <a v-for="(item, i) in urls" :key="i" :href="item.url" class="flex gap-2">
            <vue-icon :icon="item.icon" class="me-2" />
            {{ item.title }}
          </a>
        </div>
      </template>

      <template #footer>
        <volt-button type="button" @click="emit('quart')">
          <vue-icon icon="fa-solid:link" class="me-2" />
          Quart
        </volt-button>

        <volt-button :disabled="websocketOpened" type="button" @click="emit('quart-ws')">
          <div v-if="websocketOpened" class="spinner-grow me-2" style="width: 1rem; height: 1rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <vue-icon v-else icon="fa-solid:link" class="me-2" />
          Django WS
        </volt-button>

        <volt-button v-if="websocketOpened" type="button" @click="ws.close(1000)">
          <vue-icon icon="fa-solid:close" class="me-2" />
          Close rabbit 1
        </volt-button>

        <volt-button type="button" @click="emit('login')">
          <vue-icon icon="fa-solid:link" class="me-2" />
          Test authentication
        </volt-button>
      </template>
    </volt-card>
  </div>
</template>

<script setup lang="ts">
type WebsocketData = {
  state: boolean
}

const emit = defineEmits<{
  'rabbit-mq': []
  'quart': []
  'quart-ws': []
  'login': []
}>()

const { t } = useI18n()

const urls = [
  {
    icon: 'fa-solid:link',
    title: t('Main site'),
    url: 'http://johnpm.fr'
  },
  {
    icon: 'fa-solid:database',
    title: 'Postgres',
    url: 'http://postgres.johnpm.fr'
  }
]

const showAlert = ref<boolean>(false)
const isWebsocket = ref<boolean>(false)
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

const errorMessage = ref<string>('')
const showError = ref<boolean>(false)

const eventData = inject<Record<string, unknown>>('eventData')
const websocketOpened = inject<boolean>('websocketOpened')

useSeoMeta({
  title: 'Home',
  titleTemplate: '%s | Frontend',
  description: 'Some simple description'
})
</script>
