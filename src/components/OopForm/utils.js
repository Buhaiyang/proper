import React from 'react';
import { Form, Icon, Tooltip } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import getComponent from './ComponentsMap';
import FormContainer from './components/FormContainer';


export const formGenerator = (formConfig)=>{
  const {formTitle, className, formJson, form, formLayout = 'horizontal', rowItemClick, rowItemIconCopy, rowItemIconDelete, rowItemDrag,
    dragable = false} = formConfig;
  const formItemLayout = formLayout === 'horizontal' ? {
    labelCol: {
      xs: {span: 24},
      sm: {span: 5},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  } : null;
  // 把正则的字符串形式转义成正则形式 fe: "/^0-9*$/" => /^0-9*$/
  const transformRules = (rules)=>{
    const arr = cloneDeep(rules);
    arr.forEach((it)=>{
      const {pattern} = it
      if (pattern && pattern.constructor.name === 'String') {
        it.pattern = new RegExp(pattern.split('/')[1]);
      }
    });
    return arr;
  }
  const {getFieldDecorator} = form;
  const formItemList = [];
  if (Array.isArray(formJson) && formJson.length > 0) {
    for (let i = 0; i < formJson.length; i++) {
      const formItemConfig = formJson[i];
      const {name, initialValue, rules = [], component } = formItemConfig;
      let formItem = null;
      let _rules = null;
      if (name && component) {
        if (rules.length) {
          _rules = transformRules(rules);
        }
        const formItemInner = getFieldDecorator(name, {initialValue, rules: _rules})(
          createComponent(component)
        );
        formItem = getFormItem(formItemInner,
          {...formItemConfig, formItemLayout, rowItemClick, rowItemIconCopy, rowItemIconDelete});
        formItemList.push(formItem);
      }
    }
  }
  if (formItemList.length === 0) {
    console.error('the arguments `formJson` no be length === 0')
    return null
  }
  return (dragable ?
    (
      <FormContainer
        className={className}
        formLayout={formLayout}
        formItemList={formItemList}
        formTitle={formTitle}
        onMove={rowItemDrag} />) : (<div className={className}><h3>{formTitle}</h3><Form layout={formLayout}>{formItemList}</Form></div>));
}

const createComponent = (component)=>{
  if (typeof component === 'object') {
    if (component.name) {
      // object desc
      const {name, props = {}, children = [] } = component;
      if (name) {
        return getComponent(name, props, children)
      }
    } else if (component.$$typeof && component.$$typeof.toString() === 'Symbol(react.element)') {
      // React component
      return component
    }
  } else if (typeof component === 'function') {
    return component()
  }
}
const getFormItem = (formItemInner, formItemConfig)=>{
  const {name, label, wrapper, wrapperClass, formItemLayout,
    rowItemClick = f=>f, rowItemIconCopy, rowItemIconDelete, active} = formItemConfig;
  const FormItem = Form.Item;
  return wrapper ? (
    <div className={wrapperClass} key={name}>
      {formItemInner}
    </div>) : (
    <div key={name} className={active ? 'rowItemWrapper active' : 'rowItemWrapper'} onClick={(event)=>{ rowItemClick(name, event) }}>
      <FormItem
        key={name}
        {...formItemLayout}
        label={label}
      >
        {formItemInner}
      </FormItem>{active ? (
      <div className="ant-form-item-action">
        <Tooltip title="复制">
          <Icon type="copy" onClick={(event)=>{ rowItemIconCopy(event, name) }} />
        </Tooltip>
        <Tooltip title="删除">
          <Icon type="delete" onClick={(event)=>{ rowItemIconDelete(event, name) }} />
        </Tooltip>
        <Tooltip title="拖拽">
          <Icon
            type="pause-circle-o"
            style={{cursor: 'move', transform: 'rotate(90deg)', display: 'none'}} />
        </Tooltip>
      </div>) : null}</div>);
}
