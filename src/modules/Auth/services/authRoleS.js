import { stringify } from 'qs';
import request from '../../../utils/request';

// 取得roles列表
export async function queryRoles(params) {
  return request(`/api/auth/roles?${stringify(params)}`);
}

// 取得指定角色ID详情信息
export async function queryRole(params) {
  return request(`/api/auth/roles/${params}`);
}

// 删除选定的roles
export async function removeRoles(params) {
  return request(`/api/auth/roles?${stringify(params)}`, {
    method: 'DELETE'
  });
}

// 取得指定角色ID的用户列表
export async function queryRoleUsers(params) {
  return request(`/api/auth/roles/${params}/users`);
}

// 取得指定角色ID的用户列表
export async function queryRoleGroups(params) {
  return request(`/api/auth/roles/${params}/user-groups`);
}
