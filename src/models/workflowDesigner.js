import { queryWorkflowList, removeWorkflowList, createWorkflow } from '../services/workflow/WorkflowDesignerS';

export default {
  namespace: 'workflowDesigner',

  state: {
    data: {},
    messageData: null,
    newId: null
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryWorkflowList, payload);
      yield put({
        type: 'getList',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeWorkflowList, payload);
      yield put({
        type: 'getMessages',
        payload: response,
      });
      if (callback) callback();
    },
    *create({ payload, callback }, { call, put }) {
      const response = yield call(createWorkflow, payload);
      yield put({
        type: 'getCreateId',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    getList(state, action) {
      const lists = action.payload;
      for (let i = 0; i < lists.data.length; i++) {
        const url = `/workflow/service/app/rest/models/${lists.data[i].id}/thumbnail?version=${Date.now()}`;
        lists.data[i].sourceExtraUrl = `${location.protocol}//${location.host}${url}`;
      }
      return {
        ...state,
        data: lists
      };
    },
    getMessages(state, action) {
      return {
        ...state,
        messageData: action.payload
      };
    },
    getCreateId(state, action) {
      return {
        ...state,
        newId: action.payload.id
      };
    },
  }
};