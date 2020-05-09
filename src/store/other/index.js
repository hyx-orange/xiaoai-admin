import api from "../../http/api"
import { Notification } from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        menus: [],
        cityValue: [],
        progress: [],
        report: [],
        question: [],
        dynamic: [],
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setCityValue(state, data) {
            state.cityValue = data
        },
        setProgress(state, data) {
            state.progress = data
        },
        setReport(state, data) {
            state.report = data
        },
        setQuestion(state, data) {
            state.question = data
        },
        setDynamic(state, data) {
            state.dynamic = data
        },
    },
    actions: {
        // 获取菜单(get)
        async getMenus({ commit }) {
            try {
                let res = await api.menus()
                if (res.code === 200) {
                    commit("setMenus", res.data)
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
        // 首页利润
        async getCityValue({ commit }) {
            try {
                let res = await api.cityValue()
                if (res.code === 200) {
                    commit("setCityValue", res.data)
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
        // 首页进度条数据
        async getProgress({ commit }) {
            try {
                let res = await api.progress()
                if (res.code === 200) {
                    commit("setProgress", res.data)
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
        // 动态汇报人
        async getReport({ commit }) {
            try {
                let res = await api.report()
                if (res.code === 200) {
                    commit("setReport", res.data)
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
        // 发布动态
        async addDynamic({ commit }, params) {
            try {
                let res = await api.addDynamic(params)
                if (res.code === 200) {
                    commit("setReport", res.data)
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
        // 获取动态(get)
        async getDynamic({ commit }) {
            try {
                let res = await api.getDynamic()
                if (res.code === 200) {
                    commit("setDynamic", res.data)
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
        // 网站调查
        async getQuestion({ commit }) {
            try {
                let res = await api.question()
                if (res.code === 200) {
                    commit("setQuestion", res.data)
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