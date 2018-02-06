import request from "../utils/request";
import { stringify } from 'qs';

export async function queryDemo(params) {
  return request(`/api/rule?${stringify(params)}`);
}
