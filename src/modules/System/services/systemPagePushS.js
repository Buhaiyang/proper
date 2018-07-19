import {stringify} from 'qs';
import request from '../../../utils/request';

// start todo
export async function fetch(param) {
  // return fetchPagable(param)
  return request(`/push/channels?${stringify(param)}`);
}
// end todo
export async function getFileInfo(param) {
  return request(`/file/${param}/meta`);
}
export async function saveOrUpdate(param) {
  return param.id ? request('/push/channels', {
    method: 'PUT',
    body: param,
  }) : request('/push/channels', {
    method: 'POST',
    body: param,
  });
}
export async function remove(param) {
  return request(`/push/channels/?ids=${param}`, {
    method: 'DELETE'
  })
}