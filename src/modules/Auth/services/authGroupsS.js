import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryGroups(params) {
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

export async function createOrUpdateUserGroups(params) {
  return params.id ? request(`/api/auth/user-groups/${params.id}`, {
    method: 'PUT',
    body: params,
  }) : request('/api/auth/user-groups', {
    method: 'POST',
    body: params,
  });
}

export async function queryUserGroupsById(params) {
  return request(`/api/auth/user-groups/${params}`);
}

export async function queryGroupUsers(params) {
  return request(`/api/auth/user-groups/${params}/users`);
}

export async function groupAddUsers(params) {
  return request(`/api/auth/user-groups/${params.id}/user/${params.userId}`, {
    method: 'POST',
    body: params,
  });
}

export async function groupDeleteUsers(params) {
  return request(`/api/auth/user-groups/${params.id}/user/${params.userId}`, {
    method: 'DELETE'
  });
}
