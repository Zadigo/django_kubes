import { App } from 'vue'
import { useAuthenticatedAxiosClient } from './client'

export * from './client'
export * from './VueAnalytics'

import { createAnalytics } from './VueAnalytics'

export default function installPlugins() {
  return {
    install(app: App) {
      const { authenticatedClient: client } = useAuthenticatedAxiosClient()
      app.config.globalProperties.$djangoClient = client

      const plugin = createAnalytics({
        id: 'G-123',
        tags: [
          {
            id: 'G-234',
            config: {
              currency: 'EUR'
            }
          }
        ]
      })

      app.use(plugin)
    }
  }
}
