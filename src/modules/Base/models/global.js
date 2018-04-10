import { queryNotices, searchSuggest, searchResult } from '../services/baseS';

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
    oopSearchGrid: {
      list: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0
      }
    },
    notices: [],
    size: getWindowSize()
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data.result,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.result.length,
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
    *oopSearchResult({ payload }, { put, call }) {
      const data = yield call(searchResult, payload);
      // TODO 不这样写  列表不出数据
      // begin
      // if (Array.isArray(res)) {
      //   yield put({
      //     type: 'saveOopSearchGrid',
      //     payload: {data: res.result},
      //   });
      //   return
      // }
      // end
      yield put({
        type: 'saveOopSearchGrid',
        payload: data.result,
      });
    },
    *oopSearchSuggest({ payload }, { put, call }) {
      const data = yield call(searchSuggest, payload);
      yield put({
        type: 'saveSearchOptions',
        payload: {res: data.result, matchStr: payload},
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
    saveSearchOptions(state, { payload }) {
      const { res, matchStr } = payload;
      const preActiveIndex = payload.preActiveIndex || 0;
      const searchOptions = [];
      if (res) {
        res.forEach((item) => {
          const text = item.con
          if (text) {
            const i = text.indexOf(matchStr);
            const obj = {
              id: item.id,
              col: item.ali,
              label: text,
              desc: item.des,
              table: item.tab,
              operate: item.operate || 'like',
              preActive: false,
              matchLabel: i === 0 ? text.substring(0, i + matchStr.length) : '',
              unMatchLabel: i === 0 ? text.substring(i + matchStr.length, text.length) : text,
            }
            searchOptions.push(obj)
          }
        })
      }
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
    saveOopSearchGrid(state, { payload }) {
      return {
        ...state,
        oopSearchGrid: {
          list: payload.data,
          pagination: {
            ...state.oopSearchGrid.pagination,
            total: payload.count
          }
        }
      }
    },
    clearOopSearchGrid(state) {
      return {
        ...state,
        oopSearchGrid: {
          list: [],
          pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            total: 0
          }
        },
      }
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
