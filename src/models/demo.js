import { queryDemo } from '../services/demoS';

export default {
  namespace: 'demo',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    size: 'default'
  },

  effects: {
    *fetch({ payload = {} }, { call, put }) {
      const resp = yield call(queryDemo, payload);
      yield put({
        type: 'save',
        payload: {list: resp, extraParams: payload.extraParams}
      })
    }
  },

  reducers: {
    save(state, action) {
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
    }
  }
};
