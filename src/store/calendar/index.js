import api from "../../http/api"
import { Notification } from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        calendar: [],
    },
    mutations: {
        setCalendar(state, data) {
            state.calendar = data
        },
    },
    actions: {
        // 获取日程(get)
        async getCalendar({ commit }) {
            try {
                let res = await api.calendar()
                if (res.code === 200) {
                    commit("setCalendar", res.data)
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
        // 添加日程(post)
        async addCalendar({ commit }, params) {
            try {
                let res = await api.addCalendar(params)
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
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
        // 删除日程(post)
        async delCalendar({ commit }, id) {
            try {
                let res = await api.delCalendar(id)
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
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
        // 重复上周(post)
        async repeatDynamic({ commit }, currentDay) {
            try {
                let res = await api.repeatDynamic(currentDay)
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
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