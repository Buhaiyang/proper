import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let _app = null;
/**
 * 初始化系统的全局变量包括
 * app routerData 等
 */

export const initGlobalVars = (app)=> {
  if (_app === null && app) {
    _app = app
  }
}

export const getApp = ()=> _app;

// wrapper of dynamic
export const dynamicWrapper = (component) => {
  return dynamic({
    app: getApp(),
    models: () => [],
    component: () => {
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: getRouterData(),
        });
      });
    },
  });
};
let _routerData = {
  '/customframe': {
    component: dynamicWrapper(()=>import('../layouts/CustomFrameLayout'))
  },
  '/customframe/exam': {
    component: dynamicWrapper(()=>import('../components/CustomFrame/Exam/index'))
  },
  '/base': {
    component: dynamicWrapper(()=>import('../layouts/UserLayout'))
  },
  '/base/login': {
    component: dynamicWrapper(()=>import('../modules/Base/pages/Login'))
  },
  '/base/register': {
    component: dynamicWrapper(()=>import('../modules/Base/pages/Register'))
  },
  '/base/register-result': {
    component: dynamicWrapper(()=>import('../modules/Base/pages/RegisterResult'))
  },
  '/': {
    component: dynamicWrapper(()=>import('../layouts/BasicLayout'))
  },
  '/main': {
    component: dynamicWrapper(()=>import('../modules/Base/pages/Main'))
  },
};
export const getRouterData = ()=> _routerData;


export const addRoutersData = (routerData)=> {
  if (routerData) {
    _routerData = Object.assign(_routerData, routerData)
    return _routerData
  }
}

