import { stringify } from 'qs';
import request from '../../../../framework/utils/request';

// 取得应用类别列表
export async function fetchTreeData(params) {
  return request(`/admin/app/applications/catalogs?${stringify(params)}`);
}
// 保存或者修改应用
export async function saveOrUpdate(params) {
  const { appId } = params;
  return appId ? request(`/admin/app/applications/${appId}`, {
    method: 'PUT',
    body: params
  }) : request('/admin/app/applications', {
    method: 'POST',
    body: params
  });
}
// 删除应用
export async function deleteApp(params) {
  return request(`/admin/app/applications?${stringify(params)}`, {
    method: 'DELETE'
  });
}
