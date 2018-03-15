module.exports = {
  "GET:/currentUser": {
    "name": "Serati Ma",
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    "userid": "00000001",
    "notifyCount": 12
  },
  "POST:/auth/login": (req, res)=>{
    const { pwd, username } = req.body;
    if(pwd === '123456' && username === 'admin'){
      res.send('husrhtluihetioyhoihl');
    }else {
      res.send('');
    }
  },
  "GET:/auth/menus":[
    // {
    //   "id": "9901",
    //   "name": "dashboard",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "dashboard",
    //   "parentId": null,
    //   "route": "dashboard",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990101",
    //   "name": "分析页",
    //   "parentId": "9901",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "analysis",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990102",
    //   "name": "监控页",
    //   "parentId": "9901",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "monitor",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990103",
    //   "name": "工作台",
    //   "parentId": "9901",
    //   "leaf": true,
    //   "icon": "",
    //   "route": "workplace",
    //   "sequenceNumber": 3
    // },
    // {
    //   "id": "9902",
    //   "name": "表单页",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "form",
    //   "parentId": null,
    //   "route": "forms",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990201",
    //   "name": "基础表单",
    //   "parentId": "9902",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "basic-form",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990202",
    //   "name": "分步表单",
    //   "parentId": "9902",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "step-form",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990203",
    //   "name": "高级表单",
    //   "parentId": "9902",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "advanced-form",
    //   "sequenceNumber": 3
    // },
    // {
    //   "id": "9903",
    //   "name": "列表页",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "table",
    //   "parentId": null,
    //   "route": "list",
    //   "sequenceNumber": 3
    // },
    // {
    //   "id": "990301",
    //   "name": "查询表格",
    //   "parentId": "9903",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "table-list",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990302",
    //   "name": "标准列表",
    //   "parentId": "9903",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "basic-list",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990303",
    //   "name": "卡片列表",
    //   "parentId": "9903",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "card-list",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990304",
    //   "name": "搜索列表",
    //   "parentId": "9903",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "search-list",
    //   "subRoute":true,
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "99030401",
    //   "name": "搜索列表（文章）",
    //   "parentId": "990304",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "articles",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "99030402",
    //   "name": "搜索列表（项目）",
    //   "parentId": "990304",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "projects",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "99030403",
    //   "name": "搜索列表（应用）",
    //   "parentId": "990304",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "applications",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "9904",
    //   "name": "结果页",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "check-circle-o",
    //   "parentId": null,
    //   "route": "result",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990401",
    //   "name": "成功",
    //   "parentId": "9904",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "success",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990402",
    //   "name": "失败",
    //   "parentId": "9904",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "error",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "9905",
    //   "name": "异常页",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "warning",
    //   "parentId": null,
    //   "route": "exception",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990501",
    //   "name": "403",
    //   "parentId": "9905",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "403",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990502",
    //   "name": "404",
    //   "parentId": "9905",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "404",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990503",
    //   "name": "500",
    //   "parentId": "9905",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "500",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990504",
    //   "name": "触发异常",
    //   "parentId": "9905",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "trigger-exception",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "9906",
    //   "name": "账户",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "user",
    //   "parentId": null,
    //   "route": "base",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990601",
    //   "name": "登录",
    //   "parentId": "9906",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "login",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990602",
    //   "name": "注册",
    //   "parentId": "9906",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "register",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "990603",
    //   "name": "注册结果",
    //   "parentId": "9906",
    //   "leaf": true,
    //   "root": false,
    //   "icon": "",
    //   "route": "register-result",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "9908",
    //   "name": "详情页",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "profile",
    //   "parentId": null,
    //   "route": "profile",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990801",
    //   "name": "基础详情页",
    //   "leaf": true,
    //   "root": false,
    //   "parentId": "9908",
    //   "route": "basic-profile",
    //   "sequenceNumber": 1
    // },
    // {
    //   "id": "990802",
    //   "name": "高级详情页",
    //   "leaf": true,
    //   "root": false,
    //   "parentId": "9908",
    //   "route": "advanced-profile",
    //   "sequenceNumber": 2
    // },
    // {
    //   "id": "9909",
    //   "name": "使用文档",
    //   "leaf": false,
    //   "root": true,
    //   "icon": "book",
    //   "parentId": null,
    //   "hideInMenu": true,
    //   "route": "http://pro.ant.design/docs/getting-started",
    //   "sequenceNumber": 1
    // },
    {
      "id": "99010",
      "name": "权限",
      "leaf": false,
      "root": true,
      "icon": "lock",
      "parentId": null,
      "route": "auth",
      "sequenceNumber": 1
    },
    {
      "id": "9901001",
      "name": "用户权限",
      "parentId": "99010",
      "leaf": true,
      "root": false,
      "icon": "",
      "route": "user",
      "sequenceNumber": 2
    },
    {
      "id": "9901002",
      "name": "用户组权限",
      "parentId": "99010",
      "leaf": true,
      "root": false,
      "icon": "",
      "route": "group",
      "sequenceNumber": 2
    },
    {
      "id": "99011",
      "name": "流程设置",
      "leaf": false,
      "root": true,
      "icon": "database",
      "parentId": null,
      "route": "workflow",
      "sequenceNumber": 1
    },
    {
      "id": "9901101",
      "name": "流程设计器",
      "parentId": "99011",
      "leaf": true,
      "root": false,
      "icon": "",
      "route": "designer",
      "sequenceNumber": 2
    },
  ],
  "GET:/auth/users": {
    "count":100,
    "data":[
      {"id":"1","username":"denggy","password":"123456","name":"7954","email":"1015182620@qq.com","phone":"15904015593","enable":true,"superuser":false},{"id":"2","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"3","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"4","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"5","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"6","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"7","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"8","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"9","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"10","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},{"id":"11","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false}]
  },
  'GET:/auth/users/:id':{
    "id": "2",
    "username": "zhangjianlin",
    "password": "123456",
    "name": "66666",
    "email": "276595311@qq.com",
    "phone": "15912345678",
    "enable": true,
    "superuser": false
  },
  'GET:/auth/users/:id/roles':[
    {"id":"ggjs","name":"高管角色"},
    {"id":"nqjs","name":"内勤角色"},
    {"id":"glyjs","name":"管理员角色"},
  ],
  'GET:/auth/roles':[
    {"id":"ggjs","name":"高管角色"},
    {"id":"nqjs","name":"内勤角色"},
    {"id":"glyjs","name":"管理员角色"},
    {"id":"oer2","name":"其他角色"},
    {"id":"oer1","name":"其他角色2"},
  ],
  'GET:/auth/users/:id/user-groups':[
    {"id":"ggjs","name":"高管用户"},
  ],
  'PUT:/auth/users/:id': (req , res)=>{
    res.send({
      "id": "2",
      "username": "limiao",
      "password": "123456",
      "name": "7777",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    });
  },
  'POST:/auth/users':(req , res)=>{
    res.send({
      "id": "9",
      "username": "laolaolao",
      "password": "123456",
      "name": "laolaolao",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    })
  },
  'DELETE:/auth/users':{
    type:"ok"
  },
  'GET:/auth/user-groups':[
    {
      "id": "ggjs",
      "name": "高管用户",
      "description": "高管角色用户组",
      "seq": 1,
      "enable": true
    },
    {
      "id": "glyjs",
      "name": "管理员用户",
      "description": "管理员角色用户组",
      "seq": 2,
      "enable": true
    },
    {
      "id": "nqjs",
      "name": "内勤用户",
      "description": "内勤角色用户组",
      "seq": 3,
      "enable": false
    },
    {
      "id": "oer2",
      "name": "其他用户",
      "description": "其他角色用户组",
      "seq": 4,
      "enable": false
    },
    {
      "id": "oer1",
      "name": "其他用户2",
      "description": "其他角色2用户组",
      "seq": 5,
      "enable": false
    }
  ],
  'GET:/auth/user-groups/:id':{
    "id": "ggjs",
    "name": "高管角色",
    "description": "高管角色用户组",
    "seq": 1,
    "enable": true
  },
  'GET:/auth/user-groups/:id/users':[
    {
      "id": "1",
      "username": "denggy",
      "pwd": "123456",
      "name": "邓广义",
      "email": "denggy@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    },
    {
      "id": "2",
      "username": "cbj",
      "pwd": "123456",
      "name": "陈冰洁",
      "email": "cbj@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    },
    {
      "id": "3",
      "username": "lym",
      "pwd": "123456",
      "name": "李一鸣",
      "email": "lym@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    },
    {
      "id": "4",
      "username": "whp",
      "pwd": "123456",
      "name": "王浩鹏",
      "email": "whp@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    },
    {
      "id": "5",
      "username": "wh",
      "pwd": "123456",
      "name": "王贺",
      "email": "wh@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    }
  ],
  'PUT:/auth/user-groups':(req , res)=>{
    res.send({
      "id": "ggjs",
      "name": "高管角色",
      "description": "高管角色用户组",
      "seq": 1,
      "enable": false
    });
  },
  'DELETE:/auth/user-groups':{
    type:"ok"
  },
  'DELETE:/auth/user-groups/:id':{
    type:"ok"
  },
  'PUT:/auth/user-groups/:id':(req , res)=>{
    res.send({
      "id": "ggjs",
      "name": "高管角色",
      "description": "测试角色用户组",
      "seq": 1,
      "enable": false
    });
  },
  'POST:/auth/user-groups':(req , res)=>{
    res.send({
      "id": "ceshi",
      "name": "测试角色",
      "description": "新的高管角色用户组",
      "seq": 1,
      "enable": false
    })
  },
}
