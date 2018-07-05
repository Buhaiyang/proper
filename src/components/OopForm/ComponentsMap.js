import React from 'react';
import { DatePicker, InputNumber, Input, Radio, Checkbox, Select, Button, Icon} from 'antd';
import { getUuid } from '../../common/oopUtils';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
export default (name, props, children)=> {
  const Map = {
    Input: <Input {...props} />,
    Button: <Button {...props} />,
    Icon: <Icon {...props} />,
    TextArea: <TextArea {...props} />,
    Select: (
      <Select style={{ width: '100%' }} {...props}>
        {
          children.map(item=>(<Option key={getUuid(5)} value={item.value}>{item.label}</Option>))
        }
      </Select>),
    RadioGroup: (
      <RadioGroup options={children} {...props} />),
    CheckboxGroup: (
      <CheckboxGroup options={children} {...props} />),
    InputNumber: <InputNumber {...props} />,
    DatePicker: <DatePicker format={dateFormat} {...props} />,
  }
  return Map[name];
}
