import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueRouter from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/normalize.css'
import '@/style/app.styl'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

if (!Array.prototype.at) {
    Array.prototype.at = function (index) {
        if (index >= 0) {
            return this[index]
        } else {
            return this[this.length + index]
        }
    }
}

const app = createApp(App)

const pinia = createPinia()

app.use(vueRouter)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
