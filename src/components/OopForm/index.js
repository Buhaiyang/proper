import React from 'react';
import { Form } from 'antd';
import {formGenerator} from './utils';

@Form.create()
export default class OopForm extends React.PureComponent {
  state = {
    form: this.props.form
  }
  componentDidMount() {
  }
  getForm = ()=>{
    return this.state.form
  }
  render() {
    const { disabled = false, formJson = [], defaultValue = {} } = this.props;
    const { form } = this.state;
    formJson.forEach((item)=>{
      const {initialValue, component} = item;
      // initialValue是数组但是长度为0 或者 没有initialValue
      if ((Array.isArray(initialValue) && initialValue.length === 0)
        || initialValue === undefined) {
        item.initialValue = defaultValue[item.name]
      } else {
        item.initialValue = defaultValue[item.name] || initialValue
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
    });
    const formConfig = {...this.props, form};
    return formGenerator(formConfig)
  }
}
