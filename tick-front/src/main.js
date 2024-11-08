import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(Notifications);
app.mount('#app')
