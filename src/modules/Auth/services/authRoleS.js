import { stringify } from 'qs';
import request from '../../../utils/request';

// 取得roles列表
export async function queryRoles(params) {
  return request(`/auth/roles?${stringify(params)}`);
}

// 取得指定角色ID详情信息
export async function queryRole(params) {
  return request(`/auth/roles/${params}`);
}

// 删除选定的roles
export async function removeRoles(params) {
  return request(`/auth/roles?${stringify(params)}`, {
    method: 'DELETE'
  });
}

// 取得指定角色ID的用户列表
export async function queryRoleUsers(params) {
  return request(`/auth/roles/${params}/users`);
}

// 取得指定角色ID的用户列表
export async function queryRoleGroups(params) {
  return request(`/auth/roles/${params}/user-groups`);
}

// 更新角色列表的状态信息
export async function fetchUpdateStatus(params) {
  return request('/auth/roles', {
    method: 'POST',
    body: params
  });
}
