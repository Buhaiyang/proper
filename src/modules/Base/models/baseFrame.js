import { queryExamContent, submitAnswer } from '../services/examS';

export default {
  namespace: 'baseFrame',
  state: {
    examContent: {},
    examLists: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExamContent, payload);
      yield put({
        type: 'saveExamContent',
        payload: response,
      });
    },
    *submit({ callback, payload }, { call }) {
      yield call(submitAnswer, payload);
      if (callback) callback();
    },
  },
  reducers: {
    saveExamContent(state, action) {
      return {
        ...state,
        examContent: action.payload,
        examLists: action.payload.list
      };
    },
  }
};
