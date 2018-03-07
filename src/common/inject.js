import {getApp} from './frameHelper';
// 在加载Router页面 connect属性之前 注入当前Router页面需要的model
export const inject = (url)=> {
  const app = getApp();
  const registeredModels = app._models;
  let arrParam = [];
  if (Array.isArray(url)) {
    arrParam = url
  } else {
    arrParam.push(url)
  }
  const loadModel = (dependArr)=> {
    dependArr.forEach((modelUrl)=> {
      if (!registeredModels.some(model => model.namespace === modelUrl)) {
        app.model(require(`../models/${modelUrl}`).default);
      }
    })
  }
  return ()=>{
    loadModel(arrParam)
  }
}

