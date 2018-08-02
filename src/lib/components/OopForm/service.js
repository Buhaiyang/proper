import {stringify} from 'qs';
import request from '../../../framework/utils/request';

export async function fetchDictionary(param) {
  return request(`/sys/datadic?${stringify(param)}`);
}
