import { queryGroups } from '../services/authGroupsS';
import { queryUsers } from '../services/authUserS';
import { queryCurrentMenus } from '../../Base/services/baseS';
import { queryRoles, queryRole, removeRoles, queryRoleUsers, queryRoleGroups, fetchUpdateStatus,
  createOrUpdate, queryParents, queryCheckedMenus, menusAdd, menusDelete,
  userAddRole, userDelRole, GroupAddRole, GroupDelRole } from '../services/authRoleS';
import { formatter, controlMenu } from '../../../utils/utils';

export default {
  namespace: 'authRole',

  state: {
    roleList: [],
    messageText: '',
    roleInfo: {},
    roleUsers: [],
    allUsers: [],
    roleGroups: [],
    allGroups: [],
    roleParents: [],
    roleMenus: [],
    roleMenusChecked: [],
  },

  effects: {
    // 所有的角色信息
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'saveRoleList',
        payload: Array.isArray(response) ? response : [],
      });
      if (callback) callback(response);
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
    },
    // 新建或者更新角色
    *createOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(createOrUpdate, payload);
      yield put({
        type: 'saveRoleInfo',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 取得能够被继承的父节点列表
    *fetchParents({ payload, callback }, { call, put }) {
      const response = yield call(queryParents, payload);
      yield put({
        type: 'saveRoleParents',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 取得指定角色的菜单列表
    *fetchMenus({ payload, callback }, { call, put }) {
      const allMenus = yield call(queryCurrentMenus);
      const menus = formatter(controlMenu(allMenus));
      const checkMenus = yield call(queryCheckedMenus, payload);
      const checked = [];
      for (let i = 0; i < checkMenus.length; i++) {
        if (checkMenus[i].leaf) {
          checked.push(checkMenus[i]);
        }
      }
      yield put({
        type: 'saveRoleMenus',
        payload: {menus, checked},
      });
      if (callback) callback();
    },
    // 菜单添加项
    *menusAdd({ payload, callback }, { call }) {
      yield call(menusAdd, payload);
      if (callback) callback();
    },
    // 菜单删除项
    *menusDelete({ payload, callback }, { call }) {
      yield call(menusDelete, payload);
      if (callback) callback();
    },
    // 取得所有用户
    *fetchAllUsers({ payload, callback }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'saveAllUsers',
        payload: response.data,
      });
      if (callback) callback();
    },
    // 取得所有用户组
    *fetchAllGroups({ payload, callback }, { call, put }) {
      const response = yield call(queryGroups, payload);
      yield put({
        type: 'saveAllGroups',
        payload: response,
      });
      if (callback) callback();
    },
    // 角色添加用户
    *roleAddUsers({ payload, callback }, { call, put }) {
      const response = yield call(userAddRole, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    // 角色删除用户
    *roleDelUsers({ payload, callback }, { call, put }) {
      const response = yield call(userDelRole, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    // 角色添加用户组
    *roleAddGroups({ payload, callback }, { call, put }) {
      const response = yield call(GroupAddRole, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    // 角色删除用户组
    *userDelGroups({ payload, callback }, { call, put }) {
      const response = yield call(GroupDelRole, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
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
    saveRoleParents(state, action) {
      return {
        ...state,
        roleParents: action.payload
      };
    },
    saveRoleMenus(state, action) {
      return {
        ...state,
        roleMenus: action.payload.menus,
        roleMenusChecked: action.payload.checked
      };
    },
    saveAllUsers(state, action) {
      return {
        ...state,
        allUsers: action.payload
      };
    },
    saveAllGroups(state, action) {
      return {
        ...state,
        allGroups: action.payload
      };
    },
    clear(state) {
      return {
        ...state,
        roleInfo: {},
        roleUsers: [],
        roleGroups: [],
        allUsers: [],
        allGroups: []
      }
    },
  },
};
