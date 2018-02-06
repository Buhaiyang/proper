

# Proper Platform


普日软件PC管理端一体化平台 （基于[ANT DESIGN PRO](https://pro.ant.design/index-cn)）

![](https://gw.alipayobjects.com/zos/rmsportal/xEdBqwSzvoSapmnSnYjU.png)

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn

## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
- 一个例子 
```

## 使用

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # 访问 http://localhost:8000
```

也可以使用集成化的 [ant-design-pro-cli](https://github.com/ant-design/ant-design-pro-cli) 工具。

```bash
$ npm install ant-design-pro-cli -g
$ mkdir pro-demo && cd pro-demo
$ pro new
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 兼容性

现代浏览器及 IE11。

## 编码规范

- 代码结构
```
- src
  - assets (--静态资源相关)
  - common (--基于pro框架改造的相关代码)
  - components (--基于pro的一些公共组件)
  - e2e (--自动化测试相关)
  - layouts (--页面布局相关)
  - models (--dva中的model)
  - pages (--页面入口文件)
  - services (--mock数据的DAO层)
  - utils (--纯工具函数库相关)
```
- 书写规范
  * 目录规范
      
      按照上述 `代码结构`，业务代码一般通常会写在`models`、`pages`、`services` 3个文件夹中
      如果有其他需求可按照目录结构自行添加相应文件 <span style="color:#000">不允许私自建立、修改、删除当前目录结构</span>
  *   命名规范
  
       `models`文件夹中不允许建立 `文件夹` 并且文件必须是`.js`文件 ,命名方式 `全小写` 或 `驼峰命名`。
       
       `pages` 文件夹的命名必须 `首字母大写` ，名称采用`一个单词`，一般是你业务模块的名称。
               文件夹中`.js`、`.less`文件必须 `首字母大写`。 ###注:`驼峰命名`  时也要求`首字母大写` 。文件夹与`.js`文件名称与你后台菜单管理中的path相对应### 
               
       `services` 根据你的业务模块建立相应文件夹与之对应。
  *   编码规范
  
        #####`.js`文件中一律使用`ES5`、`ES6`形式声明类、变量、方法、回调函数等。
        
        一个`class`文件的结构大概是这样的
        ```
        - /src/pages/Demo/Demo.js
        
        1  import ...;
        2  @inject('demo')
        3  @connect(({demo,loading})=>({...}))
        4  export default class Demo extends React.PureComponent{...}
        ```
        以上示例代码中需要注意以下几点
        
          1.最上方写入依赖的信息即`import`引入的信息 。不允许出现`变量声明`与`import`混写的情况。
          
          2.@inject @connect修饰符必须声明在 class的上方。不允许在class的最后结尾处声明修饰符注入对象的情况。
          
        #####`.less`文件中类名一律`全小写`或 `驼峰命名`。 `:global`覆盖的组件样式，上层必须自定义类名包裹如下:
        
            .standardList {
                :global {
                  .ant-card-head {
                    border-bottom: none;
                  }
                }
            }
  
  
  
      

