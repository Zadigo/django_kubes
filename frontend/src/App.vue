<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="h4 text-center">
              {{ $t("Welcome to Vite") }}
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

            <input v-model="eventData" type="text" class="form-control mb-3 p-3" :placeholder="$t('Test Rabbit MQ events')" @keypress.enter="handleTestRabbitMQEvent">

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
            <button type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartBackend">
              <IconLib icon="fa-solid:link" class="me-2" />
              Quart
            </button>

            <button :disabled="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartWebsocket">
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

            <button type="button" class="btn btn-secondary btn-rounded" @click="handleTestAuthentication">
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

useSeoMeta({
  title: 'Home',
  titleTemplate: '%s | Frontend',
  description: 'Some simple description'
})

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

const isLoading = ref<boolean>(false)
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

const { client } = useAxiosClient()

const eventData = ref<string>('')
const errorMessage = ref<string>('')
const showError = ref<boolean>(false)

const websocketOpened = computed(() => {
  return ws.status.value === 'OPEN'
})

/**
 *
 */
async function handleTestRabbitMQEvent() {
  try {
    isLoading.value = true

    const response = await client.post('/test')

    if (response.status === 200) {
      showAlert.value = true
    }

    isLoading.value = false
  } catch (e) {
    errorMessage.value = `Could not send event: ${e}`
    showError.value = true
  }
}

/**
 *
 */
async function handleTestQuartBackend() {
  try {
    isLoading.value = true

    const { client } = useAxiosClient(null, 5000)
    const response = await client.post('/test')

    if (response.status === 200) {
      showAlert.value = true
    }
    isLoading.value = false
  } catch (e) {
    errorMessage.value = `Could not contact quart API: ${e}`
    showError.value = true
  }
}

/**
 *
 */
async function handleTestQuartWebsocket() {
  try {
    ws.open()
  } catch (e) {
    errorMessage.value = `Could not connect to websocket: ${e}`
    showError.value = true
  }
}

/**
 *
 */
async function handleTestAuthentication() {
  try {
    const { authenticatedClient: client } = useAuthenticatedAxiosClient()
    const response = await client.get('/schools/v1/test-authenticated')

    if (response.status === 200) {
      showAlert.value = true
    }
  } catch (e) {
    errorMessage.value = `Could not contact quart API: ${e}`
    showError.value = true
  }
}

// const { getStore, open, add } = useIndexDatabase('myDb', 1, [
//   {
//     name: 'celebrities',
//     keyPath: 'id',
//     autoIncrement: true,
//     indexes: [
//       { name: 'celebrityId', keyPath: 'celebrityId', options: { unique: true } },
//       { name: 'name', keyPath: 'name' }
//     ]
//   }
// ])

// async function google() {
//   await open()
//   console.log('setup', getStore('test-db', 'readonly'))
//   add('celebrities')
// }

// google()

// const { state, isReady } = useAsyncState(async () => {
//   await open()
//   console.log('getStore', getStore('test-db', 'readonly'))
//   await add()
// }, null, { immediate: true })
// console.log('state', state.value, isReady.value)
</script>
