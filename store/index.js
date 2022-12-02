import fetch from '../common/httpRequest'
import user from './modules/user'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    }
})

export default store
