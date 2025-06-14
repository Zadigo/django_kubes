<template>
  <section id="site">
    <BootstrapWrapper @rabbit-mq="handleTestRabbitMQEvent" @quart="handleTestQuartBackend" @quart-ws="handleTestQuartWebsocket" @login="handleTestAuthentication" />
    <VoltWrapper />
  </section>
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

provide('websocketOpened', websocketOpened)
provide('eventData', eventData)

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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
</style>
