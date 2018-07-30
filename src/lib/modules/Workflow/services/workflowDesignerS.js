import { stringify } from 'qs';
import request from '../../../../framework/utils/request';

export async function queryWorkflowList(params) {
  return request(`/repository/models?${stringify(params)}`);
}

export async function createWorkflow(params) {
  return request('/workflow/service/app/rest/models', {
    method: 'POST',
    body: params,
  });
}

export async function removeWorkflowList(params) {
  return request(`/workflow/service/app/rest/models/${params}`, {
    method: 'DELETE'
  });
}

export async function repositoryWorkflow(params) {
  return request(`/repository/models/${params}/deployment`, {
    method: 'POST'
  });
}
