import request from '../../../framework/utils/request';

export async function test(params) {
  return request(`/workflow/process/${params}/page`);
}
