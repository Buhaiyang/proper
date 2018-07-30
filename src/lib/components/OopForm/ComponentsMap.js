import React from 'react';
import { DatePicker, InputNumber, Input, Radio, Checkbox, Select, Button, Icon} from 'antd';
import { getUuid } from '../../../framework/common/oopUtils';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
// 移动应用下 IOS系统时间组件自动focus
const hackDatePickerIOSFocus = (e)=>{
  const el = e.target.getElementsByTagName('input')[0];
  if (el) {
    el.setAttribute('readonly', 'readonly');
  }
}
export default (name, props, children)=> {
  const Map = {
    Input: <Input {...props} />,
    Button: <Button {...props} />,
    Icon: <Icon {...props} />,
    TextArea: <TextArea {...props} />,
    Select: (
      <Select style={{ width: '100%' }} {...props} getPopupContainer={ triggerNode=>triggerNode.parentNode }>
        {
          children.map(item=>(<Option key={getUuid(5)} value={item.value}>{item.label}</Option>))
        }
      </Select>),
    RadioGroup: (
      <RadioGroup options={children} {...props} />),
    CheckboxGroup: (
      <CheckboxGroup options={children} {...props} />),
    InputNumber: <InputNumber {...props} />,
    DatePicker: <DatePicker format={dateFormat} {...props} onFocus={(e) => { hackDatePickerIOSFocus(e) }} />,
  }
  const component = Map[name];
  if (!component) {
    console.error(`warning: cannot find component named ${name}`)
    return
  }
  return component;
}
