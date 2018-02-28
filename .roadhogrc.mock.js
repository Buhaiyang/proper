import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/searchData':[
    {
      "column": "username",
      "content": "张三",
      "desc": "姓名"
    },
    {
      "column": "address",
      "content": "张江软件园",
      "desc": "地址"
    },
    {
      "column": "content",
      "content": "张王李赵周孙",
      "desc": "说明"
    },
    {
      "column": "username",
      "content": "李小明",
      "desc": "姓名"
    },
    {
      "column": "auditor",
      "content": "李小明",
      "desc": "评审人"
    },
    {
      "column": "desc",
      "content": "李小明",
      "desc": "描述"
    },
    { "column" : "age", "content" : "21", "table" : "demo_user", "desc" : "joshua1" },
    { "column" : "create_time", "content" : "2018-01-01", "table" : "demo_user", "desc" : 21 },
    { "column" : "user_id", "content" : "2", "table" : "demo_user", "desc" : "2018-01-02" }
  ],

  'GET /api/currentMenus': [{
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [{
        name: '分析页',
        path: 'analysis',
      }, {
        name: '监控页',
        path: 'monitor',
      }, {
        name: '工作台',
        path: 'workplace',
      }],
    }, {
      name: '表单页',
      icon: 'form',
      path: 'forms',
      children: [{
        name: '基础表单',
        path: 'basic-form',
      }, {
        name: '分步表单',
        path: 'step-form',
      }, {
        name: '高级表单',
        path: 'advanced-form',
      }],
    }, {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [{
        name: '查询表格',
        path: 'table-list',
      }, {
        name: '标准列表',
        path: 'basic-list',
      }, {
        name: '卡片列表',
        path: 'card-list',
      }, {
        name: '搜索列表',
        path: 'search-list',
        children: [{
          name: '搜索列表（文章）',
          path: 'articles',
        }, {
          name: '搜索列表（项目）',
          path: 'projects',
        }, {
          name: '搜索列表（应用）',
          path: 'applications',
        }],
        subRoute:true
      }],
    }, {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [{
        name: '基础详情页',
        path: 'basic-profile',
      }, {
        name: '高级详情页',
        path: 'advanced-profile',
      }],
    }, {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [{
        name: '成功',
        path: 'success',
      }, {
        name: '失败',
        path: 'error',
      }],
    }, {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [{
        name: '403',
        path: '403',
      }, {
        name: '404',
        path: '404',
      }, {
        name: '500',
        path: '500',
      }, {
        name: '触发异常',
        path: 'trigger-exception',
      }],
    }, {
      name: '账户',
      icon: 'user',
      path: 'user',
      children: [{
        name: '登录',
        path: 'login',
      }, {
        name: '注册',
        path: 'register',
      }, {
        name: '注册结果',
        path: 'register-result',
      }],
    }, {
      name: '一个例子',
      icon: 'book',
      path: 'demo',
      children: [{
        name: '例子',
        path: 'demo',
      }]
    }, {
      name: '高级查询',
      icon: 'book',
      path: 'menu',
    }, {
    name: '使用文档',
    icon: 'book',
    hideInMenu:true,
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank'
  },{
    name:'权限',
    icon:'book',
    path:'auth',
    children: [{
      name: '用户',
      path: 'user',
    }]
  }],
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if(password === '888888' && userName === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return ;
    }
    if(password === '123456' && userName === 'user'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/back/(.*)':'http://192.168.1.196:8090/back/',
  'GET /api/auth/users':{
    "count": 100,
    "data":[{
      "id": "1",
        //{ "type": "string", "description": "用户ID" },
      "username": "denggy",
        // { "type": "string", "description": "用户名" },
      "password": "123456",
        // { "type": "string", "description": "密码" },
      "name": "7954",
        //{ "type": "string", "description": "显示名" },
      "email": "1015182620@qq.com",
        //{ "type": "string", "description": "邮箱" },
      "phone": "15904015593",
        //{ "type": "string", "description": "手机号" },
      "enable": true,
        //{ "type": "boolean", "description": "状态" },
      "superuser": false,
        //{ "type": "boolean", "description": "是否为超级用户" },
    },{
      "id": "2",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "3",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "4",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "5",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "6",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "7",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "8",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "9",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "10",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    },{
      "id": "11",
      "username": "zhangjianlin",
      "password": "123456",
      "name": "66666",
      "email": "276595311@qq.com",
      "phone": "15912345678",
      "enable": true,
      "superuser": false
    }]
  },
  'GET /api/auth/users/:id':{
    "id": "2",
    "username": "zhangjianlin",
    "password": "123456",
    "name": "66666",
    "email": "276595311@qq.com",
    "phone": "15912345678",
    "enable": true,
    "superuser": false
  },
  'PUT /api/auth/users/:id': (req , res)=>{
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
  'POST /api/auth/users':(req , res)=>{
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
  'DELETE /api/auth/users':'',
  'GET /api/auth/users/:id/roles':[
    {"id":"ggjs","name":"高管角色"},
    {"id":"nqjs","name":"内勤角色"},
    {"id":"glyjs","name":"管理员角色"},
  ],
  'GET /api/auth/roles':[
    {"id":"ggjs","name":"高管角色"},
    {"id":"nqjs","name":"内勤角色"},
    {"id":"glyjs","name":"管理员角色"},
    {"id":"oer2","name":"其他角色"},
    {"id":"oer1","name":"其他角色2"},
  ],
  'GET /api/auth/users/:id/user-groups':[
    {"id":"ggyh","name":"高管用户"},
  ],
  'GET /api/auth/user-groups':[
    {"id":"ggyh","name":"高管用户"},
    {"id":"nqyh","name":"内勤用户"},
    {"id":"glyyh","name":"管理员用户"},
  ],
};

// export default noProxy ? {} : delay(proxy, 0);
const proxyServer = 'http://localhost:8080';

export default noProxy ? {"/*": proxyServer} : delay(proxy, 500);
