import {stringify} from 'qs';
import request from '../../../utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryCurrentMenus() {
  return request('/api/auth/menus');
}
export async function login(params) {
  return request('/api/auth/login', {
    method: 'POST',
    body: params,
  });
}
export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function searchSuggest(params) {
  return request(`/api/search/inverse?moduleName=userRoleConfigTest&data=${params}`);
}
export async function searchResult(params) {
  return request(`/api/search/query?${stringify(params)}`);
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
