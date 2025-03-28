import { App } from 'vue'

import axios from 'axios'

const client = axios.create({
  baseURL: 'http://api.johnpm.fr/quart/api/v1/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000
})

const djangoClient = axios.create({
  baseURL: 'http://app.johnpm.fr/api/v1/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000
})

export default function installPlugins() {
  return {
    install(app: App) {
      app.config.globalProperties.$client = client
      app.config.globalProperties.$django_client = djangoClient
    }
  }
}
