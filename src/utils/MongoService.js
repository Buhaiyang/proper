import AV from 'av-core';
import { prefix, devMode } from '../config';

export default class MongoService {
  constructor(tableName, url, ctx) {
    const token = window.localStorage.getItem('proper-auth-login-token');
    if (!token) {
      throw Error('the token cannot be empty when you instantiate an \'MongoService\' object ');
    }
    this.currentUser = JSON.parse(window.atob(token.split('.')[0]));
    this.tableName = tableName;
    this.tableObj = AV.Object.extend(this.tableName);
    const {protocol, host, pathname} = window.location;
    const serverURL = url || (devMode === 'development' && window.localStorage.getItem('pea_dynamic_request_prefix')) || `${protocol}//${host}${pathname.substr(0, pathname.lastIndexOf('/'))}${prefix}`;
    const context = ctx || '/avdemo';
    AV.initialize(serverURL, context);
    AV.setToken(token)
  }
  fetch =(callback) =>{
    const query = new AV.Query(this.tableObj);
    const callbackReturn = callback && callback(query);
    return new Promise((resolve)=>{
      if (callbackReturn) {
        callbackReturn.then((callbackReturnValue)=>{
          query.find().then((res)=>{
            resolve({
              result: res.map(item=> ({...item._serverData, id: item._serverData._id.$oid})),
              extra: callbackReturnValue
            });
          })
        })
        return
      }
      query.find().then((res)=>{
        resolve({
          result: res.map(item=>
            ({...item._serverData, id: item._serverData._id.$oid}))
        });
      })
    })
  }
  fetchPagable = (params = {}) =>{
    const {pagination = {}, ...queryCondition } = params;
    const {pageNo = 1, pageSize = 10, sorter} = pagination;
    console.log(queryCondition, sorter)
    return new Promise((resolve)=>{
      this.fetch((query)=>{
        query.skip((pageNo - 1) * pageSize).limit(pageSize);
        return query.count();
      }).then((res)=>{
        resolve({
          data: res.result,
          count: res.extra
        })
      })
    })
  }
  save = (formValues) => {
    const insertObj = this.tableObj.new(formValues);
    return new Promise((resolve)=>{
      insertObj.save().then((res)=>{
        // 为了给oopToast提供成功的标识
        resolve({
          status: 'ok',
          result: {...res._serverData, id: res.id}
        });
      }, (err)=>{
        console.log(err);
        resolve({
          status: 'error',
          result: '更新失败'
        });
      })
    })
  }
  update = (formValues)=> {
    const id = formValues && formValues.id;
    if (id) {
      const query = new AV.Query(this.tableObj);
      return new Promise((resolve)=>{
        query.get(id).then((entity)=>{
          for (const k in formValues) {
            entity.set(k, formValues[k]);
          }
          entity.save().then((res)=>{
            // 为了给oopToast提供成功的标识
            resolve({
              status: 'ok',
              result: {...res._serverData, id: res._serverData._id.$oid}
            });
          }, (err)=>{
            console.log(err);
            resolve({
              status: 'error',
              result: '更新失败'
            });
          })
        })
      })
    } else {
      console.error('\'id\' cannot be null when update operation ')
    }
  }
  fetchById = (id) =>{
    if (id) {
      const query = new AV.Query(this.tableObj);
      return new Promise((resolve)=>{
        query.get(id).then((res)=>{
          resolve({
            status: 'ok',
            result: {...res._serverData, id: res._serverData._id.$oid}
          });
        })
      })
    }
  }
  deleteById = (id) =>{
    if (id) {
      const query = new AV.Query(this.tableObj);
      return new Promise((resolve)=>{
        query.get(id).then((res)=>{
          res.id = res._serverData._id.$oid;
          res.destroy().then((msg)=>{
            resolve({
              status: 'ok',
              result: msg
            });
          }, (errorMsg)=>{
            console.err(errorMsg)
          });
        })
      })
    }
  }
  batchDelete = (param) =>{
    if (param.ids) {
      const query = new AV.Query(this.tableObj);
      query.containedIn('_id', param.ids.split(','));
      return new Promise((resolve)=>{
        query.find().then((res)=>{
          if (res.length) {
            res.forEach((re)=>{
              const r = re;
              r.id = r._serverData._id.$oid
            });
            AV.Object.destroyAll(res).then((msg)=>{
              resolve({
                status: 'ok',
                result: msg
              });
            }, (errorMsg)=>{
              console.err(errorMsg)
            });
          } else {
            resolve({
              status: 'error',
              result: 'the record no exit'
            });
          }
        })
      })
    }
  }
  fetchByEqual = (params)=> {
    return this.fetch((query)=>{
      if (params) {
        for (const k in params) {
          query.equalTo(k, params[k]);
        }
      }
    })
  }
  getCurrentUser = ()=>{
    return this.currentUser
  }
}

