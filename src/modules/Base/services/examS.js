import request from '../../../utils/request';

export async function queryExamContent(params) {
  return request(`/questionnaire/${params}`);
}

export async function submitAnswer(params) {
  return request(`/questionnaire/${params.number}`, {
    method: 'POST',
    body: params.data
  });
}