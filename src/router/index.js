import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
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
                path: '/phoneLogin',
                name: "phoneLogin",
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/login/PhoneLogin.vue'),
                meta: {
                    title: '手机号登录'
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
    else
        adminToken ? next() : next('/login')


})

export default router