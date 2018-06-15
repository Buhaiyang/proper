import request from '../../../utils/request';

export async function saveOrUpdate(param) {
  return param.id ? request('/sys/config', {
    method: 'PUT',
    body: param
  }) : request('/sys/config', {
    method: 'POST',
    body: param
  });
}
export async function remove(param) {
  return request(`/sys/config/?ids=${param}`, {
    method: 'DELETE'
  });
}
