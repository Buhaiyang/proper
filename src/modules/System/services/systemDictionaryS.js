import request from '../../../utils/request';

export async function fetchById(param) {
  return request(`/sys/datadic/${param}`);
}
export async function saveOrUpdate(param) {
  return param.id ? request(`/sys/datadic/${param.id}`, {
    method: 'PUT',
    body: param,
  }) : request('/sys/datadic', {
    method: 'POST',
    body: param,
  });
}
export async function remove(param) {
  return request(`/sys/datadic/?ids=${param}`, {
    method: 'DELETE'
  });
}
