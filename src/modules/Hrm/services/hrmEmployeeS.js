import { stringify } from 'qs';
import request from '../../../utils/request';

// 删除选定的人员
export async function employeeDelete(params) {
  return request(`/hr/employee?${stringify(params)}`, {
    method: 'DELETE'
  });
}

// 从人员中批量添加平台用户
export async function employeeAddUsers(params) {
  return request('/hr/employee/user', {
    method: 'POST',
    body: params
  });
}

// 取得某个人员的信息
export async function queryEmployeeInfo(params) {
  return request(`/hr/employee/${params.employeeId}`);
}

// 取得所有部门
export async function queryOrganization() {
  return request('/hr/orginization');
}

// 新建或者更新人员
export async function createOrUpdate(params) {
  return params.id ? request(`/hr/employee/${params.id}`, {
    method: 'PUT',
    body: params,
  }) : request('/hr/employee', {
    method: 'POST',
    body: params,
  });
}

