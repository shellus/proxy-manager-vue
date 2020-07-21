import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {title: '首页'},
        component: Home,
    },
    {
        path: '/certificate/certificate/index',
        name: 'CertificateIndex',
        meta: {title: '证书管理'},
        component: () => import('@/views/certificate/CertificateIndex.vue')
    },
    {
        path: '/certificate/certificate-config/index',
        name: 'CertificateConfigIndex',
        meta: {title: '证书签发配置'},
        component: () => import('@/views/certificate/CertificateConfigIndex.vue')
    },
    {
        path: '/proxy/host/index',
        name: 'ProxyHostIndex',
        meta: {title: '代理列表'},
        component: () => import('@/views/proxy/ProxyHostIndex.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
