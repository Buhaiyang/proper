import {stringify} from 'qs';
import request from '../../../utils/request';

export async function queryExamContent(params) {
  return request(`/exam?${stringify(params)}`);
}

export async function submitAnswer(params) {
  return request('/exam', {
    method: 'POST',
    body: params
  });
}