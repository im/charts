import { createRouter, createWebHashHistory } from 'vue-router'
import Home from 'components/views/home.vue'
import routes from '~pages'
console.log('routes: ', routes)

// const routes = [
//     { path: '/home', component: Home },
// ]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router