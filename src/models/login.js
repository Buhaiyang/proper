import { routerRedux } from 'dva/router';
import { login } from '../services/api';

export default {
  namespace: 'login',

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
      }
    },
    *logout(_, { put }) {
      window.localStorage.removeItem('proper-auth-login-token');
      yield put(routerRedux.push('/user/login'));
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
