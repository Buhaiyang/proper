module.exports = {
  "GET:/admin/app/versions": {
    "data": [
      {
        "id": "59b6211d59080100016ff091",
        "ver": 304002,
        "url": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk?fsname=com.proper.soft.mobile.isj_3.4.0_304002.apk&csr=1bbd",
        "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
      },
      {
        "id": "58f70a9bd601800001bf1046",
        "ver": 303002,
        "url": "http://106.117.249.44/imtt.dd.qq.com/16891/D8FFD3265E41723E4200D2F01A234E93.apk?mkey=58f72266924608ce&f=5893&c=0&fsname=com.proper.soft.mobile.isj_3.3.0_303002.apk&csr=1bbd&p=.apk",
        "note": "3.3.0版本更新内容：<br>1)3.3.0版本发布后，版本号低于3.3.0的APP应用无法继续使用，请尽快更新 <br>2)4月19日后预约挂号特需VIP和耳鼻喉科不需要到窗口取号，直接缴纳附加费用；在此之前特需门诊和耳鼻喉科的预约挂号仍需到医院取号 <br>3)挂当日号优化 <br>4)挂号及挂号单详情界面优化，显示费用明细信息 <br>5)报告功能优化，支持查看多个图片检查报告<br>6)绑定病历号界面输入功能优化 <br>7)当日挂号界面显示优化 <br>8)挂号支付结果显示优化<br>9)在线建档按钮样式优化<br>10)修正了部分已知的bug"
      },
      {
        "id": "58bfe7ae5f150300019ff911",
        "ver": 302002,
        "url": "http://123.172.120.174/imtt.dd.qq.com/16891/9C27D1D3EC4C5F98B9EFC0DAB1865730.apk?mkey=58bffaa6924608ce&f=8f88&c=0&fsname=com.proper.soft.mobile.isj_3.2.0_302002.apk&csr=1bbd&p=.apk",
        "note": "v3.2.0版本更新内容：<br>1.科室列表及搜索医生进行优化，更快更节省流量 <br>2.预约时间界面用户体验优化 <br>3.用户反馈界面体验优化 <br>4.增加退出时确认 <br>5.对性能进行优化，更节省流量"
      },
      {
        "id": "59b622445908010001d0adab",
        "ver": 30401,
        "url": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk?fsname=com.proper.soft.mobile.isj_3.4.0_304002.apk&csr=1bbd",
        "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
      },
      {
        "id": "58f70c0cc9e77c000199a641",
        "ver": 30301,
        "url": "http://106.117.249.44/imtt.dd.qq.com/16891/D8FFD3265E41723E4200D2F01A234E93.apk?mkey=58f72266924608ce&f=5893&c=0&fsname=com.proper.soft.mobile.isj_3.3.0_303002.apk&csr=1bbd&p=.apk",
        "note": "3.3.0版本更新内容：<br>1)3.3.0版本发布后，版本号低于3.3.0的APP应用无法继续使用，请尽快更新 <br>2)4月19日后预约挂号特需VIP和耳鼻喉科不需要到窗口取号，直接缴纳附加费用；在此之前特需门诊和耳鼻喉科的预约挂号仍需到医院取号 <br>3)挂当日号优化 <br>4)挂号及挂号单详情界面优化，显示费用明细信息 <br>5)报告功能优化，支持查看多个图片检查报告<br>6)绑定病历号界面输入功能优化 <br>7)当日挂号界面显示优化 <br>8)挂号支付结果显示优化<br>9)在线建档按钮样式优化<br>10)修正了部分已知的bug"
      },
      {
        "id": "58bfe8665f15030001a01b64",
        "ver": 30200,
        "url": "http://123.172.120.174/imtt.dd.qq.com/16891/9C27D1D3EC4C5F98B9EFC0DAB1865730.apk?mkey=58bffaa6924608ce&f=8f88&c=0&fsname=com.proper.soft.mobile.isj_3.2.0_302002.apk&csr=1bbd&p=.apk",
        "note": "v3.2.0版本更新内容：<br>1.科室列表及搜索医生进行优化，更快更节省流量 <br>2.预约时间界面用户体验优化 <br>3.用户反馈界面体验优化 <br>4.增加退出时确认 <br>5.对性能进行优化，更节省流量"
      }
    ],
    "count": 6
  },
  "POST:/admin/app/versions": (req, res) => {
    res.send('添加成功')
  },
  "PUT:/admin/app/versions/:id": (req, res) => {
    res.status(200).send('');
  },
  "GET:/admin/app/versions/latest": {
    "id": "59b6211d59080100016ff091",
    "ver": 304002,
    "url": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk?fsname=com.proper.soft.mobile.isj_3.4.0_304002.apk&csr=1bbd",
    "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
  },
  "PUT:/admin/app/versions/latest": (req, res) => {
    res.send('发布成功');
  },
  "DELETE:/admin/app/versions/:id": (req, res) => {
    res.status(200).send('');
  },
  "GET:/admin/app/versions/:id": {
    "id": "59b6211d59080100016ff091",
    "ver": 304002,
    "url": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk?fsname=com.proper.soft.mobile.isj_3.4.0_304002.apk&csr=1bbd",
    "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
  },
}