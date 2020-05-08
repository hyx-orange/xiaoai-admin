import service from './index'

export default {
    // 用户模块
    // 用户
    // 用户注册  username, password, phone, code, captcha,email,
    register(params) {
        return service.post('/users/register', params)
    },
    // 获取图形验证码
    getCaptcha() {
        return service.get('/users/captcha')
    },
    // 发送验证码
    sendCode(phone) {
        return service.post('/users/sendMsg', { phone })
    },
    //  短信登录  手机号登录
    phoneLogin({ phone, code, captcha }) {
        return service.post('/users/phoneLogin', { phone, code, captcha })
    },
    // 修改用户信息
    userUpdate(params) {
        return service.post('/users/update', params)
    },
    // 用户登录 username为用户名或手机号或邮箱
    login({ username, password, code }) {
        return service.post('/users/login', { username, password, code })
    },
    // 修改头像  /users/upload
    upload(params) {
        return service.post('/users/upload', params)
    },
    //修改密码
    updateCPass({ id, password, newpass }) {
        return service.post('/users/updatePass', { id, password, newpass })
    },
    // 找回密码
    forget({ username, email }) {
        return service.post('/users/findPwd', { username, email })
    },
    // 获取用户信息
    queryUser(id) {
        return service.post('api/users/queryUser', id)
    },
    // github登录
    github() {
        return service.get('api/users/github')
    },
    githubs(code, state) {
        return service.get(`api/users/logins?code=${code}&state=${state}`)
    },
    //  退出登录
    logout() {
        return service.get('/users/logout')
    },
    // 获取用户列表
    userList({ pageSize = 10, pageNumber = 1, keywords = '', state = 1, }) {
        return service.get(`api/users/list?pageSize=${pageSize}&pageNumber=${pageNumber}&keywords=${keywords}&state=${state}`)
    },
}