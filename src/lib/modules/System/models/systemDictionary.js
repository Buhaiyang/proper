import { fetchById, remove, saveOrUpdate } from '../services/systemDictionaryS';

export default {
  namespace: 'systemDictionary',
  state: {
    entity: {},
  },
  effects: {
    *fetchById({ payload, callback }, { call, put }) {
      const resp = yield call(fetchById, payload);
      yield put({
        type: 'saveEntity',
        payload: resp
      })
      if (callback) callback(resp)
    },
    *saveOrUpdate({payload, callback}, {call, put}) {
      const resp = yield call(saveOrUpdate, payload);
      yield put({
        type: 'saveEntity',
        payload: resp
      })
      if (callback) callback(resp)
    },
    *remove({payload, callback}, {call}) {
      const resp = yield call(remove, payload);
      if (callback) callback(resp)
    }
  },
  reducers: {
    saveEntity(state, action) {
      return {
        ...state,
        entity: action.payload.result
      }
    },
    clearEntity(state) {
      return {
        ...state,
        entity: {}
      }
    },
  }
};
