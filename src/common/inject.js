import {getApp} from "./frameHelper";
// 在加载Router页面 connect属性之前 注入当前Router页面需要的model
export const inject = (url)=>{
  const app = getApp();
  let arrParam = [];
  if(Array.isArray(url)){
    arrParam = url
  }else{
    arrParam.push(url)
  }
  const loadModel = (arrParam)=>{
    arrParam.forEach((modelUrl)=>{
      if(app._models.some((m)=>{
          return m.namespace === modelUrl.split('/').pop()
        }))
      {
        return false
      }
      app.model(require(`../models/${modelUrl}`).default);
      // if(modelUrl.indexOf('/')===-1){
      //   app.model(require(`../models/${modelUrl}`).default);
      // }else{
      //   app.model(require(`../business/${modelUrl}`).default);
      // }
    })
  }
  return function () {
    loadModel(arrParam)
  }
}


