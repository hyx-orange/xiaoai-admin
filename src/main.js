import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
import i18n from './lang/index'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';
import echarts from 'echarts'
import VCharts from 'v-charts'




Vue.use(IntroJs);
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')