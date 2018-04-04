var url = require('url');

module.exports = {
  "GET:/fake_chart_data":{
    "visitData":
      [
        {"x":"2018-02-07","y":7},
        {"x":"2018-02-08","y":5},
        {"x":"2018-02-09","y":4},
        {"x":"2018-02-10","y":2},
        {"x":"2018-02-11","y":4},
        {"x":"2018-02-12","y":7},
        {"x":"2018-02-13","y":5},
        {"x":"2018-02-14","y":6},
        {"x":"2018-02-15","y":5},
        {"x":"2018-02-16","y":9},
        {"x":"2018-02-17","y":6},
        {"x":"2018-02-18","y":3},
        {"x":"2018-02-19","y":1},
        {"x":"2018-02-20","y":5},
        {"x":"2018-02-21","y":3},
        {"x":"2018-02-22","y":6},
        {"x":"2018-02-23","y":5}
      ],
    "visitData2":
      [
        {"x":"2018-02-07","y":1},
        {"x":"2018-02-08","y":6},
        {"x":"2018-02-09","y":4},
        {"x":"2018-02-10","y":8},
        {"x":"2018-02-11","y":3},
        {"x":"2018-02-12","y":7},
        {"x":"2018-02-13","y":2}
      ],
    "salesData":
      [
        {"x":"1月","y":582},
        {"x":"2月","y":419},
        {"x":"3月","y":720},
        {"x":"4月","y":520},
        {"x":"5月","y":239},
        {"x":"6月","y":882},
        {"x":"7月","y":954},
        {"x":"8月","y":648},
        {"x":"9月","y":1173},
        {"x":"10月","y":319},
        {"x":"11月","y":1158},
        {"x":"12月","y":444}
      ],
    "searchData":
      [
        {"index":1,"keyword":"搜索关键词-0","count":659,"range":62,"status":0},
        {"index":2,"keyword":"搜索关键词-1","count":53,"range":77,"status":1},
        {"index":3,"keyword":"搜索关键词-2","count":781,"range":28,"status":1},
        {"index":4,"keyword":"搜索关键词-3","count":895,"range":10,"status":1},
        {"index":5,"keyword":"搜索关键词-4","count":337,"range":33,"status":1},
        {"index":6,"keyword":"搜索关键词-5","count":409,"range":58,"status":1},
        {"index":7,"keyword":"搜索关键词-6","count":617,"range":89,"status":1},
        {"index":8,"keyword":"搜索关键词-7","count":836,"range":46,"status":1},
        {"index":9,"keyword":"搜索关键词-8","count":511,"range":34,"status":1},
        {"index":10,"keyword":"搜索关键词-9","count":386,"range":5,"status":1},
        {"index":11,"keyword":"搜索关键词-10","count":91,"range":8,"status":1},
        {"index":12,"keyword":"搜索关键词-11","count":577,"range":41,"status":0},
        {"index":13,"keyword":"搜索关键词-12","count":637,"range":98,"status":0},
        {"index":14,"keyword":"搜索关键词-13","count":826,"range":37,"status":1},
        {"index":15,"keyword":"搜索关键词-14","count":578,"range":73,"status":1},
        {"index":16,"keyword":"搜索关键词-15","count":837,"range":34,"status":1},
        {"index":17,"keyword":"搜索关键词-16","count":572,"range":64,"status":0},
        {"index":18,"keyword":"搜索关键词-17","count":725,"range":14,"status":1},
        {"index":19,"keyword":"搜索关键词-18","count":500,"range":13,"status":1},
        {"index":20,"keyword":"搜索关键词-19","count":433,"range":10,"status":0},
        {"index":21,"keyword":"搜索关键词-20","count":204,"range":21,"status":1},
        {"index":22,"keyword":"搜索关键词-21","count":339,"range":43,"status":0},
        {"index":23,"keyword":"搜索关键词-22","count":960,"range":1,"status":0},
        {"index":24,"keyword":"搜索关键词-23","count":321,"range":10,"status":0},
        {"index":25,"keyword":"搜索关键词-24","count":375,"range":31,"status":1},
        {"index":26,"keyword":"搜索关键词-25","count":249,"range":55,"status":1},
        {"index":27,"keyword":"搜索关键词-26","count":98,"range":86,"status":1},
        {"index":28,"keyword":"搜索关键词-27","count":233,"range":87,"status":0},
        {"index":29,"keyword":"搜索关键词-28","count":538,"range":15,"status":0},
        {"index":30,"keyword":"搜索关键词-29","count":213,"range":17,"status":1},
        {"index":31,"keyword":"搜索关键词-30","count":692,"range":65,"status":0},
        {"index":32,"keyword":"搜索关键词-31","count":541,"range":20,"status":0},
        {"index":33,"keyword":"搜索关键词-32","count":920,"range":95,"status":1},
        {"index":34,"keyword":"搜索关键词-33","count":366,"range":70,"status":1},
        {"index":35,"keyword":"搜索关键词-34","count":285,"range":70,"status":1},
        {"index":36,"keyword":"搜索关键词-35","count":326,"range":76,"status":1},
        {"index":37,"keyword":"搜索关键词-36","count":723,"range":43,"status":0},
        {"index":38,"keyword":"搜索关键词-37","count":826,"range":31,"status":0},
        {"index":39,"keyword":"搜索关键词-38","count":946,"range":78,"status":0},
        {"index":40,"keyword":"搜索关键词-39","count":70,"range":77,"status":0},
        {"index":41,"keyword":"搜索关键词-40","count":326,"range":43,"status":1},
        {"index":42,"keyword":"搜索关键词-41","count":309,"range":0,"status":0},
        {"index":43,"keyword":"搜索关键词-42","count":131,"range":28,"status":0},
        {"index":44,"keyword":"搜索关键词-43","count":305,"range":48,"status":1},
        {"index":45,"keyword":"搜索关键词-44","count":609,"range":48,"status":1},
        {"index":46,"keyword":"搜索关键词-45","count":98,"range":44,"status":0},
        {"index":47,"keyword":"搜索关键词-46","count":10,"range":45,"status":1},
        {"index":48,"keyword":"搜索关键词-47","count":831,"range":66,"status":0},
        {"index":49,"keyword":"搜索关键词-48","count":163,"range":96,"status":1},
        {"index":50,"keyword":"搜索关键词-49","count":965,"range":63,"status":0}
      ],
    "offlineData":
      [
        {"name":"门店0","cvr":0.8},
        {"name":"门店1","cvr":0.4},
        {"name":"门店2","cvr":0.3},
        {"name":"门店3","cvr":0.1},
        {"name":"门店4","cvr":0.4},
        {"name":"门店5","cvr":0.9},
        {"name":"门店6","cvr":0.2},
        {"name":"门店7","cvr":0.8},
        {"name":"门店8","cvr":0.1},
        {"name":"门店9","cvr":0.7}
      ],
    "offlineChartData":
      [
        {"x":1517987838575,"y1":52,"y2":79},
        {"x":1517989638575,"y1":81,"y2":97},
        {"x":1517991438575,"y1":49,"y2":70},
        {"x":1517993238575,"y1":27,"y2":19},
        {"x":1517995038575,"y1":53,"y2":31},
        {"x":1517996838575,"y1":36,"y2":52},
        {"x":1517998638575,"y1":53,"y2":109},
        {"x":1518000438575,"y1":47,"y2":69},
        {"x":1518002238575,"y1":11,"y2":24},
        {"x":1518004038575,"y1":107,"y2":72},
        {"x":1518005838575,"y1":14,"y2":39},
        {"x":1518007638575,"y1":13,"y2":24},
        {"x":1518009438575,"y1":17,"y2":39},
        {"x":1518011238575,"y1":104,"y2":66},
        {"x":1518013038575,"y1":40,"y2":59},
        {"x":1518014838575,"y1":60,"y2":22},
        {"x":1518016638575,"y1":45,"y2":102},
        {"x":1518018438575,"y1":71,"y2":28},
        {"x":1518020238575,"y1":86,"y2":52},
        {"x":1518022038575,"y1":75,"y2":33}
      ],
    "salesTypeData":
      [
        {"x":"家用电器","y":4544},
        {"x":"食用酒水","y":3321},
        {"x":"个护健康","y":3113},
        {"x":"服饰箱包","y":2341},
        {"x":"母婴产品","y":1231},
        {"x":"其他","y":1231}
      ],
    "salesTypeDataOnline":
      [
        {"x":"家用电器","y":244},
        {"x":"食用酒水","y":321},
        {"x":"个护健康","y":311},
        {"x":"服饰箱包","y":41},
        {"x":"母婴产品","y":121},
        {"x":"其他","y":111}
      ],
    "salesTypeDataOffline":
      [
        {"x":"家用电器","y":99},
        {"x":"个护健康","y":188},
        {"x":"服饰箱包","y":344},
        {"x":"母婴产品","y":255},
        {"x":"其他","y":65}
      ],
    "radarData":
      [
        {"name":"个人","label":"引用","value":10},
        {"name":"个人","label":"口碑","value":8},
        {"name":"个人","label":"产量","value":4},
        {"name":"个人","label":"贡献","value":5},
        {"name":"个人","label":"热度","value":7},
        {"name":"团队","label":"引用","value":3},
        {"name":"团队","label":"口碑","value":9},
        {"name":"团队","label":"产量","value":6},
        {"name":"团队","label":"贡献","value":3},
        {"name":"团队","label":"热度","value":1},
        {"name":"部门","label":"引用","value":4},
        {"name":"部门","label":"口碑","value":1},
        {"name":"部门","label":"产量","value":6},
        {"name":"部门","label":"贡献","value":5},
        {"name":"部门","label":"热度","value":7}
      ]
  },
  "GET:/tags":{
    "list": [
      {
        "name": "九龙",
        "value": 66,
        "type": 1
      },
      {
        "name": "天津市",
        "value": 50,
        "type": 1
      },
      {
        "name": "阳泉市",
        "value": 20,
        "type": 2
      },
      {
        "name": "海外",
        "value": 94,
        "type": 1
      },
      {
        "name": "南通市",
        "value": 9,
        "type": 1
      },
      {
        "name": "大兴安岭地区",
        "value": 13,
        "type": 1
      },
      {
        "name": "澎湖县",
        "value": 54,
        "type": 1
      },
      {
        "name": "重庆市",
        "value": 15,
        "type": 1
      },
      {
        "name": "揭阳市",
        "value": 22,
        "type": 1
      },
      {
        "name": "贺州市",
        "value": 24,
        "type": 1
      },
      {
        "name": "和田地区",
        "value": 39,
        "type": 1
      },
      {
        "name": "玉树藏族自治州",
        "value": 97,
        "type": 0
      },
      {
        "name": "天津市",
        "value": 91,
        "type": 1
      },
      {
        "name": "晋中市",
        "value": 15,
        "type": 0
      },
      {
        "name": "邵阳市",
        "value": 15,
        "type": 1
      },
      {
        "name": "博尔塔拉蒙古自治州",
        "value": 64,
        "type": 2
      },
      {
        "name": "天津市",
        "value": 38,
        "type": 1
      },
      {
        "name": "红河哈尼族彝族自治州",
        "value": 6,
        "type": 0
      },
      {
        "name": "哈尔滨市",
        "value": 39,
        "type": 2
      },
      {
        "name": "郑州市",
        "value": 59,
        "type": 1
      },
      {
        "name": "绥化市",
        "value": 63,
        "type": 0
      },
      {
        "name": "芜湖市",
        "value": 25,
        "type": 0
      },
      {
        "name": "澳门半岛",
        "value": 24,
        "type": 1
      },
      {
        "name": "迪庆藏族自治州",
        "value": 14,
        "type": 2
      },
      {
        "name": "澳门半岛",
        "value": 83,
        "type": 1
      },
      {
        "name": "龙岩市",
        "value": 6,
        "type": 2
      },
      {
        "name": "锦州市",
        "value": 96,
        "type": 1
      },
      {
        "name": "宿迁市",
        "value": 10,
        "type": 1
      },
      {
        "name": "锡林郭勒盟",
        "value": 37,
        "type": 1
      },
      {
        "name": "漳州市",
        "value": 5,
        "type": 0
      },
      {
        "name": "离岛",
        "value": 76,
        "type": 2
      },
      {
        "name": "青岛市",
        "value": 65,
        "type": 0
      },
      {
        "name": "离岛",
        "value": 95,
        "type": 1
      },
      {
        "name": "新竹市",
        "value": 67,
        "type": 0
      },
      {
        "name": "泰州市",
        "value": 40,
        "type": 1
      },
      {
        "name": "陇南市",
        "value": 5,
        "type": 1
      },
      {
        "name": "宜昌市",
        "value": 27,
        "type": 1
      },
      {
        "name": "贺州市",
        "value": 92,
        "type": 1
      },
      {
        "name": "北京市",
        "value": 69,
        "type": 0
      },
      {
        "name": "重庆市",
        "value": 49,
        "type": 2
      },
      {
        "name": "咸阳市",
        "value": 19,
        "type": 1
      },
      {
        "name": "重庆市",
        "value": 43,
        "type": 1
      },
      {
        "name": "齐齐哈尔市",
        "value": 3,
        "type": 1
      },
      {
        "name": "铜川市",
        "value": 87,
        "type": 1
      },
      {
        "name": "通辽市",
        "value": 89,
        "type": 1
      },
      {
        "name": "离岛",
        "value": 99,
        "type": 0
      },
      {
        "name": "重庆市",
        "value": 100,
        "type": 0
      },
      {
        "name": "舟山市",
        "value": 11,
        "type": 2
      },
      {
        "name": "上海市",
        "value": 37,
        "type": 1
      },
      {
        "name": "安阳市",
        "value": 65,
        "type": 1
      },
      {
        "name": "漯河市",
        "value": 85,
        "type": 2
      },
      {
        "name": "安阳市",
        "value": 21,
        "type": 2
      },
      {
        "name": "德宏傣族景颇族自治州",
        "value": 23,
        "type": 1
      },
      {
        "name": "银川市",
        "value": 55,
        "type": 0
      },
      {
        "name": "湘潭市",
        "value": 70,
        "type": 2
      },
      {
        "name": "新界",
        "value": 61,
        "type": 1
      },
      {
        "name": "莆田市",
        "value": 52,
        "type": 0
      },
      {
        "name": "无锡市",
        "value": 88,
        "type": 0
      },
      {
        "name": "榆林市",
        "value": 8,
        "type": 1
      },
      {
        "name": "太原市",
        "value": 26,
        "type": 1
      },
      {
        "name": "金华市",
        "value": 62,
        "type": 1
      },
      {
        "name": "曲靖市",
        "value": 76,
        "type": 2
      },
      {
        "name": "临汾市",
        "value": 92,
        "type": 1
      },
      {
        "name": "汕头市",
        "value": 82,
        "type": 0
      },
      {
        "name": "衡水市",
        "value": 15,
        "type": 2
      },
      {
        "name": "昭通市",
        "value": 32,
        "type": 0
      },
      {
        "name": "保定市",
        "value": 32,
        "type": 2
      },
      {
        "name": "娄底市",
        "value": 99,
        "type": 1
      },
      {
        "name": "昌都地区",
        "value": 25,
        "type": 2
      },
      {
        "name": "离岛",
        "value": 56,
        "type": 1
      },
      {
        "name": "黄冈市",
        "value": 81,
        "type": 1
      },
      {
        "name": "陇南市",
        "value": 48,
        "type": 0
      },
      {
        "name": "上海市",
        "value": 49,
        "type": 1
      },
      {
        "name": "宁德市",
        "value": 80,
        "type": 1
      },
      {
        "name": "重庆市",
        "value": 93,
        "type": 0
      },
      {
        "name": "台州市",
        "value": 43,
        "type": 2
      },
      {
        "name": "海北藏族自治州",
        "value": 21,
        "type": 1
      },
      {
        "name": "铁岭市",
        "value": 90,
        "type": 1
      },
      {
        "name": "三明市",
        "value": 98,
        "type": 1
      },
      {
        "name": "滁州市",
        "value": 73,
        "type": 2
      },
      {
        "name": "红河哈尼族彝族自治州",
        "value": 53,
        "type": 1
      },
      {
        "name": "许昌市",
        "value": 72,
        "type": 1
      },
      {
        "name": "晋城市",
        "value": 91,
        "type": 1
      },
      {
        "name": "石家庄市",
        "value": 17,
        "type": 1
      },
      {
        "name": "天津市",
        "value": 31,
        "type": 1
      },
      {
        "name": "果洛藏族自治州",
        "value": 98,
        "type": 1
      },
      {
        "name": "红河哈尼族彝族自治州",
        "value": 59,
        "type": 0
      },
      {
        "name": "固原市",
        "value": 25,
        "type": 1
      },
      {
        "name": "玉林市",
        "value": 14,
        "type": 2
      },
      {
        "name": "丹东市",
        "value": 58,
        "type": 1
      },
      {
        "name": "天津市",
        "value": 22,
        "type": 2
      },
      {
        "name": "咸阳市",
        "value": 86,
        "type": 1
      },
      {
        "name": "玉溪市",
        "value": 4,
        "type": 1
      },
      {
        "name": "重庆市",
        "value": 75,
        "type": 1
      },
      {
        "name": "北京市",
        "value": 62,
        "type": 1
      },
      {
        "name": "百色市",
        "value": 21,
        "type": 1
      },
      {
        "name": "四平市",
        "value": 13,
        "type": 1
      },
      {
        "name": "张家口市",
        "value": 37,
        "type": 1
      },
      {
        "name": "攀枝花市",
        "value": 65,
        "type": 0
      },
      {
        "name": "佳木斯市",
        "value": 40,
        "type": 2
      }
    ]
  },
  "GET:/project/notice":[
    {
      "id": "xxx1",
      "title": "Alipay",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      "description": "那是一种内在的东西，他们到达不了，也无法触及的",
      "updatedAt": "",
      "member": "科学搬砖组",
      "href": "",
      "memberLink": ""
    },
    {
      "id": "xxx2",
      "title": "Angular",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
      "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
      "updatedAt": "2017-07-24",
      "member": "全组都是吴彦祖",
      "href": "",
      "memberLink": ""
    },
    {
      "id": "xxx3",
      "title": "Ant Design",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
      "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
      "updatedAt": "",
      "member": "中二少女团",
      "href": "",
      "memberLink": ""
    },
    {
      "id": "xxx4",
      "title": "Ant Design Pro",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
      "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
      "updatedAt": "2017-07-23",
      "member": "程序员日常",
      "href": "",
      "memberLink": ""
    },
    {
      "id": "xxx5",
      "title": "Bootstrap",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
      "description": "凛冬将至",
      "updatedAt": "2017-07-23",
      "member": "高逼格设计天团",
      "href": "",
      "memberLink": ""
    },
    {
      "id": "xxx6",
      "title": "React",
      "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
      "description": "生命就像一盒巧克力，结果往往出人意料",
      "updatedAt": "2017-07-23",
      "member": "骗你来学计算机",
      "href": "",
      "memberLink": ""
    }
  ],
  "GET:/activities":[
    {
      "id": "trend-1",
      "updatedAt": "",
      "user": {
        "name": "曲丽丽",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
      },
      "group": {
        "name": "高逼格设计天团",
        "link": "http://github.com/"
      },
      "project": {
        "name": "六月迭代",
        "link": "http://github.com/"
      },
      "template": "在 @{group} 新建项目 @{project}"
    },
    {
      "id": "trend-2",
      "updatedAt": "",
      "user": {
        "name": "付小小",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png"
      },
      "group": {
        "name": "高逼格设计天团",
        "link": "http://github.com/"
      },
      "project": {
        "name": "六月迭代",
        "link": "http://github.com/"
      },
      "template": "在 @{group} 新建项目 @{project}"
    },
    {
      "id": "trend-3",
      "updatedAt": "",
      "user": {
        "name": "林东东",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"
      },
      "group": {
        "name": "中二少女团",
        "link": "http://github.com/"
      },
      "project": {
        "name": "六月迭代",
        "link": "http://github.com/"
      },
      "template": "在 @{group} 新建项目 @{project}"
    },
    {
      "id": "trend-4",
      "updatedAt": "",
      "user": {
        "name": "周星星",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png"
      },
      "project": {
        "name": "5 月日常迭代",
        "link": "http://github.com/"
      },
      "template": "将 @{project} 更新至已发布状态"
    },
    {
      "id": "trend-5",
      "updatedAt": "",
      "user": {
        "name": "朱偏右",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png"
      },
      "project": {
        "name": "工程效能",
        "link": "http://github.com/"
      },
      "comment": {
        "name": "留言",
        "link": "http://github.com/"
      },
      "template": "在 @{project} 发布了 @{comment}"
    },
    {
      "id": "trend-6",
      "updatedAt": "",
      "user": {
        "name": "乐哥",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"
      },
      "group": {
        "name": "程序员日常",
        "link": "http://github.com/"
      },
      "project": {
        "name": "品牌迭代",
        "link": "http://github.com/"
      },
      "template": "在 @{group} 新建项目 @{project}"
    }
  ],
  "POST:/forms":(req, res) => {
    res.send({ message: 'Ok' });
  },
  "GET:/rule":{
    "list": [
      {
        "key": 0,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 0",
        "title": "一个任务名称 0",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 782,
        "status": 0,
        "updatedAt": "2017-06-30T16:00:00.000Z",
        "createdAt": "2017-06-30T16:00:00.000Z",
        "progress": 60
      },
      {
        "key": 1,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 1",
        "title": "一个任务名称 1",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 147,
        "status": 3,
        "updatedAt": "2017-06-30T16:00:00.000Z",
        "createdAt": "2017-06-30T16:00:00.000Z",
        "progress": 44
      },
      {
        "key": 2,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 2",
        "title": "一个任务名称 2",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 395,
        "status": 1,
        "updatedAt": "2017-07-01T16:00:00.000Z",
        "createdAt": "2017-07-01T16:00:00.000Z",
        "progress": 35
      },
      {
        "key": 3,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 3",
        "title": "一个任务名称 3",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 876,
        "status": 0,
        "updatedAt": "2017-07-01T16:00:00.000Z",
        "createdAt": "2017-07-01T16:00:00.000Z",
        "progress": 6
      },
      {
        "key": 4,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 4",
        "title": "一个任务名称 4",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 288,
        "status": 0,
        "updatedAt": "2017-07-02T16:00:00.000Z",
        "createdAt": "2017-07-02T16:00:00.000Z",
        "progress": 65
      },
      {
        "key": 5,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 5",
        "title": "一个任务名称 5",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 770,
        "status": 2,
        "updatedAt": "2017-07-02T16:00:00.000Z",
        "createdAt": "2017-07-02T16:00:00.000Z",
        "progress": 27
      },
      {
        "key": 6,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 6",
        "title": "一个任务名称 6",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 653,
        "status": 1,
        "updatedAt": "2017-07-03T16:00:00.000Z",
        "createdAt": "2017-07-03T16:00:00.000Z",
        "progress": 17
      },
      {
        "key": 7,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 7",
        "title": "一个任务名称 7",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 350,
        "status": 3,
        "updatedAt": "2017-07-03T16:00:00.000Z",
        "createdAt": "2017-07-03T16:00:00.000Z",
        "progress": 59
      },
      {
        "key": 8,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 8",
        "title": "一个任务名称 8",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 552,
        "status": 0,
        "updatedAt": "2017-07-04T16:00:00.000Z",
        "createdAt": "2017-07-04T16:00:00.000Z",
        "progress": 64
      },
      {
        "key": 9,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 9",
        "title": "一个任务名称 9",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 290,
        "status": 2,
        "updatedAt": "2017-07-04T16:00:00.000Z",
        "createdAt": "2017-07-04T16:00:00.000Z",
        "progress": 94
      },
      {
        "key": 10,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 10",
        "title": "一个任务名称 10",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 257,
        "status": 0,
        "updatedAt": "2017-07-05T16:00:00.000Z",
        "createdAt": "2017-07-05T16:00:00.000Z",
        "progress": 29
      },
      {
        "key": 11,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 11",
        "title": "一个任务名称 11",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 905,
        "status": 0,
        "updatedAt": "2017-07-05T16:00:00.000Z",
        "createdAt": "2017-07-05T16:00:00.000Z",
        "progress": 66
      },
      {
        "key": 12,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 12",
        "title": "一个任务名称 12",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 387,
        "status": 0,
        "updatedAt": "2017-07-06T16:00:00.000Z",
        "createdAt": "2017-07-06T16:00:00.000Z",
        "progress": 58
      },
      {
        "key": 13,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 13",
        "title": "一个任务名称 13",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 411,
        "status": 1,
        "updatedAt": "2017-07-06T16:00:00.000Z",
        "createdAt": "2017-07-06T16:00:00.000Z",
        "progress": 17
      },
      {
        "key": 14,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 14",
        "title": "一个任务名称 14",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 773,
        "status": 0,
        "updatedAt": "2017-07-07T16:00:00.000Z",
        "createdAt": "2017-07-07T16:00:00.000Z",
        "progress": 56
      },
      {
        "key": 15,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 15",
        "title": "一个任务名称 15",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 781,
        "status": 0,
        "updatedAt": "2017-07-07T16:00:00.000Z",
        "createdAt": "2017-07-07T16:00:00.000Z",
        "progress": 70
      },
      {
        "key": 16,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 16",
        "title": "一个任务名称 16",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 287,
        "status": 1,
        "updatedAt": "2017-07-08T16:00:00.000Z",
        "createdAt": "2017-07-08T16:00:00.000Z",
        "progress": 1
      },
      {
        "key": 17,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 17",
        "title": "一个任务名称 17",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 502,
        "status": 1,
        "updatedAt": "2017-07-08T16:00:00.000Z",
        "createdAt": "2017-07-08T16:00:00.000Z",
        "progress": 99
      },
      {
        "key": 18,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 18",
        "title": "一个任务名称 18",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 601,
        "status": 0,
        "updatedAt": "2017-07-10T00:00:00.000Z",
        "createdAt": "2017-07-10T00:00:00.000Z",
        "progress": 24
      },
      {
        "key": 19,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 19",
        "title": "一个任务名称 19",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 232,
        "status": 0,
        "updatedAt": "2017-07-10T00:00:00.000Z",
        "createdAt": "2017-07-10T00:00:00.000Z",
        "progress": 72
      },
      {
        "key": 20,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 20",
        "title": "一个任务名称 20",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 303,
        "status": 2,
        "updatedAt": "2017-07-11T00:00:00.000Z",
        "createdAt": "2017-07-11T00:00:00.000Z",
        "progress": 79
      },
      {
        "key": 21,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 21",
        "title": "一个任务名称 21",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 22,
        "status": 3,
        "updatedAt": "2017-07-11T00:00:00.000Z",
        "createdAt": "2017-07-11T00:00:00.000Z",
        "progress": 6
      },
      {
        "key": 22,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 22",
        "title": "一个任务名称 22",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 475,
        "status": 2,
        "updatedAt": "2017-07-12T00:00:00.000Z",
        "createdAt": "2017-07-12T00:00:00.000Z",
        "progress": 37
      },
      {
        "key": 23,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 23",
        "title": "一个任务名称 23",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 501,
        "status": 0,
        "updatedAt": "2017-07-12T00:00:00.000Z",
        "createdAt": "2017-07-12T00:00:00.000Z",
        "progress": 80
      },
      {
        "key": 24,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 24",
        "title": "一个任务名称 24",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 847,
        "status": 0,
        "updatedAt": "2017-07-13T00:00:00.000Z",
        "createdAt": "2017-07-13T00:00:00.000Z",
        "progress": 55
      },
      {
        "key": 25,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 25",
        "title": "一个任务名称 25",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 26,
        "status": 1,
        "updatedAt": "2017-07-13T00:00:00.000Z",
        "createdAt": "2017-07-13T00:00:00.000Z",
        "progress": 14
      },
      {
        "key": 26,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 26",
        "title": "一个任务名称 26",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 459,
        "status": 0,
        "updatedAt": "2017-07-14T00:00:00.000Z",
        "createdAt": "2017-07-14T00:00:00.000Z",
        "progress": 87
      },
      {
        "key": 27,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 27",
        "title": "一个任务名称 27",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 641,
        "status": 3,
        "updatedAt": "2017-07-14T00:00:00.000Z",
        "createdAt": "2017-07-14T00:00:00.000Z",
        "progress": 24
      },
      {
        "key": 28,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 28",
        "title": "一个任务名称 28",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 262,
        "status": 0,
        "updatedAt": "2017-07-15T00:00:00.000Z",
        "createdAt": "2017-07-15T00:00:00.000Z",
        "progress": 77
      },
      {
        "key": 29,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 29",
        "title": "一个任务名称 29",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 510,
        "status": 0,
        "updatedAt": "2017-07-15T00:00:00.000Z",
        "createdAt": "2017-07-15T00:00:00.000Z",
        "progress": 89
      },
      {
        "key": 30,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 30",
        "title": "一个任务名称 30",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 590,
        "status": 3,
        "updatedAt": "2017-07-16T00:00:00.000Z",
        "createdAt": "2017-07-16T00:00:00.000Z",
        "progress": 41
      },
      {
        "key": 31,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 31",
        "title": "一个任务名称 31",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 556,
        "status": 1,
        "updatedAt": "2017-07-16T00:00:00.000Z",
        "createdAt": "2017-07-16T00:00:00.000Z",
        "progress": 84
      },
      {
        "key": 32,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 32",
        "title": "一个任务名称 32",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 341,
        "status": 1,
        "updatedAt": "2017-07-17T00:00:00.000Z",
        "createdAt": "2017-07-17T00:00:00.000Z",
        "progress": 78
      },
      {
        "key": 33,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 33",
        "title": "一个任务名称 33",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 580,
        "status": 1,
        "updatedAt": "2017-07-17T00:00:00.000Z",
        "createdAt": "2017-07-17T00:00:00.000Z",
        "progress": 89
      },
      {
        "key": 34,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 34",
        "title": "一个任务名称 34",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 373,
        "status": 1,
        "updatedAt": "2017-07-18T00:00:00.000Z",
        "createdAt": "2017-07-18T00:00:00.000Z",
        "progress": 39
      },
      {
        "key": 35,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 35",
        "title": "一个任务名称 35",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 314,
        "status": 2,
        "updatedAt": "2017-07-18T00:00:00.000Z",
        "createdAt": "2017-07-18T00:00:00.000Z",
        "progress": 86
      },
      {
        "key": 36,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 36",
        "title": "一个任务名称 36",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 518,
        "status": 1,
        "updatedAt": "2017-07-19T00:00:00.000Z",
        "createdAt": "2017-07-19T00:00:00.000Z",
        "progress": 85
      },
      {
        "key": 37,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 37",
        "title": "一个任务名称 37",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 700,
        "status": 2,
        "updatedAt": "2017-07-19T00:00:00.000Z",
        "createdAt": "2017-07-19T00:00:00.000Z",
        "progress": 2
      },
      {
        "key": 38,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 38",
        "title": "一个任务名称 38",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 209,
        "status": 0,
        "updatedAt": "2017-07-20T00:00:00.000Z",
        "createdAt": "2017-07-20T00:00:00.000Z",
        "progress": 68
      },
      {
        "key": 39,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 39",
        "title": "一个任务名称 39",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 227,
        "status": 3,
        "updatedAt": "2017-07-20T00:00:00.000Z",
        "createdAt": "2017-07-20T00:00:00.000Z",
        "progress": 2
      },
      {
        "key": 40,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 40",
        "title": "一个任务名称 40",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 187,
        "status": 3,
        "updatedAt": "2017-07-21T00:00:00.000Z",
        "createdAt": "2017-07-21T00:00:00.000Z",
        "progress": 99
      },
      {
        "key": 41,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 41",
        "title": "一个任务名称 41",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 931,
        "status": 0,
        "updatedAt": "2017-07-21T00:00:00.000Z",
        "createdAt": "2017-07-21T00:00:00.000Z",
        "progress": 36
      },
      {
        "key": 42,
        "disabled": true,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 42",
        "title": "一个任务名称 42",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 900,
        "status": 2,
        "updatedAt": "2017-07-22T00:00:00.000Z",
        "createdAt": "2017-07-22T00:00:00.000Z",
        "progress": 99
      },
      {
        "key": 43,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 43",
        "title": "一个任务名称 43",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 690,
        "status": 0,
        "updatedAt": "2017-07-22T00:00:00.000Z",
        "createdAt": "2017-07-22T00:00:00.000Z",
        "progress": 37
      },
      {
        "key": 44,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "no": "TradeCode 44",
        "title": "一个任务名称 44",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 561,
        "status": 0,
        "updatedAt": "2017-07-23T00:00:00.000Z",
        "createdAt": "2017-07-23T00:00:00.000Z",
        "progress": 31
      },
      {
        "key": 45,
        "disabled": false,
        "href": "https://ant.design",
        "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
        "no": "TradeCode 45",
        "title": "一个任务名称 45",
        "owner": "曲丽丽",
        "description": "这是一段描述",
        "callNo": 655,
        "status": 1,
        "updatedAt": "2017-07-23T00:00:00.000Z",
        "createdAt": "2017-07-23T00:00:00.000Z",
        "progress": 4
      }
    ],
    "pagination": {
      "total": 46,
      "pageSize": 10,
      "current": 1
    }
  },
  "POST:/rule":{},
  "GET:/fake_list":[
    {
      "id":"fake-list-0",
      "owner":"付小小",
      "title":"Alipay",
      "avatar":"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      "cover":"https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
      "status":"active",
      "percent":78,
      "logo":"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      "href":"https://ant.design",
      "updatedAt":"2018-02-07T07:27:51.722Z",
      "createdAt":"2018-02-07T07:27:51.722Z",
      "subDescription":"那是一种内在的东西， 他们到达不了，也无法触及的",
      "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      "activeUser":134176,
      "newUser":1954,
      "star":200,
      "like":174,
      "message":13,
      "content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      "members":[
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜"}
      ]
    },
    {
      "id":"fake-list-1",
      "owner":"曲丽丽",
      "title":"Angular",
      "avatar":"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
      "cover":"https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
      "status":"exception",
      "percent":52,
      "logo":"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
      "href":"https://ant.design",
      "updatedAt":"2018-02-07T05:27:51.722Z",
      "createdAt":"2018-02-07T05:27:51.722Z",
      "subDescription":"希望是一个好东西，也许是最好的，好东西是不会消亡的",
      "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      "activeUser":196284,
      "newUser":1867,
      "star":150,
      "like":169,
      "message":15,
      "content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      "members":[
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜"}
      ]
    },
    {
      "id":"fake-list-2",
      "owner":"林东东",
      "title":"Ant Design",
      "avatar":"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
      "cover":"https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png",
      "status":"normal",
      "percent":98,
      "logo":"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
      "href":"https://ant.design",
      "updatedAt":"2018-02-07T03:27:51.722Z",
      "createdAt":"2018-02-07T03:27:51.722Z",
      "subDescription":"生命就像一盒巧克力，结果往往出人意料",
      "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      "activeUser":115089,
      "newUser":1537,
      "star":119,
      "like":103,
      "message":11,
      "content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      "members":[
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜"}
      ]
    },
    {
      "id":"fake-list-3",
      "owner":"周星星",
      "title":"Ant Design Pro",
      "avatar":"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
      "cover":"https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
      "status":"active",
      "percent":60,
      "logo":"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
      "href":"https://ant.design",
      "updatedAt":"2018-02-07T01:27:51.722Z",
      "createdAt":"2018-02-07T01:27:51.722Z",
      "subDescription":"城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
      "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      "activeUser":164071,
      "newUser":1079,
      "star":147,
      "like":196,
      "message":18,
      "content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      "members":[
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜"}
      ]
    },
    {
      "id":"fake-list-4",
      "owner":"吴加好",
      "title":"Bootstrap",
      "avatar":"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
      "cover":"https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
      "status":"exception",
      "percent":84,
      "logo":"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
      "href":"https://ant.design",
      "updatedAt":"2018-02-06T23:27:51.722Z",
      "createdAt":"2018-02-06T23:27:51.722Z",
      "subDescription":"那时候我只会想自己想要什么，从不想自己拥有什么",
      "description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      "activeUser":136828,
      "newUser":1877,
      "star":182,
      "like":112,
      "message":17,
      "content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      "members":[
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君"},
        {"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜"}
      ]
    }
  ],
  "GET:/profile/basic":{
    "basicGoods": [
      {
        "id": "1234561",
        "name": "矿泉水 550ml",
        "barcode": "12421432143214321",
        "price": "2.00",
        "num": "1",
        "amount": "2.00"
      },
      {
        "id": "1234562",
        "name": "凉茶 300ml",
        "barcode": "12421432143214322",
        "price": "3.00",
        "num": "2",
        "amount": "6.00"
      },
      {
        "id": "1234563",
        "name": "好吃的薯片",
        "barcode": "12421432143214323",
        "price": "7.00",
        "num": "4",
        "amount": "28.00"
      },
      {
        "id": "1234564",
        "name": "特别好吃的蛋卷",
        "barcode": "12421432143214324",
        "price": "8.50",
        "num": "3",
        "amount": "25.50"
      }
    ],
    "basicProgress": [
      {
        "key": "1",
        "time": "2017-10-01 14:10",
        "rate": "联系客户",
        "status": "processing",
        "operator": "取货员 id1234",
        "cost": "5mins"
      },
      {
        "key": "2",
        "time": "2017-10-01 14:05",
        "rate": "取货员出发",
        "status": "success",
        "operator": "取货员 id1234",
        "cost": "1h"
      },
      {
        "key": "3",
        "time": "2017-10-01 13:05",
        "rate": "取货员接单",
        "status": "success",
        "operator": "取货员 id1234",
        "cost": "5mins"
      },
      {
        "key": "4",
        "time": "2017-10-01 13:00",
        "rate": "申请审批通过",
        "status": "success",
        "operator": "系统",
        "cost": "1h"
      },
      {
        "key": "5",
        "time": "2017-10-01 12:00",
        "rate": "发起退货申请",
        "status": "success",
        "operator": "用户",
        "cost": "5mins"
      }
    ]
  },
  "GET:/profile/advanced":{
    "advancedOperation1": [
      {
        "key": "op1",
        "type": "订购关系生效",
        "name": "曲丽丽",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "-"
      },
      {
        "key": "op2",
        "type": "财务复审",
        "name": "付小小",
        "status": "reject",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "不通过原因"
      },
      {
        "key": "op3",
        "type": "部门初审",
        "name": "周毛毛",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "-"
      },
      {
        "key": "op4",
        "type": "提交订单",
        "name": "林东东",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "很棒"
      },
      {
        "key": "op5",
        "type": "创建订单",
        "name": "汗牙牙",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "-"
      }
    ],
    "advancedOperation2": [
      {
        "key": "op1",
        "type": "订购关系生效",
        "name": "曲丽丽",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "-"
      }
    ],

    "advancedOperation3": [
      {
        "key": "op1",
        "type": "创建订单",
        "name": "汗牙牙",
        "status": "agree",
        "updatedAt": "2017-10-03  19:23:12",
        "memo": "-"
      }
    ]
  },
  "GET:/401":(req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  "GET:/403":(req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  "GET:/404":(req, res) => {
    res.status(404).send({
      "timestamp": 1513932555104,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list"
    });
  },
  "GET:/500":(req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  "POST:/register":{ status: 'ok' },
  "GET:/notices":[
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: '通知',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: '通知',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: '通知',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: '待办',
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: '待办',
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: '待办',
    },
  ],
  'GET:/search/inverse':[{"id":"5aab6ea828cc0f09784a0730","con":"用户1","col":"name","tab":"pep_auth_users","des":"name","pri":"pep_dev|pep_auth_users|45f438a3-1af0-4c27-9850-04e046adb6d3"},{"id":"5aab6ea828cc0f09784a0733","con":"用户2","col":"name","tab":"pep_auth_users","des":"name","pri":"pep_dev|pep_auth_users|b18de59a-261a-4df6-9327-30ba7e00f8f1"},{"id":"5aab6ea828cc0f09784a072c","con":"用户3","col":"name","tab":"pep_auth_users","des":"name","pri":"pep_dev|pep_auth_users|000673e6-e87a-4d6b-a641-b2fcf8bb9cb3"}],
  'GET:/search/query':getQueryList,
}

const authUser = {
  "count":11,
  "data": [
    {"id":"1","username":"dengguange","password":"123456","name":"77777","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"2","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"3","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"4","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"5","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"6","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"7","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"8","username":"wewerrrer","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"9","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"10","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false},
    {"id":"11","username":"zhangjianlin","password":"123456","name":"66666","email":"276595311@qq.com","phone":"15912345678","enable":true,"superuser":false}
  ]
};

const authGroup = {
  "count":12,
  "data": [
    {"id": "1","name": "高管用户","description": "高管角色用户组","seq": 1,"enable": true},
    {"id": "2","name": "管理员用户","description": "管理员角色用户组","seq": 2,"enable": true},
    {"id": "3","name": "内勤用户","description": "内勤角色用户组","seq": 3,"enable": false},
    {"id": "4","name": "其他用户","description": "其他角色用户组","seq": 4,"enable": false},
    {"id": "5","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    { "id": "6","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "7","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "8","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "9","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "10","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "11","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false},
    {"id": "12","name": "其他用户2","description": "其他角色2用户组","seq": 5,"enable": false}
  ]
};

const authRole = {
  "count":4,
  "data": [
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
    "parentId": "1",
    "parentName": "XX医院功能"
  },
  {
    "id": "3",
    "name": "研发部功能",
    "description": "研发部所有功能",
    "enable": true,
    "parentId": "1",
    "parentName": "普日基本权限功能"
  },
  {
    "id": "4",
    "name": "开发部功能",
    "description": "开发部所有功能",
    "enable": false,
    "parentId": "1",
    "parentName": "普日基本权限功能"
  },
]};

const hrmEmployee = {
  "count":11,
  "data": [
    {"id":"1","name":"何鑫","sex":"0","number":"01","email":"1015182620@qq.com","phone":"15904015593","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"2","name":"王浩鹏","sex":"0","number":"02","email":"276595311@qq.com","phone":"15912345678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"3","name":"王贺","sex":"0","number":"03","email":"1234567@qq.com","phone":"15914565478","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"4","name":"王怡","sex":"1","number":"04","email":"13457990@qq.com","phone":"15912222678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"5","name":"王维","sex":"0","number":"05","email":"3456457756@qq.com","phone":"15912333378","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"6","name":"张建林","sex":"0","number":"06","email":"23546546@qq.com","phone":"15911115678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"7","name":"刘德峰","sex":"0","number":"07","email":"4576867@qq.com","phone":"15912347778","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"8","name":"孙帅","sex":"0","number":"08","email":"344645547@qq.com","phone":"15912345999","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"9","name":"徐洋","sex":"0","number":"09","email":"5686785567@qq.com","phone":"15912654678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"10","name":"刘成尧","sex":"0","number":"10","email":"7567545646@qq.com","phone":"15974545678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"},
    {"id":"11","name":"王丽莎","sex":"0","number":"11","email":"35346546754@qq.com","phone":"15923345678","birthday":"1982-02-03","idcard": "100010190003140649","phone1": "15123457806","telephone": "024-31353260", "telephone1": "024-67893234", "fax": "024-12345678","organization": "沈阳普日软件", "organizationId": "1", "description": "沈阳普日软件"}
  ]
}

const hrmOrganization = {
  "count":8,
  "data": [
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
  ]
}

const authMenu = {
  "count":7,
  "data":[
    {"id":"pep-workflow","name":"流程设置","route":"workflow","sequenceNumber":0,"icon":"database","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true},
    {"id":"pep-auth","name":"权限管理","route":"auth","sequenceNumber":1,"icon":"lock","description":null,"menuType":{"catalog":"MENU_TYPE","code":"0"},"enable":true,"identifier":null,"parentId":null,"menuCode":null,"root":true},
    {"id":"pep-auth-users","name":"用户管理","route":"user","sequenceNumber":0,"icon":"solution","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-functions","name":"功能管理","route":"func","sequenceNumber":1,"icon":"bars","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-roles","name":"角色管理","route":"role","sequenceNumber":2,"icon":"skin","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-auth-user-groups","name":"用户组管理","route":"group","sequenceNumber":3,"icon":"team","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-auth","menuCode":null,"root":false},
    {"id":"pep-workflow-designer","name":"流程设计","route":"designer","sequenceNumber":0,"icon":"share-alt","description":null,"menuType":{"catalog":"MENU_TYPE","code":"1"},"enable":true,"identifier":null,"parentId":"pep-workflow","menuCode":null,"root":false},
    {"id":"pep-hrm", "name": "组织机构","leaf": false,"root": true,"icon": "team","parentId": null,"enable": true,"route": "hrm","sequenceNumber": 1},
    {"id":"pep-hrm-employee","name": "人员管理","parentId": "pep-hrm","leaf": true,"root": false,"enable": true,"icon": "","route": "employee","sequenceNumber": 2},
  ]
}

function queryList(type) {
  let list = {};
  if (type === 'authusers') {
    list = authUser;
  } else if (type === 'authusergroups') {
    list = authGroup;
  } else if (type === 'authroles') {
    list = authRole;
  }  else if (type === '$hrm$employee') {
    list = hrmEmployee;
  } else if (type === 'authmenus') {
    list = authMenu;
  } else if (type === '$hrm$organization') {
    list = hrmOrganization;
  }
  return list;
}

function getQueryList(req, res) {
  const result = queryList(url.parse(req.url, true).query.moduleName);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
