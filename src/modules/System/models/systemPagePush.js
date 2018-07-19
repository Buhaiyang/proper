import { remove, saveOrUpdate, fetch, getFileInfo } from '../services/systemPagePushS';

export default {
  namespace: 'systemPagePush',
  state: {
    list: []
  },
  effects: {
    *getFileInfo({payload, callback}, {call}) {
      const resp = yield call(getFileInfo, payload);
      console.log(resp)
      if (callback) callback(resp)
    },
    *saveOrUpdate({payload, callback}, {call}) {
      const resp = yield call(saveOrUpdate, payload);
      if (callback) callback(resp)
    },
    *remove({payload, callback}, {call}) {
      const resp = yield call(remove, payload);
      if (callback) callback(resp)
    },
    *fetch({payload, callback}, {call, put}) {
      const resp = yield call(fetch, payload);
      yield put({
        type: 'saveList',
        payload: resp.result.data
      })
      if (callback) callback(resp)
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
  }
}