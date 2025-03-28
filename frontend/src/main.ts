import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import { createHead } from '@unhead/vue/client'
import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

import App from './App.vue'
import installPlugins from './plugins'
import messages from '@intlify/unplugin-vue-i18n/messages'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import './style.css'

const app = createApp(App)

const locale = useStorage('locale', 'fr-FR')
const pinia = createPinia()
const head = createHead()
const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  messages
})

app.use(pinia)
app.use(head)
app.use(i18n)
app.use(installPlugins())
app.component('IconLib', Icon)
app.mount('#app')
