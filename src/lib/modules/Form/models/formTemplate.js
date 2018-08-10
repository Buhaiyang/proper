import { queryFormTemplate, queryTemplateById, saveOrUpdateTemplate,
  deleteTemplate, updateTemplateFormDetails, queryTemplateByFormkeydefinition} from '../services/formTemplateS';

export default {
  namespace: 'formTemplate',
  state: {
    grid: {
      list: [],
      pagination: {
        pageNo: 1, pageSize: 10, showSizeChanger: true, showQuickJumper: true, count: 0
      }
    },
    entity: {}
  },
  effects: {
    *fetch({ payload = {} }, { call, put }) {
      const resp = yield call(queryFormTemplate, payload);
      yield put({
        type: 'saveGrid',
        payload: resp,
        pagination: payload.pagination
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
    *updateFormDetails({payload, callback}, {call}) {
      const resp = yield call(updateTemplateFormDetails, payload);
      if (callback) callback(resp)
    },
    *queryByFormkeydefinition({payload, callback}, {call}) {
      const resp = yield call(queryTemplateByFormkeydefinition, payload);
      if (callback) callback(resp)
    },
  },

  reducers: {
    saveGrid(state, { payload, pagination = {} }) {
      return {
        ...state,
        grid: {
          ...state.grid,
          list: payload.result.data,
          pagination: {
            ...state.grid.pagination,
            pageNo: pagination.pageNo,
            pageSize: pagination.pageSize,
            count: payload.result.count,
          }
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