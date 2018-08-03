import {stringify} from 'qs';
import request from '../../../framework/utils/request';

// 查询数据字典
export async function fetchDictionary(param) {
  return request(`/sys/datadic?${stringify(param)}`);
}
// 根据URL查询数据源
export async function findUrlData(url) {
  return request(url);
}
