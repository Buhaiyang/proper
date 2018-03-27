import {stringify} from 'qs';
import request from '../../../utils/request';

export async function queryExamContent(params) {
  return request(`/exam?${stringify(params)}`);
}