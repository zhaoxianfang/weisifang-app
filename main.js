import App from './App'

//数据管理中心
import store from './store'
import tui from './common/httpRequest'
import helper from './js_sdk/weisifang/helper'
import ba from './js_sdk/ba'
import baNotify from './js_sdk/weisifang/baNotify'
// API 封装
import api from './api'

// #ifdef H5
window.QQmap = null
// #endif

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.prototype.tui = tui
Vue.prototype.helper = helper
Vue.prototype.ba = ba
Vue.prototype.baNotify = baNotify // ba 本地消息通知
Vue.prototype.$store = store
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
    app.config.globalProperties.tui = tui
    return {
        app
    }
}
// #endif
