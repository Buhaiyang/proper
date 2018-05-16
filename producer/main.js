const fs = require('fs');
const path = require('path');
const config = require('./config');
const parse = require('./util');

const {readdir} = fs;
// 浏览器的路由路径
const { routePath} = config;
// moduleName: 模块名称, modelName: dva中的model名称, pageName: 页面的page入口文件名称
const {moduleName, modelName, pageName} = parse(routePath);

console.log(`当前路由为${routePath},代码生成开始...`);
// 当前工程中业务模块的路径
const modulePath = '../src/modules';
// dva中的model模板的路径
const modelTplPath = './tpl/model.tpl';
// 页面的page入口文件模板的路径
const pageTplPath = './tpl/page.tpl';
// 页面的service文件模板的路径
const serviceTplPath = './tpl/service.tpl';
// 读取文件
const readFile = (filePath, callback)=>{
  fs.readFile(filePath, 'utf-8', (err, res)=> {
    if (err) {
      console.error(err);
      return
    }
    callback && callback(res)
  })
}
const writeFile = (filePath, data, callback)=>{
  fs.writeFile(filePath, data, (err, res)=> {
    if (err) {
      console.error(err);
      return
    }
    callback && callback(res)
  })
}
// 替换tpl中的模板字符串${}
const replaceFileTemplateStr = (str, variableName, name)=>{
  const content = 'return'.concat('`').concat(str).concat('`');
  const fun = new Function(variableName, content);
  return fun(name);
}
// 写入一个model文件
const generateFile = (content, fileName, type, callback)=>{
  readdir(`${modulePath}/${moduleName}`, (err, paths)=>{
    if (err) {
      fs.mkdirSync(`${modulePath}/${moduleName}`);
      console.log(`【/${moduleName}】目录创建成功。`)
      fs.mkdirSync(`${modulePath}/${moduleName}/${type}`);
      console.log(`【/${moduleName}/${type}】目录创建成功。`)
    } else {
      if (!paths.includes(type)) {
        fs.mkdirSync(`${modulePath}/${moduleName}/${type}`);
        console.log(`【/${moduleName}/${type}】目录创建成功。`);
      }
    }
    writeFile(`${modulePath}/${moduleName}/${type}/${fileName}.js`, content, (res)=>{
      console.log(`======${modulePath}/${moduleName}/${type}/${fileName}.js====== ${fileName}.js文件创建成功!!!`);
      callback && callback()
    })
  })
}

// 生成model
readFile(modelTplPath, (str)=>{
  const content = replaceFileTemplateStr(str, 'modelName', modelName);
  generateFile(content, modelName, 'models',f=>{
    // 生成page
    readFile(pageTplPath, (str)=>{
      const content = replaceFileTemplateStr(str, 'modelName', modelName);
      generateFile(content, pageName, 'pages', f=>{
        // 生成service
        readFile(serviceTplPath, (str)=>{
          const content = replaceFileTemplateStr(str, 'routeName', routePath);
          generateFile(content, `${modelName}S`, 'services', f=>{
            console.log('代码生成结束###')
          });
        });
      });
    });
  });
});
