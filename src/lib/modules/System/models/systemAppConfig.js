import { fetchTreeData, saveOrUpdate, deleteApp } from '../services/systemAppConfigS';

export function formatTreeNode(data) {
  data.forEach((d)=>{
    const item = d
    if (item) {
      item.title = item.typeName;
      item.key = item.code;
      item.parentId = null;
    }
  });
}

export default {
  namespace: 'systemAppConfig',
  state: {
    treeData: []
  },
  effects: {
    *fetchTreeData({ payload = {}, callback}, { call, put }) {
      const resp = yield call(fetchTreeData, payload);
      formatTreeNode(resp.result);
      yield put({
        type: 'saveTreeData',
        payload: resp.result
      })
      if (callback) callback(resp.result)
    },
    *saveOrUpdate({payload, callback}, {call}) {
      const resp = yield call(saveOrUpdate, payload);
      if (callback) callback(resp)
    },
    *deleteApp({payload, callback}, {call}) {
      const resp = yield call(deleteApp, payload);
      if (callback) callback(resp)
    },
  },

  reducers: {
    saveTreeData(state, action) {
      return {
        ...state,
        treeData: action.payload
      }
    },
  }
};
