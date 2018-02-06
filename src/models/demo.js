import { queryDemo } from '../services/demoS';
export default {
  namespace: 'demo',
  state: {
    data:{
      list:[],
      pagination:{}
    },
    size:'default'
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryDemo,payload);
      yield put({
        type:'save',
        payload:resp
      })
    }
  },

  reducers: {
    save(state, action) {
      console.log(action)
      return {
        ...state,
        data:action.payload
      }
    },
    resizeTable(state,action){
      const w = action.payload;
      let size = ''
      if(1200 < w && w < 1400){
        size = 'middle';
      }else if( w < 1200){
        size = 'small';
      }else{
        size = 'default';
      }
      return {
        ...state,
        size
      }
    }
  },
  subscriptions:{
    setup({ dispatch }) {
      let tid
      window.onresize = ()=>{
        clearTimeout(tid);
        tid = setTimeout(()=>{
          dispatch({type:'resizeTable',payload:window.innerWidth})
        },300)
      }
    }
  }
};
