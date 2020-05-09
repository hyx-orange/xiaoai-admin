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
    phoneLogin({ phone, code }) {
        return service.post('/users/phoneLogin', { phone, code })
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
        return service.post('/upload/image', params)
    },
    //修改密码
    updatePwd({ id, username, password, newPwd }) {
        return service.post('/users/updatePwd', { id, username, password, newPwd })
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
    // 获取菜单(get)
    menus() {
        return service.get('/users/menus')
    },

    // 日程

    // 获取日程(get)
    calendar() {
        return service.get('/calendar')
    },
    // 添加日程(post)
    //     users: 参与人(数组)
    // startTime: 开始时间(date类型)
    // endTime: 结束时间(date类型)
    // schedule: 日程内容
    // currentDay: 当前日期(string类型)
    addCalendar(params) {
        return service.post('/calendar', params)
    },
    // 删除日程(post)
    delCalendar(id) {
        return service.post('/delCalendar', id)
    },
    // 重复上周(post)
    // currentDay: 当前日期
    repeatDynamic(currentDay) {
        return service.post('/repeatDynamic', currentDay)
    },
    // 上传图片(post)
    // file: 图片
    uploadImage(file) {
        return service.post('/upload/image', file)
    },

    // 动态
    // 发布动态(post)
    //     username: 发布人
    // date: 发布时间
    // dynamic: 动态内容
    // classification: 动态类型
    // reportUsers: 汇报人(可选)
    addDynamic(params) {
        return service.post('/addDynamic', params)
    },
    // 获取动态(get)
    getDynamic() {
        return service.get('/getDynamic')
    },


    // 首页进度条数据(get)
    progress() {
        return service.get('/progress')
    },
    // 首页利润(get)
    cityValue() {
        return service.get('/cityValue')
    },
    // 动态汇报人(get)
    report() {
        return service.get('/report')
    },
    // 网站调查(get)
    question() {
        return service.get('/question')
    },
    // 通讯录(get) 
    getMailList() {
        return service.get('/getMailList')
    },
    // 通讯录部门(get)
    getTreeData() {
        return service.get('/getTreeData')
    },
    // offer状态(get)
    getOffer() {
        return service.get('/getOffer')
    },
    // 获取员工信息(get)
    userInfo() {
        return service.get('/userInfo')
    },
    // 薪酬信息(get)
    pay() {
        return service.get('/pay')
    },

}