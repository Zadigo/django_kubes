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

            <input v-model="eventData" type="text" class="form-control mb-3 p-3" placeholder="Test Rabbit MQ events..." @keypress.enter="handleTestRabbitMQEvent" />
            
            <div class="list-group">
              <a v-for="(item, i) in urls" :key="i" :href="item.url" class="list-group-item list-group-item-action p-3">
                <font-awesome-icon :icon="item.icon" class="me-2" />
                {{ item.title }}
              </a>
            </div>
          </div>

          <div class="card-footer d-flex gap-2">
            <button type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartBackend">
              <font-awesome-icon icon="refresh" class="me-2" />
              Load rabbit 1
            </button>

            <button :disabled="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartWebsocket">
              <div v-if="websocketOpened" class="spinner-grow me-2" style="width: 1rem; height: 1rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <font-awesome-icon v-else icon="refresh" class="me-2" />
              Load rabbit 2
            </button>
            
            <button v-if="websocketOpened" type="button" class="btn btn-secondary btn-rounded" @click="ws.close(1000)">
              <font-awesome-icon icon="close" class="me-2" />
              Close rabbit 1
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useWebSocket } from '@vueuse/core';
import { defineComponent, ref } from 'vue';

const urls = [
  {
    icon: 'link',
    title: 'Main site',
    url: 'http://johnpm.fr'
  },
  {
    icon: 'database',
    title: 'Postgres',
    url: 'http://postgres.johnpm.fr'
  }
]

type WebsocketData = {
  state: boolean
}

export default defineComponent({
  name: 'App',
  setup() {
    const isLoading = ref(false)
    const showAlert  = ref(false)
    const isWebsocket = ref(false)
    const websocketCounter = ref<WebsocketData[]>([])
    const { open, close, data, status, send } = useWebSocket('http://api.johnpm.fr/ws/test', {
      immediate: false,
      onConnected () {
        isWebsocket.value = true
        showAlert.value = true
      },
      onMessage () {
        websocketCounter.value.push(JSON.parse(data.value))
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

    return {
      ws: {
        open,
        close,
        status: status,
        send
      },
      showError,
      errorMessage,
      websocketCounter,
      showAlert,
      eventData,
      isWebsocket,
      isLoading,
      urls
    }
  },
  computed: {
    websocketOpened() {
      return this.ws.status.value === 'OPEN'
    }
  },
  methods: {
    async handleTestRabbitMQEvent() {
      try {
        this.isLoading = true
        const response = await this.$django_client.post('/test')
        if (response.status === 200) {
          this.showAlert = true
        }
        this.isLoading = false
      } catch (e) {
        this.errorMessage = `Could not send event: ${e}`
        this.showError = true
      }
    },
    async handleTestQuartBackend() {
      try {
        this.isLoading = true
        const response = await this.$client.post('/test')
        if (response.status === 200) {
          this.showAlert = true
        }
        this.isLoading = false
      } catch (e) {
        this.errorMessage = `Could not contact quart API: ${e}`
        this.showError = true
      }
    },
    async handleTestQuartWebsocket() {
      try {
        this.ws.open()
      } catch (e) {
        this.errorMessage = `Could not connect to websocket: ${e}`
        this.showError = true
      }
    }
  }
})
</script>
