type WebsocketData = {
  state: boolean
}

export const useWebsocketManager = createGlobalState(() => {
  const [ showAlert, _toggleShowAlert ] = useToggle<boolean>(false)
  const [ isWebsocket, _toggleIsWebsocket ] = useToggle<boolean>(false)
  const websocketCounter = ref<WebsocketData[]>([])

  const wsObject = useWebSocket('http://api.johnpm.fr/ws/test', {
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
  const showError = ref<boolean>(false)

  const websocketOpened = computed(() => wsObject.status.value === 'OPEN')

  return {
    showAlert,
    isWebsocket,
    websocketCounter,
    wsObject,
    websocketOpened,
    eventData,
    errorMessage,
    showError
  }
})

export function useRabbitMqEvent() {}

export function useQuartBackend() {}
