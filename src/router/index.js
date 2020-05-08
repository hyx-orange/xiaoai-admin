import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        // 重定向
        redirect: '/'
    },
    {
        path: "/",
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/Comm'),
        children: [{
                path: '/',
                name: "home",
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/calendar',
                name: "calendar",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/calendar/Calendar'),
                meta: {
                    title: '日程管理'
                }
            },
            {
                path: '/mailList',
                name: "mailList",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/mailList/MailList'),
                meta: {
                    title: '通讯录'
                }
            },
            {
                path: '/organization/offer',
                name: "offer",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/organization/Offer'),
                meta: {
                    title: 'offer管理'
                }
            },
            {
                path: '/organization/userInfo',
                name: "userInfo",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/organization/UserInfo'),
                meta: {
                    title: '人员信息'
                }
            },
            {
                path: '/organization/pay',
                name: "pay",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/organization/Pay'),
                meta: {
                    title: '薪酬管理'
                }
            },
            {
                path: '/form/stepForm',
                name: "stepForm",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/form/StepForm'),
                meta: {
                    title: '分步表单'
                }
            },
        ],
    },
    {
        path: "/",
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/LoginComm'),
        children: [{
                path: '/login',
                name: "login",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/login/Login.vue'),
                meta: {
                    title: '登录',

                }
            },
            {
                path: '/findPwd',
                name: "findPwd",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/login/FindPwd'),
                meta: {
                    title: '找回密码'
                }
            }, {
                path: '/register',
                name: "register",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/login/Register.vue'),
                meta: {
                    title: '注册'
                }
            }
        ],
    },
    {
        path: '/lockView',
        name: 'lockView',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/LockView'),
        meta: {
            title: '锁屏中'
        },
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    let adminToken = localStorage.getItem('adminToken')
    if (to.path === '/login' || to.path === '/register' || to.path === '/phoneLogin')
        next()
    else {
        if (adminToken) {
            let isLock = sessionStorage.getItem('isLock')
            if (to.path === '/lockView')
                next()
            else
                isLock != 0 ? next() : next('/lockView')
        } else {
            next('/login')
        }
    }



})

export default router