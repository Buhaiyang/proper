import {stringify} from 'qs';
import request from '../../../utils/request';

export async function query() {
  return request('/users');
}
export async function queryCurrent() {
  return request('/auth/login/user');
}
export async function queryCurrentMenus() {
  return request('/auth/menus');
}
export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    body: params,
  });
}
export async function fakeRegister(params) {
  return request('/register', {
    method: 'POST',
    body: params,
  });
}
export async function queryNotices() {
  return request('/notices');
}
export async function searchSuggest(params) {
  return request(`/search/inverse?${stringify(params)}`);
}
export async function searchResult(params) {
  return request(`/search/query?${stringify(params)}`);
}
export async function fakeChartData() {
  return request('/fake_chart_data');
}
