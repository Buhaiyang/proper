import moment from 'moment';
import pathToRegexp from 'path-to-regexp';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - (day * oneDay);

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  const keys = Object.keys(routerData);
  if (keys.length === 0) {
    return [];
  }
  let routes = keys.filter(routePath => routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.route] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.route] = { ...item };
    }
  });
  return keys;
}

function exchangePath2Router(path) {
  const result = [];
  path.split('/').forEach((item) => {
    if (item.indexOf('-') > 0) {
      let arr = '';
      item.split('-').forEach((sItem) => {
        arr += firstUpperCase(sItem);
      });
      if (arr) {
        result.push(arr);
      }
    } else {
      result.push(firstUpperCase(item));
    }
  });
  // const routePath = result.join('/');
  const [moduleName, ...pathName] = result;
  return {
    moduleName,
    pathName: pathName.join('/')
  };
}

function firstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatter(data) {
  return data.map((item) => {
    const { path } = item;
    // if (!isUrl(path)) {
    //   path = item.path;
    // }
    const result = {
      ...item,
      path
    };
    if (item.children) {
      result.children = formatter(item.children);
    }
    return result;
  });
}

export function getRouterDataFromMenuData(res, dynamicWrapper) {
  let routerConfig = null;
  const menuData = getFlatMenuData(res);
  if (!routerConfig) {
    routerConfig = {};
    for (const k in menuData) {
      const menu = menuData[k];
      if (!menu.hideInMenu && (!menu.children || menu.subRoute)) {
        const { moduleName, pathName } = exchangePath2Router(k);
        // console.log(k, '====>', path)
        routerConfig[`/${k}`] = {
          component: dynamicWrapper(()=> import(`../modules/${moduleName}/pages/${pathName}`))
        };
        // if(menu.subRoute && menu.subRoute.length){
        //   menu.subRoute.forEach((sr)=>{
        //   let key = `${k}/${sr.path}`;
        //   const path = exchangePath2Router(key);
        //   routerConfig2[`/${key}`] = {
        //     component:dynamicWrapper(()=>import(`../routes/${path}`))
        //   }
        //   })
        // }
      }
    }
  }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name
    };
    routerData[path] = router;
  });
  return routerData;
}
/* 节流函数 */
export function throttle(func, context, delay, text, mustApplyTime) {
  const fn = func
  clearTimeout(fn.timer);
  fn.cur = Date.now();// 记录当前时间
  if (!fn.start) { // 若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
    fn.start = fn.cur;
  }
  if (fn.cur - fn.start > mustApplyTime) {
    // 当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
    fn.call(context, text);
    fn.start = fn.cur;
  } else {
    fn.timer = setTimeout(()=> {
      fn.call(context, text);
    }, delay);
  }
}

// 处理菜单函数
export function controlMenu(oldMenu, newMenu = []) {
  if (oldMenu != null) {
    for (let i = 0; i < oldMenu.length; i++) {
      const item = oldMenu[i];
      item.path = oldMenu[i].route;
      if (oldMenu[i].parentId == null || oldMenu[i].parentId === '') {
        newMenu.push(oldMenu[i]);
      }
    }
    return delInvalidMenu(culMenu(oldMenu, newMenu));
  } else {
    return [];
  }
}

function culMenu(oldMenu, newMenu) {
  const newMenuTemp = newMenu;
  for (let i = 0; i < newMenuTemp.length; i++) {
    newMenuTemp[i].children = [];
    for (let j = 0; j < oldMenu.length; j++) {
      if (newMenuTemp[i].id === oldMenu[j].parentId) {
        newMenuTemp[i].children.push(oldMenu[j]);
        newMenuTemp[i].children = culMenu(oldMenu, newMenuTemp[i].children);
      }
    }
  }
  return newMenuTemp;
}

// 删除children长度为0的字段
function delInvalidMenu(oldMenu) {
  const temp = oldMenu;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].children.length === 0) {
      delete temp[i].children;
    } else {
      temp[i].children = delInvalidMenu(temp[i].children);
    }
  }
  return temp;
}

// 处理workflow的日期格式
export function formatDate(date) {
  const str1 = date.substr(0, 10);
  const str2 = date.substr(11, 8);
  return `${str1} ${str2}`;
}
