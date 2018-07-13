import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import {formGenerator} from './utils';
import styles from './index.less';

@Form.create()
export default class OopForm extends React.PureComponent {
  render() {
    const { disabled = false, formJson = [], defaultValue = {}, form } = this.props;
    formJson.forEach((item)=>{
      const {initialValue, component} = item;
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
          item.initialValue = moment(item.initialValue, format);
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
    });
    const formConfig = {...this.props, form, className: styles.container };
    return formGenerator(formConfig)
  }
}
