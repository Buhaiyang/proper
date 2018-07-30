import * as service from './service';

export default {
  namespace: 'OopGroupUserPicker$model',
  state: {
  },
  effects: {
    *findGroup() {
      yield service.test();
    }
  },
  reducers: {}
};
