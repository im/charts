import { createRouter, createWebHashHistory } from 'vue-router'

// import routes from '~pages'

import Home from '@/components/pages/home'

console.log('==router===')

const routes = [
    { name: 'home', path: '/:type?/:id?', component: () => import('@/components/pages/home') }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router