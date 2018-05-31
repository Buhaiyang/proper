import { remove, saveOrUpdate } from '../services/systemConfigS';

export default {
  namespace: 'systemConfig',
  state: {},
  effects: {
    *saveOrUpdate({payload, callback}, {call}) {
      const resp = yield call(saveOrUpdate, payload);
      if (callback) callback(resp)
    },
    *remove({payload, callback}, {call}) {
      const resp = yield call(remove, payload);
      if (callback) callback(resp)
    }
  }
};
