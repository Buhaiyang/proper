import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryUserGroups(params) {
  return request(`/api/auth/user-groups?${stringify(params)}`);
}

export async function updateUserGroups(params) {
  return request('/api/auth/user-groups', {
    method: 'PUT',
    body: params,
  });
}

export async function removeAllUserGroups(params) {
  return request(`/api/auth/user-groups?${stringify(params)}`, {
    method: 'DELETE'
  });
}

export async function removeUserGroups(params) {
  return request(`/api/auth/user-groups/${params.ids}`, {
    method: 'DELETE'
  });
}