import * as service from './service';

export default {
  namespace: 'OopForm$model',
  state: {
    dictData: []
  },
  effects: {
    *findDictData({ payload = {}}, {call, put}) {
      const {catalog} = payload;
      const response = yield call(service.fetchDictionary, {catalog});
      yield put({
        type: 'saveDictData',
        payload: {response, catalog}
      })
    }
  },
  reducers: {
    saveDictData(state, action) {
      return {
        [action.payload.catalog]: action.payload.response.result.map(it=>({
          label: it.name,
          value: JSON.stringify({catalog: it.catalog, code: it.code}),
          disabled: !it.enable
        }))
      }
    }
  }
};
