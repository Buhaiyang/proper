import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDemo(params = {}) {
  // console.log('=================table',params,stringify(params,{encode:false}))
  const {extraParams} = params;
  const pagination = {
    currentPage: params.currentPage,
    pageSize: params.pageSize
  };
  return request(`/api/back/query/result?req=${encodeURI(JSON.stringify(extraParams))}&tableName=contract_e_cont&${stringify(pagination)}`);
}
