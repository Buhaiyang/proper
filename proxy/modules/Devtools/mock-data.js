module.exports = {
  "GET:/admin/app/versions": [
      {
        "id": "59b6211d59080100016ff091",
        "released": false,
        "publisher": "陈冰洁",
        "ver": 304002,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66AC311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
      },
      {
        "id": "58f70a9bd601800001bf1046",
        "released": true,
        "publisher": "陈冰洁",
        "publishTime": "2018-06-07 13:14:15",
        "ver": 303002,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "3.3.0版本更新内容：<br>1)3.3.0版本发布后，版本号低于3.3.0的APP应用无法继续使用，请尽快更新 <br>2)4月19日后预约挂号特需VIP和耳鼻喉科不需要到窗口取号，直接缴纳附加费用；在此之前特需门诊和耳鼻喉科的预约挂号仍需到医院取号 <br>3)挂当日号优化 <br>4)挂号及挂号单详情界面优化，显示费用明细信息 <br>5)报告功能优化，支持查看多个图片检查报告<br>6)绑定病历号界面输入功能优化 <br>7)当日挂号界面显示优化 <br>8)挂号支付结果显示优化<br>9)在线建档按钮样式优化<br>10)修正了部分已知的bug"
      },
      {
        "id": "58bfe7ae5f150300019ff911",
        "released": true,
        "publishTime": "2018-06-08 09:00:00",
        "ver": 302002,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "v3.2.0版本更新内容：<br>1.科室列表及搜索医生进行优化，更快更节省流量 <br>2.预约时间界面用户体验优化 <br>3.用户反馈界面体验优化 <br>4.增加退出时确认 <br>5.对性能进行优化，更节省流量"
      },
      {
        "id": "59b622445908010001d0adab",
        "released": true,
        "publishTime": "2018-06-08 09:00:00",
        "ver": 30401,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
      },
      {
        "id": "58f70c0cc9e77c000199a641",
        "released": true,
        "publishTime": "2018-06-08 09:00:00",
        "ver": 30301,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "3.3.0版本更新内容：<br>1)3.3.0版本发布后，版本号低于3.3.0的APP应用无法继续使用，请尽快更新 <br>2)4月19日后预约挂号特需VIP和耳鼻喉科不需要到窗口取号，直接缴纳附加费用；在此之前特需门诊和耳鼻喉科的预约挂号仍需到医院取号 <br>3)挂当日号优化 <br>4)挂号及挂号单详情界面优化，显示费用明细信息 <br>5)报告功能优化，支持查看多个图片检查报告<br>6)绑定病历号界面输入功能优化 <br>7)当日挂号界面显示优化 <br>8)挂号支付结果显示优化<br>9)在线建档按钮样式优化<br>10)修正了部分已知的bug"
      },
      {
        "id": "58bfe8665f15030001a01b64",
        "publishTime": "2018-06-08 09:00:00",
        "ver": 30200,
        "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
        "note": "v3.2.0版本更新内容：<br>1.科室列表及搜索医生进行优化，更快更节省流量 <br>2.预约时间界面用户体验优化 <br>3.用户反馈界面体验优化 <br>4.增加退出时确认 <br>5.对性能进行优化，更节省流量"
      }
  ],
  "POST:/admin/app/versions": (req, res) => {
    res.send('添加成功')
  },
  "PUT:/admin/app/versions/:id": (req, res) => {
    res.status(200).send('');
  },
  "GET:/app/versions/latest": {
    "id": "59b6211d59080100016ff091",
    "ver": 303002,
    "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
    "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
    "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。"
  },
  "PUT:/admin/app/versions/latest": (req, res) => {
    res.send('发布成功');
  },
  "DELETE:/admin/app/versions/:id": (req, res) => {
    res.status(200).send('');
  },
  "GET:/app/versions/:id": {
    "id": "59b6211d59080100016ff091",
    "ver": 303002,
    "statusName": "已发布",
    "androidUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
    "iosUrl": "http://imtt.dd.qq.com/16891/C311946C33251D7BDEF4DA90D57DB66A.apk",
    "note": "v3.4.0版本更新内容：<br>完善功能，优化性能。",
    "publisher": "陈冰洁",
    "publishTime": "2018-06-08 09:00:00",
  },
  "POST:/admin/dev/jwt/encode": (req, res) => {
    res.status(200).send('eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9');
  },
  "POST:/admin/dev/jwt/encode/header": (req, res) => {
    res.status(200).send('sdjfskldjflksjdflksjdfklsdjflksdjfklsjflsdkdkdkdjdkdjdk');
    // res.setHeader('X-PEP-ERR-TYPE', 'PEP_BIZ_ERR');
    // res.status(500).send('失败');
  },
  "GET:/admin/dev/cache": [
    "HIS_IHOS_ONE_DOCTORS", "IHOS.FEE.CARDNO", "IHOS_OUTPATIENT_REGDATE", "PEP.BPM.auto", "RegCountdownRegCountdown"
  ],
  "GET:/admin/dev/cache/:id": [
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbb", "cccc", "ddd", "ee", "f", "xxxxx"
  ],
  "DELETE:/admin/dev/cache": (req, res) => {
    res.status(200).send('delete caches');
  },
  "DELETE:/admin/dev/cache/:id": (req, res) => {
    res.status(200).send('delete cache');
  },
  "GET:/admin/dev/cache/:id/:id": (req, res) => {
    res.status(200).send('# 环境准备 <br>$ npm install -g cordova ionic<br>$ npm install -g cordova-hot-code-push-cli<br>$ npm install<br>$ bower install# 按照 cordova 项目要求,需创建一个 www 路径<br>$ mkdir www# 发布静态资源，通过浏览器访问，自动更新变化<br>$ grunt serve# 或仅发布资源<br>$ ionic serve# 生成源码格式的www目录，以便在设备上调试html和javascript<br>$ grunt srcDist# 注销开发者模式<br>$ grunt delDevMode高版本的 ionic(v3+) 从 package.json 中读取插件的配置发生了变化，之前是 cordovaPlugins 和 cordovaPlatforms，高版本变成了 cordova.plugins 和 cordova.platforms。# 环境准备 <br>$ npm install -g cordova ionic<br>$ npm install -g cordova-hot-code-push-cli<br>$ npm install<br>$ bower install# 按照 cordova 项目要求,需创建一个 www 路径<br>$ mkdir www# 发布静态资源，通过浏览器访问，自动更新变化<br>$ grunt serve# 或仅发布资源<br>$ ionic serve# 生成源码格式的www目录，以便在设备上调试html和javascript<br>$ grunt srcDist# 注销开发者模式<br>$ grunt delDevMode高版本的 ionic(v3+) 从 package.json 中读取插件的配置发生了变化，之前是 cordovaPlugins 和 cordovaPlatforms，高版本变成了 cordova.plugins 和 cordova.platforms。');
  },
  "DELETE:/admin/dev/cache/:id/:id": (req, res) => {
    res.status(200).send('delete cache item');
  },
  "POST:/admin/dev/aes/encrypt": (req, res) => {
    res.status(200).send('Aes加密 成功');
  },
  "POST:/admin/dev/aes/decrypt": (req, res) => {
    res.status(200).send('Aes解密 成功');
  },
  "GET:/msc/:id/:id": {
    "data": [
      { "_id" : { "$oid" : "598d5bb7791c00bbf615977a" }, "name" : "孙帅", "age" : 28, "position" : "辽宁", "degree" : "学士学位", "phone" : "12345838838", "sex" : "男", "height" : "174cm", "weight" : "75kg", "国籍" : "中国", "hosSerialNum" : 0 },
      { "_id" : { "$oid" : "59915aa919191fcffc24a1c0" }, "name" : "李四", "age" : 39, "position" : "北京", "degree" : "高中", "phone" : "12345833390", "sex" : "男", "height" : "189cm", "weight" : "80kg", "国籍" : "中国", "hosSerialNum" : 1 },
      { "_id" : { "$oid" : "59915afa19191fcffc24a1d9" }, "name" : "美女", "age" : 19, "position" : "吉林", "degree" : "研究生", "phone" : "12345833112", "sex" : "女", "height" : "167cm", "weight" : "50kg", "国籍" : "中国", "学校" : "沈阳大学", "hosSerialNum" : 2 },
      { "_id" : { "$oid" : "59915eaf19191fcffc24a300" }, "name" : "孙帅", "age" : 28, "position" : "辽宁", "degree" : "学士学位", "phone" : "12345838838", "sex" : "男", "height" : "174cm", "weight" : "75kg", "国籍" : "中国", "学校" : "沈阳大学", "hosSerialNum" : 3, "userinfo" : { "love" : "pingpang", "ss" :"dd"} }
    ],
    "count": 4
  },
  "GET:/msc/LOGS": {
    "data": [
      {"_id": {"$oid": "1"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:46.662", "clz": "com.proper.enterprise.isj.proxy.service.impl.MedicalReportsServiceImpl:455", "msg": "时间不限"},
      {"_id": {"$oid": "2"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:47.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException"},
      {"_id": {"$oid": "3"}, "lv": "ERROR", "tm": "2017-01-09 22:04:49.662", "clz": "com.proper.enterprise.platform.core.controller.BaseController:103", "msg": "Controller throws an exception:java.io.IOException: Could not open connection to URL: http://172.28.30.10/data/public/public_rsgl/1000011421.jpg\\r\\n\\tat net.coobird.thumbnailator.tasks.io.URLImageSource.read(Unknown Source)\\r\\n\\tat net.coobird.thumbnailator.tasks.SourceSinkThumbnailTask.read(Unknown Source)\\r\\n\\tat net.coobird.thumbnailator.Thumbnailator.createThumbnail(Unknown Source)\\r\\n\\tat net.coobird.thumbnailator.Thumbnails$Builder.toOutputStream(Unknown Source)\\r\\n\\tat com.proper.enterprise.isj.proxy.utils.cache.WebService4FileCacheUtil.cacheDoctorPhoto(WebService4FileCacheUtil.java:76)\\r\\n\\tat com.proper.enterprise.isj.proxy.utils.cache.WebService4FileCacheUtil.getCacheDoctorPhoto(WebService4FileCacheUtil.java:92)\\r\\n\\tat com.proper.enterprise.isj.proxy.utils.cache.WebService4FileCacheUtil$$FastClassBySpringCGLIB$$222ab28.invoke(<generated>)\\r\\n\\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:204)\\r\\n\\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:720)\\r\\n\\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)\\r\\n\\tat org.springframework.cache.interceptor.CacheInterceptor$1.invoke(CacheInterceptor.java:52)\\r\\n\\tat org.springframework.cache.interceptor.CacheAspectSupport.invokeOperation(CacheAspectSupport.java:345)\\r\\n\\tat org.springframework.cache.interceptor.CacheAspectSupport.execute(CacheAspectSupport.java:414)\\r\\n\\tat org.springframework.cache.interceptor.CacheAspectSupport.execute(CacheAspectSupport.java:327)\\r\\n\\tat org.springframework.cache.interceptor.CacheInterceptor.invoke(CacheInterceptor.java:61)\\r\\n\\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)\\r\\n\\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:655)\\r\\n\\tat com.proper.enterprise.isj.proxy.utils.cache.WebService4FileCacheUtil$$EnhancerBySpringCGLIB$$97eeb64d.getCacheDoctorPhoto(<generated>)\\r\\n\\tat com.proper.enterprise.isj.proxy.controller.DoctorController.getDoctorPhoto(DoctorController.java:193)\\r\\n\\tat sun.reflect.GeneratedMethodAccessor217.invoke(Unknown Source)\\r\\n\\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\\r\\n\\tat java.lang.reflect.Method.invoke(Method.java:606)\\r\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:221)\\r\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:136)\\r\\n\\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:114)\\r\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:827)\\r\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:738)\\r\\n\\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:85)\\r\\n\\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:963)\\r\\n\\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:897)\\r\\n\\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:970)\\r\\n\\tat org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:861)\\r\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:624)\\r\\n\\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:846)\\r\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:731)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:303)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\\r\\n\\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\\r\\n\\tat com.proper.enterprise.platform.auth.common.filter.AllowCrossOriginFilter.doFilter(AllowCrossOriginFilter.java:41)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\\r\\n\\tat com.proper.enterprise.platform.auth.jwt.filter.JWTVerifyFilter.doFilter(JWTVerifyFilter.java:55)\\r\\n\\tat org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:346)\\r\\n\\tat org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:262)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\\r\\n\\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:197)\\r\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\\r\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\\r\\n\\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:218)\\r\\n\\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:122)\\r\\n\\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:505)\\r\\n\\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:169)\\r\\n\\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:103)\\r\\n\\tat org.apache.catalina.valves.AccessLogValve.invoke(AccessLogValve.java:956)\\r\\n\\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:116)\\r\\n\\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:442)\\r\\n\\tat org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1082)\\r\\n\\tat org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:623)\\r\\n\\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1756)\\r\\n\\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.run(NioEndpoint.java:1715)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\\r\\n\\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\\r\\n\\tat java.lang.Thread.run(Thread.java:745)"},
      {"_id": {"$oid": "4"}, "lv": "INFO", "tm": "2017-01-09 22:04:50.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException1"},
      {"_id": {"$oid": "5"}, "lv": "WARN", "tm": "2017-01-09 22:04:51.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException2"},
      {"_id": {"$oid": "6"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:52.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException3"},
      {"_id": {"$oid": "7"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:53.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException"},
      {"_id": {"$oid": "8"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:54.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException"},
      {"_id": {"$oid": "9"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:55.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException"},
      {"_id": {"$oid": "10"}, "lv": "DEBUG", "tm": "2017-01-09 22:04:56.663", "clz": "org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler:182", "msg": "Unknown exception type: java.io.IOException"}
    ]
  },
}
