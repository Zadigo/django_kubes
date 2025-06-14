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

            <input v-model="eventData" type="text" class="form-control mb-3 p-3" placeholder="Test Rabbit MQ events" @keypress.enter="emit('rabbit-mq')">

            <div class="list-group">
              <a v-for="(item, i) in urls" :key="i" :href="item.url" class="list-group-item list-group-item-action p-3">
                <IconLib :icon="item.icon" class="me-2" />
                {{ item.title }}
              </a>
            </div>
          </div>

          <div class="card-body">
            <LoginBlock />
          </div>

          <div class="card-footer d-flex gap-2">
            <button type="button" class="btn btn-secondary btn-rounded" @click="emit('quart')">
              <IconLib icon="fa-solid:link" class="me-2" />
              Quart
            </button>

            <button :disabled="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="emit('quart-ws')">
              <div v-if="websocketOpened" class="spinner-grow me-2" style="width: 1rem; height: 1rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <IconLib v-else icon="fa-solid:link" class="me-2" />
              Django WS
            </button>

            <button v-if="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="ws.close(1000)">
              <IconLib icon="fa-solid:close" class="me-2" />
              Close rabbit 1
            </button>

            <button type="button" class="btn btn-secondary btn-rounded" @click="emit('login')">
              <IconLib icon="fa-solid:link" class="me-2" />
              Test authentication
            </button>
          </div>
        </div>
      </div>
    </div>
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
