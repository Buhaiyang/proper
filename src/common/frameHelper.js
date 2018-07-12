import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import app from '../index';


// wrapper of dynamic
export const dynamicWrapper = (component) => {
  return dynamic({
    app,
    models: () => [],
    component: () => {
      if (component().then) {
        return component().then((raw) => {
          const Component = raw.default || raw;
          return props => createElement(Component, {
            ...props,
            routerData: getRouterData(),
          });
        });
      } else {
        return (props) => {
          return createElement(component().default, {
            ...props,
            routerData: getRouterData(),
          });
        };
      }
    },
  });
};

let _menuData = [];
let _routerData = {
  '/customframe': {
    component: dynamicWrapper(()=>import('../layouts/CustomFrameLayout'))
  },
  '/customframe/workflow': {
    component: dynamicWrapper(()=>import('../components/CustomFrame/Workflow'))
  },
  '/customframe/workflowMainPop': {
    component: dynamicWrapper(()=>import('../components/CustomFrame/WorkflowMainPop'))
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
  '/personal-center': {
    component: dynamicWrapper(()=>import('../modules/Base/pages/PersonalCenter'))
  },
};
export const getRouterData = ()=> _routerData;
export const getMenuData = ()=> _menuData;


export const addRoutersData = (routerData)=> {
  if (routerData) {
    _routerData = Object.assign(_routerData, routerData)
    return _routerData
  }
}
export const addMenuData = (menuData)=> {
  if (menuData) {
    menuData.forEach((item) => {
      if (item.route.charAt(0) !== '/') {
        item.route = '/'.concat(item.route);
      }
    })
    _menuData = Object.assign(_menuData, menuData)
    return _menuData
  }
}
