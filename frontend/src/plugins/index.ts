import { useAuthenticatedAxiosClient } from './client'

import type { App } from 'vue'

export * from './client'

export default function installPlugins() {
  return {
    install(app: App) {
      const { authenticatedClient: client } = useAuthenticatedAxiosClient()
      app.config.globalProperties.$djangoClient = client
    }
  }
}
