module.exports = {
  'DELETE:/hr/employee':(req , res)=>{
    res.send('删除成功')
  },
  'POST:/hr/employee/user':(req , res)=>{
    res.send('人员添加到用户成功')
  },
  'GET:/hr/employee/:id': {
    "id": "id_1000",
    "name": "马化腾",
    "sex": "0",
    "number": "00093",
    "birthday": "1982-06-27",
    "idcard": "100010190003140649",
    "phone": "13412578901",
    "phone1": "15123457806",
    "telephone": "024-31353260",
    "telephone1": "024-67893234",
    "fax": "024-12345678",
    "email": "123456@qq.com",
    "organizationId": "1",
    "description": "腾讯boss"
  },
  'GET:/hr/orginization': [
    {
      "parentId": null,
      "parentName": null,
      "id": "1",
      "name": "普日软件",
      "alias": "cpyf",
      "number": "001",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是沈阳普日软件公司"
    },
    {
      "parentId": "1",
      "parentName": "普日软件",
      "id": "101",
      "name": "产品研发",
      "alias": "cpyf",
      "number": "001",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是产品研发部门"
    },
    {
      "parentId": "101",
      "parentName": "产品研发",
      "id": "10101",
      "name": "前端开发",
      "alias": "qdkf",
      "number": "001",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是产品研发部门的前端开发部门"
    },
    {
      "parentId": "101",
      "parentName": "产品研发",
      "id": "10102",
      "name": "java开发",
      "alias": "qdkf",
      "number": "002",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是产品研发部门的java开发部门"
    },
    {
      "parentId": "1",
      "parentName": "普日软件",
      "id": "201",
      "name": "测试项目组",
      "alias": "cs",
      "number": "002",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是测试项目组"
    },
    {
      "parentId": "1",
      "parentName": "普日软件",
      "id": "301",
      "name": "开发项目组",
      "alias": "kf",
      "number": "003",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是开发项目组"
    },
    {
      "parentId": "301",
      "parentName": "普日软件",
      "id": "30101",
      "name": "开发项目组1",
      "alias": "kf1",
      "number": "001",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是开发项目组1"
    },
    {
      "parentId": "301",
      "parentName": "普日软件",
      "id": "30102",
      "name": "开发项目组2",
      "alias": "kf2",
      "number": "001",
      "address": "沈阳铁西区兴隆大都会21层",
      "phone": "13412578901",
      "fax": "024-31353260",
      "description": "这是开发项目组2"
    },
  ],
  'POST:/hr/employee':(req , res)=>{
    res.send('创建成功')
  },
  'PUT:/hr/employee/:id':(req , res)=>{
    res.send('更新成功')
  },
}