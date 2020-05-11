import api from "../../http/api"
import { Notification } from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        mailList: [],
        treeData: [],
    },
    mutations: {
        setMailList(state, data) {
            state.mailList = data
        },
        setTreeData(state, data) {
            state.treeData = data
        },
    },
    actions: {
        // 获取通讯录(get)
        async getMailList({ commit }) {
            try {
                let res = await api.getMailList()
                if (res.code === 200) {
                    commit("setMailList", res.data)
                    return true
                } else {
                    if (res.code === 500) {
                        commit("setMailList", [])
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
        // 获取通讯录部门(get)
        async getTreeData({ commit }) {
            try {
                let res = await api.getTreeData()
                if (res.code === 200) {
                    Notification({
                        title: res.msg,
                        type: 'success'
                    });
                    commit("setTreeData", res.data.data)
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