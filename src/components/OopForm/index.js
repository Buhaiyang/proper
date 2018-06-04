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
    const { disabled = false, formJson = [] } = this.props;
    if (disabled) {
      if (formJson.length) {
        formJson.forEach((item)=>{
          const {component} = item;
          if (!component.$$typeof) {
            if (!component.attrs) {
              component.attrs = [];
            }
            component.attrs.push({disabled: true});
          }
        });
      }
    }
    const formConfig = {...this.props, form: this.state.form};
    return formGenerator(formConfig)
  }
}
