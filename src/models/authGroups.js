import { queryUserGroups, updateUserGroups, removeAllUserGroups, removeUserGroups } from '../services/auth/authGroupsS';

export default {
  namespace: 'authGroups',

  state: {
    groupsData: [],
    groupsMessageData: ''
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserGroups, payload);
      yield put({
        type: 'getUserGroups',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUserGroups, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    *removeAll({ payload, callback }, { call, put }) {
      const response = yield call(removeAllUserGroups, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUserGroups, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    getUserGroups(state, action) {
      return {
        ...state,
        groupsData: action.payload
      };
    },
    getMessages(state, action) {
      return {
        ...state,
        groupsMessageData: action.payload
      };
    },
  },
};
