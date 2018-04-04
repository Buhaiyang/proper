import { queryOrganization, saveOrUpdate, batchDelete, queryOrgById} from '../services/hrmOrganizationS';
import { formatter, controlMenu } from '../../../utils/utils';

export default {
  namespace: 'hrmOrganization',

  state: {
    organizationInfo: {},
    treeData: [],
    parentTreeData: []
  },

  effects: {
    // 获得所有部门(左侧树)
    *fetchOrgTree({ payload, callback }, { call, put }) {
      const response = yield call(queryOrganization, payload);
      const menus = formatter(controlMenu(response));
      yield put({
        type: 'saveTreeData',
        payload: menus,
      });
      if (callback) callback();
    },
    // 新建或者更新
    *createOrUpdate({ payload, callback }, { call }) {
      const response = yield call(saveOrUpdate, payload);
      if (callback) callback(response);
    },
    // 批量删除
    *deleteOrg({ payload, callback }, { call }) {
      const response = yield call(batchDelete, payload);
      if (callback) callback(response);
    },
    // 查询上级部门(所有部门)
    *fetchParentTreeData({ payload, callback }, { call, put }) {
      const response = yield call(queryOrganization, payload);
      response.forEach((item)=> {
        const data = item
        data.title = data.name
        data.key = data.id
        data.value = data.id
      })
      const menus = formatter(controlMenu(response));
      yield put({
        type: 'saveParentTreeData',
        payload: menus
      })
      if (callback) callback(menus);
    },
    // 查询单个部门
    *fetchById({ payload, callback }, { call, put }) {
      const response = yield call(queryOrgById, payload);
      yield put({
        type: 'saveOrgInfo',
        payload: response
      })
      if (callback) callback(response);
    },
  },

  reducers: {
    saveOrgInfo(state, action) {
      return {
        ...state,
        organizationInfo: action.payload
      };
    },
    saveTreeData(state, action) {
      return {
        ...state,
        treeData: action.payload
      };
    },
    saveParentTreeData(state, action) {
      return {
        ...state,
        parentTreeData: action.payload
      };
    },
    clear(state) {
      return {
        ...state,
        organizationInfo: {},
      }
    },
  }
}
