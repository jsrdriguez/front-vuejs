import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory();

const routes = [
    { path: '/', name: "home", component: () => import('@/pages/Home.vue') },
    { path: '/cart',  name: "cart", component: () => import('@/pages/Cart.vue') },
]

export default createRouter({
    history,
    routes, 
});