import { Icon } from '@iconify/vue'
import messages from '@intlify/unplugin-vue-i18n/messages'
import * as Sentry from '@sentry/vue'
import { createHead } from '@unhead/vue/client'
import { useStorage } from '@vueuse/core'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config' // Optional: Volt
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
// import { createVueAxiosManager } from 'vue-axios-manager'

import './style.css'

const app = createApp(App)

const locale = useStorage('locale', 'fr-FR')

const head = createHead({
  init: [
    {
      title: '...',
      titleTemplate: '%s | Vite',
      htmlAttrs: { lang: 'fr' }
    }
  ]
})

const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  messages
})

// const axiosManager = createVueAxiosManager({
//   disableAuth: true,
//   endpoints: [
//     {
//       name: 'quart',
//       dev: '127.0.0.1:5000',
//       label: 'Quart Backend',
//     }
//   ]
// })

Sentry.init({
  app,
  dsn: 'https://0d7b530ddb3190e1554ef2a5775f7889@o307076.ingest.us.sentry.io/4509289181544448',
  sendDefaultPii: true
})

app.use(createPinia())
app.use(head)
app.use(i18n)
// app.use(axiosManager)
app.use(PrimeVue, { unstyled: true }) // Optional: Volt
app.use(router)

app.component('VueIcon', Icon)

app.mount('#app')
