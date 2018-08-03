import * as service from './service';

export default {
  namespace: 'OopForm$model',
  state: {
  },
  effects: {
    *findDictData({ payload = {}}, {call, put}) {
      const {catalog} = payload;
      const response = yield call(service.fetchDictionary, {catalog});
      yield put({
        type: 'saveDictData',
        payload: {response, catalog}
      })
    },
    *findUrlData({payload = {}}, {call, put}) {
      const response = yield call(service.findUrlData, payload);
      yield put({
        type: 'saveUrlData',
        payload: {response, url: payload}
      })
    }
  },
  reducers: {
    saveDictData(state, action) {
      return {
        ...state,
        [action.payload.catalog]: action.payload.response.result.map(it=>({
          label: it.name,
          value: JSON.stringify({catalog: it.catalog, code: it.code}),
          disabled: !it.enable
        }))
      }
    },
    saveUrlData(state, action) {
      return {
        ...state,
        [action.payload.url]: action.payload.response.result.map(it=>({
          label: it.catalogName,
          value: it.id,
          disabled: !it.enable
        }))
      }
    }
  }
};
