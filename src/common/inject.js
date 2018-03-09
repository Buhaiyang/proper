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
        const modelName = parseModuleNameByModelUrl(modelUrl);
        app.model(require(`../modules/${modelName}/models/${modelUrl}`).default);
      }
    })
  }
  return ()=>{
    loadModel(arrParam)
  }
}
// 通过modelUrl解析出modelName
// 如通过authUser解析出Auth
const reg = /^[A-Z]+$/;
const parseModuleNameByModelUrl = (modelUrl) => {
  let result = ''
  const arr = [];
  const letters = modelUrl.split('');
  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    if (!reg.test(l)) {
      arr.push(l)
    } else {
      break
    }
  }
  if (arr.length) {
    arr[0] = arr[0].toUpperCase()
    result = arr.join('');
  }
  return result;
}
