import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryUsers() {
  const params = {pageNo: '1', pageSize: '10'};
  return request(`/api/auth/users?${stringify(params)}`);
}
export async function queryUsersById(params) {
  return request(`/api/auth/users/${params}`);
}
export async function deleteUsers(params) {
  return request(`/api/auth/users?${stringify(params)}`, {
    method: 'delete'
  });
}
export async function queryUserRoles(params) {
  return request(`/api/auth/users/${params}/roles`);
}
export async function queryUserRolesAll() {
  return request('/api/auth/roles');
}
export async function queryUserGroups(params) {
  return request(`/api/auth/users/${params}/user-groups`);
}
export async function queryUserGroupsAll() {
  return request('/api/auth/user-groups');
}
export async function saveOrUpdateUser(params) {
  const userId = params.id;
  return userId ? request(`/api/auth/users/${userId}`, {
    method: 'PUT',
    body: params
  }) : request('/api/auth/users', {
    method: 'POST',
    body: params
  });
}
