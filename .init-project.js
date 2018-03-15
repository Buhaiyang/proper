/**
 * 初始化业务模块
 * 即copy node_modules下@pea/module-xxx/中的文件到src/modules下
 * ####注意：此功能建议项目安装完成之后执行一次仅切一次此命令########
 */
const fs = require('fs');

const { stat } = fs;
const libPath = './node_modules/@pea';
const tarPath = './src/modules';
let inputArgs = '';
process.argv.forEach((val, index) => {
  if (index === 2) {
    if (val !== 'all') {
      inputArgs = val.split(',')
    } else {
      inputArgs = 'all';
    }
  }
});
const copy = (src, dst)=>{
  // 读取目录
  fs.readdir(src, (err, paths)=>{
    if (err) {
      throw err;
    }
    paths.forEach((path)=>{
      const _src = `${src}/${path}`;
      const _dst = `${dst}/${path}`;
      let readable;
      let writable;
      stat(_src, (err2, st)=>{
        if (err2) {
          throw err2;
        }
        if (st.isFile()) {
          readable = fs.createReadStream(_src);// 创建读取流
          writable = fs.createWriteStream(_dst);// 创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          copyFileIfExist(_src, _dst, copy);
        }
      });
    });
  });
}
const copyFileIfExist = (src, dst, callback, moduleName)=>{
  // 测试源文件夹下是否有文件
  fs.exists(src, (isSrcExist)=>{
    if (!isSrcExist) {
      console.error(`error:请安装@${src.split('@')[1]}模块`)
    } else {
      // 测试某个路径下文件是否存在
      fs.exists(dst, (isDstExist)=>{
        if (isDstExist) {
          moduleName && console.log(`加载${moduleName}模块...`)
          callback(src, dst);
        } else {
          fs.mkdir(dst, ()=>{ // 创建目录
            moduleName && console.log(`加载${moduleName}模块...`)
            callback(src, dst)
          })
        }
      })
    }
  })
}
if (inputArgs === 'all') {
  // TODO 安装所有模块
} else {
  if (Array.isArray(inputArgs)) {
    inputArgs.map(str=>str.charAt(0).toUpperCase() + str.slice(1)).forEach((fileName)=>{
      copyFileIfExist(`${libPath}/module-${fileName}`, `${tarPath}/${fileName}`, copy, fileName)
    })
  }
}
