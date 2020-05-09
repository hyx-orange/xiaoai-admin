let menus = [
  {
    name: '首页',
    icon: 'home',
    url: '/home',
    enName: 'dashboard',
    children: []
  },
  {
    name: '日程管理',
    icon: 'credit-card',
    url: '/calendar',
    enName: 'calendar',
    children: []
  },
  {
    name: '通讯录',
    icon: 'profile',
    url: '/maillist',
    enName: 'mailList',
    children: []
  },
  {
    name: '组织员工',
    icon: 'user',
    url: '/organization',
    enName: 'organize',
    children: [
      {
        name: 'offer管理',
        icon: 'diff',
        url: '/organization/offer',
        enName: 'offer',
      },
      {
        name: '人员信息',
        icon: 'audit',
        url: '/organization/userInfo',
        enName: 'userInfo',
      },
      {
        name: '薪酬管理',
        icon: 'money-collect',
        enName: 'payMent',
        url: '/organization/pay',
      }
    ]
  },
  {
    name: '表单页',
    icon: 'form',
    url: '/form',
    enName: 'form',
    children: [
      {
        name: '分步表单',
        icon: 'file-done',
        enName: 'stepForm',
        url: '/form/stepForm',
      }
    ]
  },
]

module.exports = menus