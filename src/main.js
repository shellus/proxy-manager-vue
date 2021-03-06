import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import './bootstrap/http'

Vue.use(ElementUI)

Vue.config.productionTip = false

window.app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
