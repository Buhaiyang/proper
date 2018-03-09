import { queryGroups, updateUserGroups, removeAllUserGroups,
  removeUserGroups, createOrUpdateUserGroups, queryUserGroupsById,
  queryGroupUsers } from '../services/authGroupsS';
import { queryUsers, queryUserGroups } from '../services/authUserS';

export default {
  namespace: 'authGroups',

  state: {
    groupsData: [],
    groupsMessageData: '',
    groupsBasicInfo: {},
    groupUsers: [],
    allUsers: [],
    userGroups: [],
    pagination: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // 所有的用户组信息
      const response = yield call(queryGroups, payload);
      yield put({
        type: 'getUserGroups',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchUserGroups({ payload, callback }, { call, put}) {
      // 查找已选中用户的用户组
      const response = yield call(queryUserGroups, payload);
      yield put({
        type: 'saveUserGroups',
        payload: {
          groupUsers: Array.isArray(response) ? response : [],
        }
      })
      if (callback) callback();
    },
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryUserGroupsById, payload);
      yield put({
        type: 'getGroupsBasicInfo',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchUserAll({ payload, callback }, { call, put}) {
      // 查找所有的用户
      const res = yield call(queryUsers, payload);
      yield put({
        type: 'saveGroupUserAll',
        payload: {
          allUsers: res.data
        }
      })
      if (callback) callback();
    },
    *fetchGroupUsers({ payload, callback }, { call, put}) {
      // 查找已选中的用户
      const response = yield call(queryGroupUsers, payload);
      yield put({
        type: 'saveGroupUsers',
        payload: {
          groupUsers: Array.isArray(response) ? response : [],
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
    saveGroupUsers(state, { payload }) {
      return {
        ...state,
        groupUsers: payload.groupUsers
      }
    },
    saveUserGroups(state, { payload }) {
      return {
        ...state,
        userGroups: payload.groupUsers
      }
    },
    saveGroupUserAll(state, { payload }) {
      return {
        ...state,
        allUsers: payload.allUsers
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
