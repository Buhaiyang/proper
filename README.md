# Proper-enterprise-app


普日软件PC管理端一体化平台 （基于[ANT DESIGN PRO](https://pro.ant.design/index-cn)）

![](https://gw.alipayobjects.com/zos/rmsportal/xEdBqwSzvoSapmnSnYjU.png)

- 预览：https://cloud.propersoft.cn/pea/master/


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

## 模块

```
- 流程设置
  - 流程设计
- 权限管理
  - 用户管理
  - 功能管理
  - 角色管理
  - 用户组管理
- 组织机构
  - 人员管理
```
## 准备工作

1.确保您的电脑已经成功安装了[nodejs](https://nodejs.org/en/download/)和[git](https://git-scm.com/downloads) ,保证版本号 node 9.0.0 +    

2.注册[github](https://github.com/ "github")账号，并申请添加到公司组织对应的github组织上

3.联系运维人员申请公司内网映射npm账号

## 使用

#### 配置内网npm账户
```
npm config set registry http://nexus.propersoft.cn:8081/repository/npm-public/  
npm login                 #登录npm公司私服的账号
username: "you username"  #输入你的用户名和密码
password: "you password"
email:     "按下回车键"

```
#### 复制git代码并启动项目
```
$ git clone     https://github.com/propersoft-cn/proper-enterprise-app.git --depth=1  
$ cd proper-enterprise-app        # 进入项目目录中
$ npm install                     # 下载项目依赖
$ npm start                       # 访问项目服务

```
#### 执行mock数据
 
```
 命令行窗口进入项目文件夹下         
 npm run mock                     # 加载 mock 服务

```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 兼容性

现代浏览器及 IE11。

## 编码规范

- 代码结构
```
- proxy   
  - modules       (--对应模块使用的mock数据)
    - AntdProDemo 
    - Anth
    - EXam
    - HrM 
    - Workflow

- src
  - assets        (--静态资源相关)
  - common        (--基于pro框架改造的相关代码)
  - components    (--基于pro的一些公共组件)
  - e2e           (--自动化测试相关)
  - layouts       (--页面布局相关)
  - modules       (--业务模块)
    - Anth        (--用户权限模块)
      - models    (--dva中的module)
      - pages     (--页面入口文件)
      - services  (--mock数据的DAO层)
    - Base        (--基础模块)
    - Hrm         (--人力资源模块)
    - Workflow    (--工作空间模块)
  - utils         (--纯工具函数库相关)

```

- 书写规范
  * 目录规范
      
      按照上述 `代码结构`，在`modules`文件夹中建立不同的业务模块，业务代码会在`modules`下建立`Anth`文件夹表示权限模块。`Anth`的下一层会建立三个子目录，有`models`、 `pages` 、`services` ，分别负责对业务模块，页面逻辑，获取服务等。
      如果有其他需求可按照目录结构自行添加相应文件 **不允许私自建立、修改、删除当前目录结构**
 
  *   命名规范

       `modules`
        文件夹中可以新建不同的功能模块的文件夹，但是子目录的 `文件名称` 必须 `首字母大写`

       `Anth/models`
        文件夹中不允许建立 `文件夹` 并且文件必须是`.js`文件 ,命名方式 `全小写` 或 `驼峰命名`。
        名称应该与相关业务pages下的文件夹与文件夹下的Page文件组成驼峰命名 如 page文件路径 pages/Auth/User.js  那么页面User.js 相应的model名为authUser.js
       
       `Anth/pages` 文件夹的命名必须 `首字母大写` ，名称采用`一个单词`，一般是你业务模块的名称。
        文件夹中`.js`、`.less`文件必须 `首字母大写`。 ###注:`驼峰命名`  时也要求`首字母大写` 。文件夹与`.js`文件名称与你后台菜单管理中的path相对应### 
               
       `Anth/services` 文件夹中的 services 名称 必须以 model名称后+大写的'S'命名 以注明这是一个service文   件 例如：如model名称 authUser.js 那么service名称 authUserS.js
 
  *   编码规范
  
        `.js`文件中一律使用`ES5`、`ES6`形式声明类、变量、方法、箭头函数等。
        
        一个`class`文件的结构大概是这样的

        ```
        - /src/modules/Anth/pages/Demo.js
        
        1  import ...;
        2
        3  @inject('demo')
        4  @connect(({demo,loading})=>({...}))
        5  export default class Demo extends React.PureComponent{...}
          
        ```

        以上示例代码中需要注意以下几点以上示例代码中需要注意以下几点
        
        1.最上方写入依赖的信息即`import`引入的信息 。不允许出现 `变量声明` 与 `import` 混写的情况。

        2.根据代码规范`import`其他声明或者注入的代码之间需要`空一行`进行隔断，让代码的解构更清晰。
          
        3.@inject @connect修饰符必须声明在 `class`的上方。不允许在`class`的最后结尾处声明修饰符注入对象的情况。
         
        
          
        `.less` 文件中类名一律`全小写`或 `驼峰命名`。 `:global`覆盖的组件样式，上层必须自定义类名包裹如下:


         ```
            .standardList {
                :global {
                  .ant-card-head {
                    border-bottom: none;
                  }
                }
            }

         ```