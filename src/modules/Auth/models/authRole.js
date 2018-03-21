// import { queryGroups } from '../services/authGroupsS';
// import { queryUsers } from '../services/authUserS';
import { queryRoles, queryRole, removeRoles, queryRoleUsers, queryRoleGroups, fetchUpdateStatus } from '../services/authRoleS';

export default {
  namespace: 'authRole',

  state: {
    roleList: [],
    messageText: '',
    roleInfo: {},
    roleUsers: [],
    roleGroups: []
  },

  effects: {
    // 所有的角色信息
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'saveRoleList',
        payload: Array.isArray(response) ? response : [],
      });
      if (callback) callback();
    },
    // 取得指定角色ID详情信息
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'saveRoleInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 删除选中的角色信息
    *removeRoles({ payload, callback }, { call, put }) {
      let response = yield call(removeRoles, payload);
      if (response === '') {
        response = '删除成功';
      }
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    // 取得指定角色ID的用户列表
    *fetchRoleUsersById({ payload, callback }, { call, put }) {
      const response = yield call(queryRoleUsers, payload);
      yield put({
        type: 'saveRoleUsers',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 取得指定角色ID的用户组列表
    *fetchRoleGroupsById({ payload, callback }, { call, put }) {
      const response = yield call(queryRoleGroups, payload);
      yield put({
        type: 'saveRoleGroups',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 更新角色列表的状态信息
    *fetchUpdateStatus({ payload, callback }, { call }) {
      yield call(fetchUpdateStatus, payload);
      if (callback) callback();
    }
  },

  reducers: {
    saveRoleList(state, action) {
      return {
        ...state,
        roleList: action.payload
      };
    },
    saveRoleInfo(state, action) {
      return {
        ...state,
        roleInfo: action.payload
      };
    },
    getMessages(state, action) {
      return {
        ...state,
        messageText: action.payload
      };
    },
    saveRoleUsers(state, action) {
      return {
        ...state,
        roleUsers: action.payload
      };
    },
    saveRoleGroups(state, action) {
      return {
        ...state,
        roleGroups: action.payload
      };
    },
  },
};
