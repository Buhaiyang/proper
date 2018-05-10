import {stringify} from 'qs';
import request from '../../../utils/request';

export async function queryFormTemplate() {
  return request('/form/template');
}

export async function queryTemplateById(param) {
  return request(`/form/template/${param}`);
}
export async function saveOrUpdateTemplate(param) {
  return param.id ? request(`/form/template/${param.id}`, {
    method: 'PUT',
    body: param,
  }) : request('/form/template', {
    method: 'POST',
    body: param,
  });
}
export async function deleteTemplates(param) {
  return request(`/form/template/?${stringify(param)}`, {
    method: 'DELETE'
  });
}
export async function deleteTemplate(param) {
  return request(`/form/template/${param}`, {
    method: 'DELETE'
  });
}
