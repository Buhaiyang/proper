import { stringify } from 'qs';
import request from '../../../utils/request';

// 取得所有部门
export async function queryOrganization() {
  return request('/hr/orginization');
}
// 新建或者保存
export async function saveOrUpdate(params) {
  return params.id ? request(`/hr/orginization/${params.id}`, {
    method: 'PUT',
    body: params
  }) : request('/hr/orginization', {
    method: 'POST',
    body: params
  })
}
// 批量删除
export async function batchDelete(params) {
  return request(`/hr/orginization?${stringify(params)}`, {
    method: 'DELETE'
  });
}
// 查询上级部门
export async function queryParentOrg(params) {
  return request(`/hr/orginization?${params}`);
}
// 查询单个部门
export async function queryOrgById(params) {
  return request(`/hr/orginization/${params}`);
}

