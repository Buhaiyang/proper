import { routerRedux } from 'dva/router';
import { login } from '../services/baseS';

export default {
  namespace: 'baseLogin',

  state: {
    status: undefined,
    showError: false
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // Login successfully
      if (response) {
        window.localStorage.setItem('proper-auth-login-token', response);
        yield put(routerRedux.push('/main'));
        yield put({
          type: 'toggleShowError',
          payload: false
        });
      } else {
        yield put({
          type: 'toggleShowError',
          payload: true
        });
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
    toggleShowError(state, { payload }) {
      return {
        ...state,
        showError: payload,
      };
    }
  },
};
