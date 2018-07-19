import {stringify} from 'qs';
import request from '../../../utils/request';

export async function findTask(params) {
  return request(`/workflow/task?${stringify(params)}`);
}

export async function findDesign(params) {
  return request(`/repository/models?${stringify(params)}`);
}

export async function findProcess(params) {
  return request(`/workflow/process?${stringify(params)}`);
}

export async function findGroup(params) {
  return request(`/auth/user-groups?${stringify(params)}`);
}

export async function findUser(params) {
  const p = {
    userGroupEnable: 'ALL',
    userEnable: 'ALL'
  }
  return request(`/auth/user-groups/${params}/users?${stringify(p)}`);
}
