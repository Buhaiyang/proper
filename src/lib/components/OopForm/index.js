import React from 'react';
import {connect} from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import {formGenerator} from './utils';
import styles from './index.less';
import {inject} from '../../../framework/common/inject';


// 判断item的值 与 display配置的value 是否匹配 目前支持字符串 以后会支持表达式
function isItemShow(itemValue, displayValue) {
  // TODO 支持表达式匹配
  return itemValue === displayValue
}

@inject('OopForm$model')
@Form.create()
@connect(({OopForm$model})=>({
  OopForm$model
}), null, null, {withRef: true})
export default class OopForm extends React.PureComponent {
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    // TODO 是否需要清空OopForm$model里的数据字典
    // this.props.dispatch({
    //   type: 'OopForm$model/clearDictData',
    //   payload: {
    //     catalog: dictCatalog,
    //     name
    //   }
    // })
  }
  loadDictData = (dictCatalog)=>{
    this.props.dispatch({
      type: 'OopForm$model/findDictData',
      payload: {
        catalog: dictCatalog
      }
    })
  }
  // renderForm = (name, value)=>{
  //   console.log(name, value);
  //   this.props.formJson.forEach((item)=>{
  //     if (item.name === name) {
  //       item.initialValue = value
  //     }
  //   })
  //   setTimeout(()=>{
  //     this.forceUpdate();
  //   });
  // }
  render() {
    const { OopForm$model, disabled = false, formJson = [], defaultValue = {}, form } = this.props;
    // const changeEventSequence = new Set();
    formJson.forEach((item)=>{
      const {initialValue, component, display} = item;
      // initialValue是数组但是长度为0 或者 没有initialValue
      if ((Array.isArray(initialValue) && initialValue.length === 0)
        || initialValue === undefined) {
        item.initialValue = defaultValue[item.name]
      } else {
        item.initialValue = defaultValue[item.name] || initialValue
      }
      // 处理DatePicker的值
      if (component.name === 'DatePicker') {
        if (item.initialValue) {
          const format = (component.props && component.props.format) || 'YYYY-MM-DD';
          item.initialValue = moment(new Date(item.initialValue), format);
        }
      }
      // 如果是只读的组件
      if (disabled) {
        if (!component.$$typeof) {
          if (!component.props) {
            component.props = {};
          }
          component.props.disabled = true;
        }
      }
      // 如果是有数据源的组件
      if (component.children && component.children.length === 0 && component.dictCatalog) {
        const {dictCatalog} = component;
        if (dictCatalog !== '请选择') {
          if (!OopForm$model[dictCatalog] || OopForm$model[dictCatalog].length === 0) {
            this.loadDictData(dictCatalog);
          } else {
            component.children = OopForm$model[dictCatalog]
          }
        }
      }
      // 解析display配置
      if (display) {
        const changeItem = formJson.find(it=>it.name === display.name);
        item.show = isItemShow(changeItem.initialValue, display.value)
        // changeEventSequence.add(display.name);
      }
    });
    // changeEventSequence.forEach((name)=>{
    //   const item = formJson.find(it=>it.name === name);
    //   item.component.props = {
    //     ...item.component.props,
    //     onChange: (e)=>{
    //       this.renderForm(name, e)
    //     }
    //   }
    // });
    const formConfig = {...this.props, form, className: styles.container };
    return formGenerator(formConfig)
  }
}
