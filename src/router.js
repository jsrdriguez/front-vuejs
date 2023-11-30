import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory();

const routes = [
    { path: '/', component: () => import('@/pages/Home.vue') },
    { path: '/cart', component: () => import('@/pages/Cart.vue') },
]

export default createRouter({
    history,
    routes, 
});