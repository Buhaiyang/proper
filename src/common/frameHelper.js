import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let _app = null;
// let routerDataCache;
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
  // transformed by babel-plugin-dynamic-import-node-sync
  // if (component.toString().indexOf('.then(') < 0) {
  //   return (props) => {
  //     if (!routerDataCache) {
  //       routerDataCache = getRouterData(app);
  //     }
  //     return createElement(component().default, {
  //       ...props,
  //       app,
  //       routerData: {},
  //     });
  //   };
  // }
  // () => import('module')
  return dynamic({
    app: getApp(),
    models: () => [],
    // add routerData prop
    component: () => {
      // if (!routerDataCache) {
      //   routerDataCache = getRouterData();
      // }
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
  '/user': {
    component: dynamicWrapper(()=>import('../layouts/UserLayout'))
  },
  '/user/login': {
    component: dynamicWrapper(()=>import('../pages/User/Login'))
  },
  '/user/register': {
    component: dynamicWrapper(()=>import('../pages/User/Register'))
  },
  '/user/register-result': {
    component: dynamicWrapper(()=>import('../pages/User/RegisterResult'))
  },
  '/': {
    component: dynamicWrapper(()=>import('../layouts/BasicLayout'))
  }
};
export const getRouterData = ()=> _routerData;

export const addRoutersData = (routerData)=> {
  if (routerData) {
    _routerData = Object.assign(_routerData, routerData)
    return _routerData
  }
}

