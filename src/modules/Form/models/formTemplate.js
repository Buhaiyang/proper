import { queryFormTemplate, queryTemplateById, deleteTemplates, saveOrUpdateTemplate,
  deleteTemplate} from '../services/formTemplateS';

export default {
  namespace: 'formTemplate',
  state: {
    grid: {
      list: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 10
      },
    },
    entity: {}
  },
  effects: {
    *fetch({ payload = {} }, { call, put }) {
      const resp = yield call(queryFormTemplate, payload);
      yield put({
        type: 'saveGrid',
        payload: resp
      })
    },
    *fetchById({ payload, callback }, { call, put }) {
      const resp = yield call(queryTemplateById, payload);
      yield put({
        type: 'saveEntity',
        payload: resp
      })
      if (callback) callback(resp)
    },
    *saveOrUpdate({payload, callback}, {call, put}) {
      const resp = yield call(saveOrUpdateTemplate, payload);
      yield put({
        type: 'saveEntity',
        payload: resp
      })
      if (callback) callback(resp)
    },
    *remove({payload, callback}, {call}) {
      const resp = yield call(deleteTemplate, payload);
      if (callback) callback(resp)
    },
    *batchRemove({payload, callback}, {call}) {
      const resp = yield call(deleteTemplates, payload);
      if (callback) callback(resp)
    },
  },

  reducers: {
    saveGrid(state, action) {
      return {
        ...state,
        grid: {
          ...state.grid,
          list: action.payload.result
        }
      }
    },
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
    }
  }
};
