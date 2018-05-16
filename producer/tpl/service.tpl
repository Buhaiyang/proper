import {stringify} from 'qs';
import request from '../../../utils/request';

export async function fetch(param) {
  return request(\`/${routeName}/?\$\{stringify(param)\}\`);
}
export async function fetchById(param) {
  return request(\`/${routeName}/\$\{param\}\`);
}
export async function saveOrUpdate(param) {
  return param.id ? request(\`/${routeName}/\$\{param.id\}\`, {
    method: 'PUT',
    body: param,
  }) : request('/${routeName}', {
    method: 'POST',
    body: param,
  });
}
export async function removeAll(param) {
  return request(\`/${routeName}/?\$\{stringify(param)\}\`, {
    method: 'DELETE'
  });
}
export async function remove(param) {
  return request(\`/${routeName}/\$\{param\}\`, {
    method: 'DELETE'
  });
}
