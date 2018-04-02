const fs = require('fs');
const path = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
// var readFile = promisify(fs.readFile);
const fileList = [];
const reg = /^.*js$/;
// 简单实现一个promisify
function promisify(fn) {
  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      [].push.call(args, function(err, result) {
        if(err) {
          reject(err);
        }else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}
function readDirRecur(file, callback) {
  return readdir(file).then(function(files) {
    files = files.map(function(item) {
      var fullPath = file + '/' + item;
      return stat(fullPath).then(function(stats) {
        if (stats.isDirectory()) {
          return readDirRecur(fullPath, callback);
        }else{
          if(reg.test(item)){
            callback(item, fullPath);
          }
        }
      })
    });
    return Promise.all(files);
  });
}
const getMockData = (callback)=>{
  readDirRecur('./proxy/modules', function(item, fullPath) {
    const relPath = path.normalize(path.relative(item, fullPath));
    const map = require(relPath);
    const methods = 'GET,POST,PUT,DELETE';
    // TODO unused
    if (Object.keys(map)[0] != null) {
      if(methods.indexOf((Object.keys(map)[0]).split(':')[0]) !== -1){
        fileList.push(map)
      }
    }
  }).then(function() {
    callback && callback(fileList)
  }).catch(function(err) {
    console.log(err);
  });
}
module.exports = getMockData
