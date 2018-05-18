import {stringify} from 'qs';
import request from '../../../utils/request';
import MongoService from '../../../utils/MongoService'

const formTemplateService = new MongoService('FormTemplate');
const {fetchPagable, fetchById, update, save, deleteById} = formTemplateService;

export async function queryFormTemplate(param) {
  return fetchPagable(param);
  // return MongoHandle.fetchByEqual(tableName, {
  //   name: '1'
  // });
  // return request('/form/template');
}
export async function queryTemplateById(param) {
  return fetchById(param)
  // return request(`*/form/template/${param}`);
}
export async function saveOrUpdateTemplate(param) {
  return param.id ? update(param) : save(param);
  // return param.id ? request(`/form/template/${param.id}`, {
  //   method: 'PUT',
  //   body: param,
  // }) : request('/form/template', {
  //   method: 'POST',
  //   body: param,
  // });
}
export async function deleteTemplates(param) {
  return request(`/form/template/?${stringify(param)}`, {
    method: 'DELETE'
  });
}
export async function deleteTemplate(param) {
  return deleteById(param);
  // return request(`/form/template/${param}`, {
  //   method: 'DELETE'
  // });
}
export async function updateTemplateFormDetails(param) {
  const {id, formDetails} = param;
  return update({id, formDetails: JSON.stringify(formDetails)});
  // return request(`/form/template/${param.id}/formDetails`, {
  //   method: 'PUT',
  //   body: param.formDetails,
  // })
}
