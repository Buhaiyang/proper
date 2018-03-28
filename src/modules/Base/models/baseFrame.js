import { queryExamContent } from '../services/examS';

export default {
  namespace: 'baseFrame',
  state: {
    examContent: {},
    examLists: [],
    selectOne: [],
    selectMore: [],
    fillIn: [],
    subjectiveItem: [],
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
      // const selectOne = [];
      // const selectMore = [];
      // const fillIn = [];
      // const subjectiveItem = [];
      // for (let i = 0; i < action.payload.list.length; i++) {
      //   if (action.payload.list[i].type === 'select_one') {
      //     selectOne.push(action.payload.list[i]);
      //   }
      //   if (action.payload.list[i].type === 'select_more') {
      //     selectMore.push(action.payload.list[i]);
      //   }
      //   if (action.payload.list[i].type === 'fill_in') {
      //     fillIn.push(action.payload.list[i]);
      //   }
      //   if (action.payload.list[i].type === 'subjective_item') {
      //     subjectiveItem.push(action.payload.list[i]);
      //   }
      // }
      return {
        ...state,
        examContent: action.payload,
        examLists: action.payload.list
      };
    }
  }
};
