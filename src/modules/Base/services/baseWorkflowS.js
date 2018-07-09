import MongoService from '../../../utils/MongoService';
import request from '../../../utils/request';


const formTemplateService = new MongoService('PEP_FORM_TEMPLATE');

export async function fetchByFormCode(param) {
  return formTemplateService.fetchByEqual({
    formkeydefinition: param
  })
}
export async function launchWorkflow(params) {
  const {taskOrProcDefKey, formData} = params;
  return request(`/process/${taskOrProcDefKey}`, {
    method: 'POST',
    body: formData,
  });
}
export async function submitWorkflow(params) {
  const {taskOrProcDefKey, formData} = params;
  return request(`/task/${taskOrProcDefKey}`, {
    method: 'POST',
    body: formData,
  });
}
