import { queryNotices, searchData } from '../services/base';

const getWindowSize = ()=>{
  const w = window.innerWidth;
  let size = 'default';
  if (w > 1200 && w < 1400) {
    size = 'middle';
  } else if (w < 1200) {
    size = 'small';
  } else {
    size = 'large';
  }
  return size;
}

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    searchOptions: [],
    notices: [],
    size: getWindowSize()
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'baseUser/changeNotifyCount',
        payload: count,
      });
    },
    *queryData({ payload }, { put, call }) {
      const res = yield call(searchData, payload);
      yield put({
        type: 'saveSearchData',
        payload: {res, matchStr: payload},
      });
    },
    *showHistory(_, {put}) {
      yield put({
        type: 'saveHistoryData'
      });
    }
  },

  reducers: {
    saveLogicData(state) {
      return {
        ...state,
        searchOptions: [
          {id: 'and',
            label: '并且',
            matchLabel: '并且',
            desc: '',
            preActive: true
          },
          {
            id: 'or',
            label: '或者',
            matchLabel: '或者',
            desc: ''
          }
        ],
      }
    },
    saveSearchData(state, { payload }) {
      const { res, matchStr } = payload;
      const preActiveIndex = payload.preActiveIndex || 0;
      const searchOptions = [];
      res.forEach((item) => {
        const text = item.content
        if (text) {
          const i = text.indexOf(matchStr);
          const obj = {
            id: item.column,
            label: text,
            desc: item.desc,
            table: item.contract_e_cont,
            operate: item.operate || 'like',
            preActive: false,
            matchLabel: i === 0 ? text.substring(0, i + matchStr.length) : '',
            unMatchLabel: i === 0 ? text.substring(i + matchStr.length, text.length) : text,
          }
          searchOptions.push(obj)
        }
      });
      if (searchOptions.length) {
        searchOptions[preActiveIndex].preActive = true
      }
      return {
        ...state,
        searchOptions,
      };
    },
    clearSearchData(state) {
      return {
        ...state,
        searchOptions: [],
      };
    },
    saveHistoryData(state) {
      return {
        ...state,
        searchOptions: [
          {id: 'history_20170101', label: '这是一条价的搜索历史', matchLabel: '这是一条价的搜索历史', desc: '昨天上午'}
        ],
      }
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    resize(state) {
      return {
        ...state,
        size: getWindowSize()
      }
    }
  },

  subscriptions: {
    setup({ dispatch }) {
      let tid
      window.onresize = ()=>{
        clearTimeout(tid);
        tid = setTimeout(()=>{
          dispatch({type: 'resize'})
        }, 300)
      }
    },
  },
};
