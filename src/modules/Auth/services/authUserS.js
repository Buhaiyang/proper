import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryUsers(params) {
  return request(`/auth/users?${stringify(params)}`);
}
export async function queryUsersById(params) {
  return request(`/auth/users/${params}`);
}
export async function deleteUsers(params) {
  return request(`/auth/users?${stringify(params)}`, {
    method: 'delete'
  });
}
export async function queryUserRoles(params) {
  return request(`/auth/users/${params}/roles`);
}
export async function queryUserRolesAll() {
  return request('/auth/roles');
}
export async function queryUserGroups(params) {
  return request(`/auth/users/${params}/user-groups`);
}
export async function queryUserGroupsAll() {
  return request('/auth/user-groups');
}
export async function saveOrUpdateUser(params) {
  const userId = params.id;
  return userId ? request(`/auth/users/${userId}`, {
    method: 'PUT',
    body: params
  }) : request('/auth/users', {
    method: 'POST',
    body: params
  });
}
export async function userAddRole(params) {
  return request(`/auth/users/${params.userId}/role/${params.id}`, {
    method: 'POST'
  });
}
export async function userDelRole(params) {
  return request(`/auth/users/${params.userId}/role/${params.id}`, {
    method: 'delete'
  });
}
export async function userAddGroup(params) {
  return request(`/auth/user-groups/${params.id}/user/${params.userId}`, {
    method: 'POST'
  });
}
export async function userDelGroup(params) {
  return request(`/auth/user-groups/${params.id}/user/${params.userId}`, {
    method: 'delete'
  });
}

