import { queryUsers, queryUsersById, deleteUsers, queryUserRoles, queryUserRolesAll, queryUserGroups, queryUserGroupsAll, saveOrUpdateUser} from '../services/auth/authUserS';

export default {
  namespace: 'authUser',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    userBasicInfo: {},
    userRoles: [],
    userRolesAll: [],
    userGroups: [],
    userGroupsAll: [],
    size: 'default'
  },
  effects: {
    *fetch({ payload = {} }, { call, put }) {
      const resp = yield call(queryUsers, payload);
      yield put({
        type: 'saveList',
        payload: {list: resp.data, extraParams: payload.extraParams}
      })
    },
    *fetchById({ payload, callback }, { call, put }) {
      const resp = yield call(queryUsersById, payload);
      yield put({
        type: 'saveUserBasicInfo',
        payload: resp
      })
      if (callback) callback()
    },
    *fetchUserRoles({ payload }, { call, put }) {
      // 先查用户所有可选角色 再查用户当前角色
      const resp = yield call(queryUserRoles, payload);
      const resp2 = yield call(queryUserRolesAll, payload);
      yield put({
        type: 'saveUserRoles',
        payload: {
          userRoles: resp,
          userRolesAll: resp2
        }
      })
    },
    *fetchUserGroups({ payload }, { call, put}) {
      // 先查用户所有可选用户组 再查用户当前用户组
      const resp = yield call(queryUserGroups, payload);
      const resp2 = yield call(queryUserGroupsAll, payload);
      yield put({
        type: 'saveUserGroups',
        payload: {
          userGroups: resp,
          userGroupsAll: resp2
        }
      })
    },
    *fetchAll({ payload, callback }, { call, put}) {
      // 查询用户所有信息 基本信息、角色信息、用户组信息
      const userBasicInfo = yield call(queryUsersById, payload);
      const userRoles = yield call(queryUserRoles, payload);
      const userGroups = yield call(queryUserGroups, payload);
      yield put({
        type: 'saveAll',
        payload: {
          userBasicInfo,
          userGroups,
          userRoles,
        }
      })
      if (callback) callback()
    },
    *deleteUsers({payload, callback}, {call, put}) {
      yield call(deleteUsers, payload);
      if (callback) callback()
      yield put({
        type: 'fetch'
      })
    },
    *saveOrUpdateUser({payload, callback}, {call}) {
      const resp = yield call(saveOrUpdateUser, payload);
      if (callback) callback(resp)
    },
  },

  reducers: {
    saveList(state, action) {
      // console.log(action)
      return {
        ...state,
        data: {
          list: action.payload.list,
          pagination: {
            extraParams: action.payload.extraParams
          },
        }
      }
    },
    saveUserBasicInfo(state, action) {
      return {
        ...state,
        userBasicInfo: action.payload
      }
    },
    saveUserRoles(state, { payload }) {
      return {
        ...state,
        userRoles: payload.userRoles,
        userRolesAll: payload.userRolesAll,
      }
    },
    saveUserGroups(state, { payload }) {
      return {
        ...state,
        userGroups: payload.userGroups,
        userGroupsAll: payload.userGroupsAll,
      }
    },
    saveAll(state, { payload: {userBasicInfo, userRoles, userGroups} }) {
      return {
        ...state,
        userBasicInfo,
        userRoles,
        userGroups
      }
    },
    clear(state) {
      return {
        ...state,
        userBasicInfo: {},
        userRoles: [],
        userRolesAll: [],
        userGroups: [],
        userGroupsAll: []
      }
    }
  }
};
