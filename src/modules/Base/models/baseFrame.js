import { queryExamContent, submitAnswer } from '../services/examS';

export default {
  namespace: 'baseFrame',
  state: {
    examContent: {},
    examLists: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryExamContent);
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
