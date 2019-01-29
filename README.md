 
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
