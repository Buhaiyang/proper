module.exports = {
  "GET:/auth/login/user": {
    "name": "Serati Ma",
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    "userId": "00000001",
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
    {"id":"pep-workflow","name":"流程设置","route":"workflow","sequenceNumber":0,"icon":"database","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true},
    {"id":"pep-auth","name":"权限管理","route":"auth","sequenceNumber":1,"icon":"lock","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true},
    {"id":"pep-auth-users","name":"用户管理","route":"auth/user","sequenceNumber":0,"icon":"solution","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-functions","name":"功能管理","route":"auth/func","sequenceNumber":1,"icon":"bars","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-roles","name":"角色管理","route":"auth/role","sequenceNumber":2,"icon":"skin","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-user-groups","name":"用户组管理","route":"auth/group","sequenceNumber":3,"icon":"team","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-workflow-designer","name":"流程设计","route":"workflow/designer","sequenceNumber":0,"icon":"share-alt","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-workflow","menuCode":null,"root":false},
    {"id":"pep-hrm", "name": "组织机构","leaf": false,"root": true,"icon": "team","parentId": null,"enable": true,"route": "hrm","sequenceNumber": 1},
    {"id":"pep-hrm-employee","name": "人员管理","parentId": "pep-hrm","leaf": true,"root": false,"enable": true,"icon": "contacts","route": "hrm/employee","sequenceNumber": 2},
    {"id":"pep-hrm-organization","name": "机构管理","parentId": "pep-hrm","leaf": true,"root": false,"enable": true,"icon": "share-alt","route": "hrm/organization","sequenceNumber": 3},
  ],
  "GET:/auth/users": {
    "count":100,
    "data":[
      {"id":"1","username":"denggy","password":"123456","name":"邓广义","email":"1015182620@qq.com","phone":"15904015593","enable":true,"superuser":false,"roleName":"yonghujuese"},
      {"id":"2","username":"zhangjianlin","password":"123456","name":"张建林","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"3","username":"wanghe","password":"123456","name":"王贺","email":"wanghe@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"4","username":"wanghaopeng","password":"123456","name":"王浩鹏","email":"wanghaopeng@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"5","username":"liyiming","password":"123456","name":"李一鸣","email":"liyiming@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"6","username":"wangyi","password":"123456","name":"王怡","email":"wangyi@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"7","username":"wangwei","password":"123456","name":"王维","email":"wangwei@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"8","username":"shihaoyu","password":"123456","name":"时浩宇","email":"shihaoyu@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"9","username":"buhaiyang","password":"123456","name":"步海洋","email":"buhaiyang@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"10","username":"sunshuai","password":"123456","name":"孙帅","email":"sunshuai@qq.com","phone":"15912345678","enable":true,"superuser":false},
      {"id":"11","username":"xuyang","password":"123456","name":"徐洋","email":"xuyang@qq.com","phone":"15912345678","enable":true,"superuser":false}]
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
  'POST:/auth/users/:id/role/:roleId':(req , res)=>{
    res.send('添加成功')
  },
  'DELETE:/auth/users/:id/role/:roleId':(req , res)=>{
    res.send('删除成功')
  },
  'GET:/auth/users/:id/roles':[
    {"id":"1","name":"普通管理员"},
    {"id":"2","name":"住院部功能"},
    {"id":"3","name":"研发部功能"},
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
      "name": "高管用户组",
      "description": "高管角色用户组",
      "seq": 1,
      "enable": true
    },
    {
      "id": "glyjs",
      "name": "管理员用户组",
      "description": "管理员角色用户组",
      "seq": 2,
      "enable": true
    },
    {
      "id": "nqjs",
      "name": "内勤用户组",
      "description": "内勤角色用户组",
      "seq": 3,
      "enable": false
    },
    {
      "id": "oer2",
      "name": "其他用户组",
      "description": "其他角色用户组",
      "seq": 4,
      "enable": false
    },
    {
      "id": "oer1",
      "name": "其他用户组2",
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
  'DELETE:/auth/user-groups':(req , res)=>{
    res.status(528).send('失败');
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
  'POST:/auth/user-groups/:id/user/:userId':(req , res)=>{
    res.send({})
  },
  'DELETE:/auth/user-groups/:id/user/:userId':(req , res)=>{
    res.send({})
  },
  'POST:/auth/user-groups/:id/role/:roleId':(req , res)=>{
    res.send('添加成功')
  },
  'DELETE:/auth/user-groups/:id/role/:roleId':(req , res)=>{
    res.send('删除成功')
  },
  'PUT:/auth/user-groups/:id/users':(req , res)=>{
    res.send({})
  },
  'DELETE:/auth/user-groups/:id/users':(req , res)=>{
    res.send({})
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
  'GET:/auth/roles/:id/menus':[
    {"id": "9901001","icon": "icon","name": "用户管理","route": "","enable": true,"root": false,"leaf": true,"parentId": "99010","menuType": {"code": "1"}},
    {"id": "9901003","icon": "icon","name": "角色管理","route": "","enable": true,"root": false,"leaf": true,"parentId": "99010","menuType": {"code": "1"}},
  ],
  'POST:/auth/roles/:id/menus':(req , res)=>{
    res.send({msg: '添加成功'})
  },
  'DELETE:/auth/roles/:id/menus':(req , res)=>{
    res.send({msg: '删除成功'})
  },
  'GET:/auth/roles/parents':[
    {"id": "1", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "1", "parentName": "父节点1"},
    {"id": "2", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "2", "parentName": "父节点2"},
    {"id": "3", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "3", "parentName": "父节点3"},
    {"id": "4", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "4", "parentName": "父节点4"},
    {"id": "5", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "5", "parentName": "父节点5"},
  ],
  'GET:/auth/roles/:id/parents':[
    {"id": "1", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "1", "parentName": "父节点1"},
    {"id": "2", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "2", "parentName": "父节点2"},
    {"id": "3", "name": "普通管理员", "description": "普通权限管理员", "enable": true, "parentId": "3", "parentName": "父节点3"},
  ],
  'GET:/auth/roles':[
    {
      "id": "1",
      "name": "普通管理员",
      "description": "普通权限管理员",
      "enable": true,
      "parentId": "1",
      "parentName": "普通权限"
    },
    {
      "id": "2",
      "name": "住院部功能",
      "description": "住院部所有功能",
      "enable": false,
      "parentId": "2",
      "parentName": "XX医院功能"
    },
    {
      "id": "3",
      "name": "研发部功能",
      "description": "研发部所有功能",
      "enable": true,
      "parentId": "3",
      "parentName": "普日基本权限功能1"
    },
    {
      "id": "4",
      "name": "开发部功能",
      "description": "开发部所有功能",
      "enable": false,
      "parentId": "4",
      "parentName": "普日基本权限功能2"
    },
  ],
  'POST:/auth/roles':(req , res)=>{
    res.send({})
  },
  'PUT:/auth/roles':(req , res)=>{
    res.send({})
  },
  'DELETE:/auth/roles':{
    type:"ok"
  },
  'GET:/auth/roles/:id':{
    "id": "1",
    "name": "普通管理员",
    "description": "显示角色信息，普通权限管理员",
    "enable": true,
    "parentId": "4",
    "parentName": "普通权限"
  },
  'PUT:/auth/roles/:id':(req , res)=>{
    res.send({})
  },
  'GET:/auth/roles/:id/users':[
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
      "username": "zhangjianlin",
      "pwd": "123456",
      "name": "张建林",
      "email": "zjl@test.com",
      "phone": "13012345678",
      "enable": true,
      "superuser": false,
      "pepDtype": "pepDtype"
    },
    {
      "id": "3",
      "username": "wanghe",
      "pwd": "123456",
      "name": "王贺",
      "email": "wh@test.com",
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
    }
  ],
  'GET:/auth/roles/:id/user-groups':[
    {"id":"ggjs","name":"高管用户组"},
  ],
  'POST:/auth/menus':{
    "id": "9",
    enable: true,
    menuType: {code: 1}
  },
  'PUT:/auth/menus/:id':{
    "id": "9",
    enable: true,
    menuType: {code: 1}
  },
  'GET:/auth/menus/:id':{
    "id": "pep-auth-users",
    "icon": "icon",
    "name": "用户管理",
    "route": "user",
    "enable": true,
    "root": false,
    "leaf": true,
    "parentId": "pep-auth",
    "sequenceNumber": "3",
    "menuType": {"code": "1"}
  },
  'GET:/auth/menus/parents':[
    {"id":"pep-workflow","name":"流程设置","route":"workflow","sequenceNumber":0,"icon":"database","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true},
    {"id":"pep-auth","name":"权限管理","route":"auth","sequenceNumber":1,"icon":"lock","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true}
  ],
  'DELETE:/auth/menus':{
    type:"ok"
  },
  'GET:/auth/menus/:id/resources':[
    {
      id:'1',
      name:'新建',
      identifier:'add',
      enable:true,
    },
    {
      id:'2',
      name:'编辑',
      identifier:'edit',
      enable:true,
    },
    {
      id:'3',
      name:'删除',
      identifier:'delete',
      enable:true,
    }
  ],
  'POST:/auth/menus/:id/resources': {
      id:'4',
      name:'其他',
      identifier:'save',
      enable:true,
  },
  'PUT:/auth/resources/:id':    {
      id:'1',
      name:'新建',
      identifier:'add',
      enable:true,
  },
  'DELETE:/auth/resources/:id':{type:'ok'}
}
