import { searchSuggest, searchResult } from '../services/baseS';

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
        pageNo: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        count: 0
      }
    },
    size: getWindowSize()
  },

  effects: {
    *oopSearchResult({ payload, callback }, { put, call }) {
      const resp = yield call(searchResult, payload);
      yield put({
        type: 'saveOopSearchGrid',
        payload: resp,
        pagination: {
          ...payload
        }
      });
      if (callback) callback();
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
        ],
      }
    },
    saveOopSearchGrid(state, { payload, pagination }) {
      if (payload) {
        const { result } = payload
        return {
          ...state,
          oopSearchGrid: {
            list: result.data || [],
            pagination: {
              pageNo: pagination.pageNo,
              pageSize: pagination.pageSize,
              count: result.count || 0,
            }
          }
        }
      } else {
        return {
          ...state,
          oopSearchGrid: {
            list: [],
            pagination: {
              pageNo: pagination.pageNo,
              pageSize: pagination.pageSize,
              count: 0,
            }
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
            pageNo: 1,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            count: 0
          }
        },
      }
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
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
