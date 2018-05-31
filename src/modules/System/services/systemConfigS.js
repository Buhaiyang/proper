import request from '../../../utils/request';

export async function saveOrUpdate(param) {
  return param.id ? request('/system/config', {
    method: 'PUT',
    body: param
  }) : request('/system/config', {
    method: 'POST',
    body: param
  });
}
export async function remove(param) {
  return request(`/system/config/?ids=${param}`, {
    method: 'DELETE'
  });
}
