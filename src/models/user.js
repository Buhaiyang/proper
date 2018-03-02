import { query as queryUsers, queryCurrent, queryCurrentMenus } from '../services/user';
import { getRouterDataFromMenuData, formatter, controlMenu } from '../utils/utils';
import { dynamicWrapper, addRoutersData } from '../common/frameHelper';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    menus: [],
    routerData: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchMenus(_, { call, put }) {
      const response = yield call(queryCurrentMenus);
      const menus = formatter(controlMenu(response));

      yield put({
        type: 'saveMenus',
        payload: menus
      });
      yield put({
        type: 'saveRouters',
        payload: getRouterDataFromMenuData(menus, dynamicWrapper),
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveMenus(state, action) {
      return {
        ...state,
        menus: action.payload
      }
    },
    saveRouters(state, action) {
      // console.log('bad',action.payload)
      // console.log('ok',getRouterData(getApp()))
      const routerData = addRoutersData(action.payload)
      return {
        ...state,
        routerData
      }
    }
  },
};
