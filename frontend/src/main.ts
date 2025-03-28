import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'

import App from './App.vue'
import installPlugins from './plugins'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import './style.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(installPlugins())
app.component('IconLib', Icon)
app.mount('#app')
