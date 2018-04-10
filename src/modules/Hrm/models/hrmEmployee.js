import { employeeDelete, employeeAddUsers, queryEmployeeInfo, queryOrganization, createOrUpdate } from '../services/hrmEmployeeS';
import { formatter, controlMenu } from '../../../utils/utils';

export default {
  namespace: 'hrmEmployee',

  state: {
    employeeInfo: {},
    organization: []
  },

  effects: {
    *employeeRemove({ payload, callback }, { call }) {
      const response = yield call(employeeDelete, payload);
      if (callback) callback(response);
    },
    *employeeAddUsers({ payload, callback }, { call }) {
      const response = yield call(employeeAddUsers, payload);
      if (callback) callback(response);
    },
    // 获得某个人员的信息
    *employeeInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryEmployeeInfo, payload);
      yield put({
        type: 'saveEmployeeInfo',
        payload: response.result,
      });
      if (callback) callback(response);
    },
    // 获得所有部门
    *fetchOrganization({ payload, callback }, { call, put }) {
      const response = yield call(queryOrganization, payload);
      const menus = formatter(controlMenu(response.result));
      yield put({
        type: 'saveOrganization',
        payload: menus,
      });
      if (callback) callback(response);
    },
    // 新建或者更新
    *createOrUpdate({ payload, callback }, { call }) {
      const response = yield call(createOrUpdate, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
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