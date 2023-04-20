import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueRouter from './router'
import '@/style/app.styl'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(vueRouter)
app.use(pinia)

app.mount('#app')
