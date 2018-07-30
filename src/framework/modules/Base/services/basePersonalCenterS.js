import request from '../../../../framework/utils/request';

export async function changePassword(param) {
  return request('/auth/users/password', {
    method: 'PUT',
    body: param
  });
}
