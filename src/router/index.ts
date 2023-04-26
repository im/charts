import { createRouter, createWebHashHistory } from 'vue-router'

// import routes from '~pages'

const routes = [
    { name: 'home', path: '/:type?/:id?', component: () => import('@/components/pages/home') },
    { name: 'chart', path: '/chart/:id', component: () => import('@/components/pages/chart') }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router