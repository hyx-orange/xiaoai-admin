import api from "../../http/api"
import { Notification } from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        offer: [],
        user: [],
        pay: [],
    },
    mutations: {
        setOffer(state, data) {
            state.offer = data
        },
        setUser(state, data) {
            state.user = data
        },
        setPay(state, data) {
            state.pay = data
        },
    },
    actions: {
        // offer状态(get)
        async getOffer({ commit }) {
            try {
                let res = await api.getOffer()
                if (res.code === 200) {
                    commit("setOffer", res.data)
                    return true
                } else {
                    if (res.code === 500) {
                        commit("setOffer", [])
                    }
                    Notification({
                        title: res.msg,
                        type: 'warning'
                    });
                    return false
                }
            } catch (err) {
                return false
            }
        },
        // 获取员工信息(get)
        async getUserInfo({ commit }) {
            try {
                let res = await api.getUserInfo()
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
                    commit("setUser", res.data)
                    return true
                } else {
                    Notification({
                        title: res.msg,
                        type: 'warning'
                    });
                    return false
                }
            } catch (err) {
                return false
            }
        },
        // 获取员工信息(get)
        async getPay({ commit }) {
            try {
                let res = await api.getPay()
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
                    commit("setPay", res.data)
                    return true
                } else {
                    Notification({
                        title: res.msg,
                        type: 'warning'
                    });
                    return false
                }
            } catch (err) {
                return false
            }
        },
    }

}