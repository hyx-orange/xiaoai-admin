import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
import other from "./other"
import calendar from "./calendar"

Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
        },
    },
    actions: {},
    modules: {
        user,
        other,
        calendar
    }
})