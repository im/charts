import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueRouter from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/normalize.css'
import '@/style/app.styl'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(vueRouter)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
