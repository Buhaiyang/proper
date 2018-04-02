import { employeeDelete, employeeAddUsers, queryEmployeeInfo, queryOrganization, createOrUpdate } from '../services/hrmEmployeeS';
import { formatter, controlMenu } from '../../../utils/utils';

export default {
  namespace: 'hrmEmployee',

  state: {
    messageText: '',
    employeeInfo: {},
    organization: []
  },

  effects: {
    *employeeRemove({ payload, callback }, { call, put }) {
      const response = yield call(employeeDelete, payload);
      yield put({
        type: 'saveMessages',
        payload: response,
      });
      if (callback) callback();
    },
    *employeeAddUsers({ payload, callback }, { call, put }) {
      const response = yield call(employeeAddUsers, payload);
      yield put({
        type: 'saveMessages',
        payload: response,
      });
      if (callback) callback();
    },
    // 获得某个人员的信息
    *employeeInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryEmployeeInfo, payload);
      yield put({
        type: 'saveEmployeeInfo',
        payload: response,
      });
      if (callback) callback();
    },
    // 获得所有部门
    *fetchOrganization({ payload, callback }, { call, put }) {
      const response = yield call(queryOrganization, payload);
      const menus = formatter(controlMenu(response));
      yield put({
        type: 'saveOrganization',
        payload: menus,
      });
      if (callback) callback();
    },
    // 新建或者更新
    *createOrUpdate({ payload, callback }, { call, put }) {
      const response = yield call(createOrUpdate, payload);
      yield put({
        type: 'saveMessages',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    saveMessages(state, action) {
      return {
        ...state,
        messageText: action.payload
      };
    },
    saveEmployeeInfo(state, action) {
      return {
        ...state,
        employeeInfo: action.payload
      };
    },
    saveOrganization(state, action) {
      return {
        ...state,
        organization: action.payload
      };
    },
    clear(state) {
      return {
        ...state,
        employeeInfo: {},
      }
    },
  }
}