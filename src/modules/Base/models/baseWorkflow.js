import { fetchByFormCode, launchWorkflow, submitWorkflow} from '../services/baseWorkflowS';

export default {
  namespace: 'baseWorkflow',
  state: {
    formEntity: {},
  },
  effects: {
    *fetchByFormCode({ payload }, { call, put }) {
      const response = yield call(fetchByFormCode, payload);
      yield put({
        type: 'saveFormEntity',
        payload: response.result,
      });
    },
    *launchWorkflow({ callback, payload }, { call }) {
      const response = yield call(launchWorkflow, payload);
      if (callback) callback(response);
    },
    *submitWorkflow({ callback, payload }, { call }) {
      const response = yield call(submitWorkflow, payload);
      if (callback) callback(response);
    },
  },
  reducers: {
    saveFormEntity(state, action) {
      return {
        ...state,
        formEntity: action.payload[0],
      };
    },
    clearFormEntiry(state) {
      return {
        ...state,
        formEntity: {}
      };
    }
  }
};
