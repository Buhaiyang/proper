import { queryExamContent } from '../services/examS';

export default {
  namespace: 'baseFrame',
  state: {
    examContent: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryExamContent);
      yield put({
        type: 'saveExamContent',
        payload: response,
      });
    },
  },
  reducers: {
    saveExamContent(state, action) {
      console.log(action.payload);
      return {
        ...state,
        examContent: action.payload
      };
    }
  }
};
