import { remove, saveOrUpdate, getFileInfo } from '../services/systemPagePushS';

export default {
  namespace: 'systemPagePush',
  state: {},
  effects: {
    *getFileInfo({payload, callback}, {call}) {
      const resp = yield call(getFileInfo, payload);
      if (callback) callback(resp)
    },
    *saveOrUpdate({payload, callback}, {call}) {
      const resp = yield call(saveOrUpdate, payload);
      if (callback) callback(resp)
    },
    *remove({payload, callback}, {call}) {
      const resp = yield call(remove, payload);
      if (callback) callback(resp)
    },
  }
}