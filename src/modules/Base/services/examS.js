import {stringify} from 'qs';
import request from '../../../utils/request';

export async function queryExamContent(params) {
  return request(`/questionnaire?${stringify(params)}`);
}

export async function submitAnswer(params) {
  return request('/questionnaire', {
    method: 'POST',
    body: params
  });
}