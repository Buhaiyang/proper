import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { login } from '../services/api';

export default {
  namespace: 'baseLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // Login successfully
      if (response) {
        window.localStorage.setItem('proper-auth-login-token', response);
        yield put(routerRedux.push('/'));
      } else {
        notification.error({
          message: '登录失败',
          description: '用户名或者密码错误'
        })
      }
    },
    *logout(_, { put }) {
      window.localStorage.removeItem('proper-auth-login-token');
      yield put(routerRedux.push('/base/login'));
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
