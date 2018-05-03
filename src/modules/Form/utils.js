import React from 'react';
import { Form, Icon, Tooltip } from 'antd';
import getComponent from '../../common/ComponentsMap';
import FormContainer from './pages/FormContainer';

export const formGenerator = (formConfig)=>{
  const {formJson, form, formLayout = 'horizontal', rowItemClick, rowItemIconCopy, rowItemIconDelete, rowItemDrag,
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
  const {getFieldDecorator} = form;
  const formItemList = [];
  if (Array.isArray(formJson) && formJson.length > 0) {
    for (let i = 0; i < formJson.length; i++) {
      const formItemConfig = formJson[i];
      const {name, initialValue, rules, component } = formItemConfig;
      let formItem = null;
      if (name && component) {
        const formItemInner = getFieldDecorator(name, {initialValue, rules})(
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
        formLayout={formLayout}
        formItemList={formItemList}
        onMove={rowItemDrag} />) : <Form layout={formLayout}>{formItemList}</Form>);
}

const createComponent = (component)=>{
  if (typeof component === 'object') {
    if (component.name) {
      // object desc
      const {name, attrs = [], children = [] } = component;
      let props = {};
      attrs.map((attr)=>{ props = {...props, ...attr}; return props })
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
          <Icon type="copy" style={{color: '#1DA57A'}} onClick={(event)=>{ rowItemIconCopy(event, name) }} />
        </Tooltip>
        <Tooltip title="删除">
          <Icon type="delete" style={{color: '#1DA57A'}} onClick={(event)=>{ rowItemIconDelete(event, name) }} />
        </Tooltip>
        <Tooltip title="拖拽">
          <Icon
            type="pause-circle-o"
            style={{color: '#1DA57A', cursor: 'move', transform: 'rotate(90deg)', display: 'none'}} />
        </Tooltip>
      </div>) : null}</div>);
}
