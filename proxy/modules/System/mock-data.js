module.exports = {
  "POST:/system/config":(req , res)=>{
    res.status(200).send('');
  },
  "PUT:/system/config":(req , res)=>{
    res.status(200).send('');
  },
  "DELETE:/system/config":(req , res)=>{
    res.status(200).send('');
  },
  "PUT:/sys/datadic/:id": (req, res) => {
    res.status(200).send('编辑成功')
  },
  "POST:/sys/datadic": (req, res) => {
    res.status(200).send('创建成功')
  },
  "DELETE:/sys/datadic": (req, res) => {
    // res.setHeader('X-PEP-ERR-TYPE', 'PEP_BIZ_ERR');
    // res.status(500).send('失败');
    res.status(200).send('创建成功')
  },
  "GET:/sys/datadic/id/:id": {
    "id": "23",
    "catalog": "sex",
    "code": "1",
    "name": "男",
    "order": 1,
    "isDefault": true,
    "dataDicType": "BUSINESS"
  },
  "GET:/sys/datadic/":{
    "count": 11,
    "data": [
      {
        "id": "001",
        "catalog": "sex",
        "code": "1",
        "name": "女",
        "order": 1,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "002",
        "catalog": "sex",
        "code": "1",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      },
      {
        "id": "003",
        "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 0,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "004",
        "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      },
      {
        "id": "005",
        "catalog": "sex",
        "code": "1",
        "name": "名称",
        "order": 0,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "006",
        "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      },
      {
        "id": "007",
        "catalog": "sex",
        "code": "1",
        "name": "名称",
        "order": 0,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "008",
       "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      },
      {
        "id": "0018",
        "catalog": "sex",
        "code": "1",
        "name": "名称",
        "order": 0,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "009",
       "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      },
      {
        "id": "0010",
        "catalog": "sex",
        "code": "1",
        "name": "名称",
        "order": 0,
        "isDefault": true,
        "dataDicType": "SYSTEM"
      },
      {
        "id": "0011",
       "catalog": "sex",
        "code": "1ss",
        "name": "名称",
        "order": 2,
        "isDefault": true,
        "dataDicType": "BUSINESS"
      }
    ]
  }
}
