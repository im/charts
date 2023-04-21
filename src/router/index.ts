import { createRouter, createWebHashHistory } from 'vue-router'

// import routes from '~pages'

import Home from '@/components/pages/home'

const routes = [
    { path: '/', component: Home }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router