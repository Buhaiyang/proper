import { queryUserGroups, updateUserGroups, removeAllUserGroups,
  removeUserGroups, createOrUpdateUserGroups, queryUserGroupsById,
  queryGroupUsers } from '../services/auth/authGroupsS';
import { queryUsers } from '../services/auth/authUserS';

export default {
  namespace: 'authGroups',

  state: {
    groupsData: [],
    groupsMessageData: '',
    groupsBasicInfo: {},
    groupUsers: [],
    allUsers: [],
    pagination: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserGroups, payload);
      yield put({
        type: 'getUserGroups',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryUserGroupsById, payload);
      yield put({
        type: 'getGroupsBasicInfo',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchUserGroups({ payload, callback }, { call, put}) {
      // 查找所有的用户和已选中的用户
      const res = yield call(queryUsers, payload);
      const response = yield call(queryGroupUsers, payload);
      yield put({
        type: 'saveGroupUser',
        payload: {
          allUsers: res.data,
          groupUsers: response
        }
      })
      if (callback) callback();
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
    *createOrUpdate({ payload, callback }, { call }) {
      yield call(createOrUpdateUserGroups, payload);
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
    getGroupsBasicInfo(state, action) {
      return {
        ...state,
        groupsBasicInfo: action.payload
      }
    },
    getMessages(state, action) {
      return {
        ...state,
        groupsMessageData: action.payload
      };
    },
    saveGroupUser(state, { payload }) {
      return {
        ...state,
        allUsers: payload.allUsers,
        groupUsers: payload.groupUsers
      }
    },
    clear(state) {
      return {
        ...state,
        groupsBasicInfo: {},
        groupUser: []
      }
    }
  },
};
