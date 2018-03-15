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
export async function searchData(params) {
  return request(`/back/demo/search?data=${params}`);
}
