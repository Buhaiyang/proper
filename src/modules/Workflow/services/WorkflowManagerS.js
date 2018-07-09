import {stringify} from 'qs';
import request from '../../../utils/request';

export async function findTask(params) {
  return request(`/task?${stringify(params)}`);
}

export async function findDesign(params) {
  return request(`/repository/models?${stringify(params)}`);
}

export async function findProcess(params) {
  return request(`/process?${stringify(params)}`);
}
