import React from 'react';
import { Form, Button, Card, Row, Col } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import cloneDeep from 'lodash/cloneDeep';
import {connect} from 'dva';
import styles from './Designer.less';
import { formGenerator, getUuid } from '../../../common/oopUtils';

// console.log(formJson)
const CenterPanel = Form.create()((props) => {
  const {form, rowItems, onRowItemClick, onRowItemIconCopy, onRowItemIconDelete,
    onFormSubmit} = props;
  const rowItemClick = (name)=>{
    onRowItemClick(name)
  }
  const rowItemIconCopy = ()=>{
    onRowItemIconCopy()
  }
  const rowItemIconDelete = ()=>{
    onRowItemIconDelete()
  }
  const param = {formJson: rowItems, form, rowItemClick, rowItemIconCopy, rowItemIconDelete}
  return (
  <div className={styles.centerPanel}>
    <Card title="你的表单" bordered={false}>
    {formGenerator(param)}
      <div style={{textAlign: 'center'}}><Button type="primary" onClick={onFormSubmit}>提交</Button></div>
    </Card>
  </div>);
});
const AddPanel = connect()((props) => {
  const { selections, onAddItem} = props;
  const addItem = (item)=>{
    onAddItem(item)
  }
  return (
    <div className={styles.addPanel}><Card title="添加组件" bordered={false}><ul>{
    selections.map(item=>(<li key={item.key}><Button type="primary" ghost onClick={()=>addItem(item)}>{item.label}</Button></li>))
    }</ul></Card></div>);
});
const EditPanel = Form.create()((props) => {
  const { form,
    currentRowItem,
    updateCenterPanel, onRowItemIconCopy, onRowItemIconDelete, onPlusClick } = props;
  const rowItemIconCopy = (event, name)=>{
    onRowItemIconCopy(name)
  }
  const rowItemIconDelete = (event, name)=>{
    onRowItemIconDelete(name)
  }
  const createFormByFormItemData = (item)=>{
    if (item) {
      // console.log(item)
      const { name, label, initialValue, component} = item;
      const cName = component.name;
      const { children } = component;
      const onChange = (e)=>{
        const element = e.currentTarget;
        updateCenterPanel(element);
      }
      const plusClick = ()=>{
        onPlusClick(name)
      }
      if (cName) {
        const prefix = '_edit'
        // 输入框 文本域 数字输入框
        if ('Input,TextArea,InputNumber'.includes(cName)) {
          const editFormJson = [{
            name: `${name}${prefix}_label`,
            label: '标题',
            component: {
              name: 'Input',
              attrs: [{placeholder: label, onChange}]
            },
            initialValue: ''
          },
          {
            name: `${name}${prefix}_initialValue`,
            label: '初始值',
            component: {
              name: 'Input',
              attrs: [{placeholder: initialValue, onChange}]
            },
            initialValue: ''
          },
          {
            name: `${name}${prefix}_name`,
            label: 'name',
            component: {
              name: 'Input',
              attrs: [{placeholder: name, onChange}]
            },
            initialValue: name
          }];
          const param = {formJson: editFormJson, form, formLayout: 'vertical'}
          return formGenerator(param)
        } else if ('RadioGroup,CheckboxGroup'.includes(cName)) {
          let editFormJson = [{
            name: `${name}${prefix}_label`,
            label: '标题',
            component: {
              name: 'Input',
              attrs: [{placeholder: label, onChange}]
            },
            initialValue: ''
          },
          {
            name: `${name}${prefix}_children`,
            label: '选项',
            component: children.length === 0 ? {
              name: 'Button',
              attrs: [{icon: 'plus'}, {onClick: plusClick}]
            } : {
              name: 'Input',
              attrs: [{type: 'hidden'}]
            },
            initialValue: ''
          }];
          const arr = children.map((cld, i)=>(
            {
              name: `${name}${prefix}_${i}_children`,
              label: '',
              component: {
                name: 'Input',
                attrs: [{onChange}]
              },
              initialValue: cld.label,
              active: true
            }
          ))
          arr.push({
            name: `${name}${prefix}_name`,
            label: 'name',
            component: {
              name: 'Input',
              attrs: [{placeholder: name}]
            },
            initialValue: name
          })
          editFormJson = [...editFormJson, ...arr];
          const param = {formJson: editFormJson, form, formLayout: 'vertical', rowItemIconCopy, rowItemIconDelete}
          return formGenerator(param)
        }
      }
    }
  }
  return (
    <div className={styles.editPanel}>
      <Card title="编辑组件详情" bordered={false}>
        {createFormByFormItemData(currentRowItem)}
    </Card></div>);
});
const componentData = [
  {label: 'A', value: 'A'},
  {label: 'B', value: 'B'},
  {label: 'C', value: 'C'},
  {label: 'D', value: 'D'}
]
export default class Designer extends React.PureComponent {
  state = {
    currentRowItem: null,
    selections: [
      {label: '输入框', key: '1', component: {name: 'Input'}},
      {label: '文本域', key: '2', component: {name: 'TextArea'}},
      {label: '单选框', key: '3', component: {name: 'RadioGroup', children: componentData}},
      {label: '多选框', key: '4', component: {name: 'CheckboxGroup', children: componentData}, initialValue: []},
      {label: '选择器', key: '5', component: {name: 'Select', children: componentData}},
      {label: '数字输入框', key: '6', component: {name: 'InputNumber'}}
    ],
    rowItems: [],
  }
  componentWillUnmount() {
    this.renderCenterPanel.cancel();
  }
  componentDidMount() {
    console.log(this.state.currentRowItem, this.state.rowItems)
  }
  onRowItemClick = (name)=>{
    this.state.rowItems.forEach((item)=>{
      const aItem = item;
      if (aItem.name === name) {
        aItem.active = true;
        this.setState({
          currentRowItem: aItem
        })
      } else {
        aItem.active = false;
      }
    })
    this.forceUpdate()
  }
  /**
   * 如果传了name那么是“EditPanel”中的复制
   * 否则是“CenterPanel中”的复制
   * 下面的删除一样
   * @param name
   */
  onRowItemIconCopy = (name)=>{
    if (name) {
      const item = this.state.currentRowItem;
      const {children} = item.component
      const arr = name.split('_');
      arr.pop();
      const index = arr.pop();
      const options = children[index];
      const copy = {
        ...options,
        value: getUuid(5)
      }
      children.push(copy);
      this.forceUpdate()
    } else {
      const item = this.state.currentRowItem;
      const copy = cloneDeep(item);
      const newItem = {
        ...copy,
        name: getUuid(5),
        active: false
      }
      this.state.rowItems.push(newItem);
    }
  }
  onRowItemIconDelete = (name)=>{
    if (name) {
      const item = this.state.currentRowItem;
      const {children} = item.component
      const arr = name.split('_');
      arr.pop();
      const index = arr.pop();
      children.splice(index, 1);
      console.log(children)
      this.forceUpdate()
    } else {
      const item = this.state.currentRowItem;
      let index = 0;
      this.state.rowItems.forEach((rItem, i)=>{
        if (item.name === rItem.name) {
          index = i
        }
      })
      this.state.rowItems.splice(index, 1);
      if (item.active) {
        this.state.currentRowItem = null;
      }
    }
  }
  onAddItem = (item)=>{
    const copy = cloneDeep(item);
    const newItem = {
      ...copy,
      name: getUuid(5),
    }
    this.state.rowItems.push(newItem);
    this.forceUpdate()
  }
  onPlusClick = ()=>{
    this.state.currentRowItem.component.children = [
      {label: 'A', value: 'B'}
    ]
    this.forceUpdate();
  }
  onUpdateCenterPanel = (element)=>{
    this.renderCenterPanel(element);
  }
  @Debounce(300)
  renderCenterPanel(element) {
    console.log(this.state.currentRowItem)
    console.log(element);
    const {value, id} = element;
    const idAttr = id.split('_');
    const attr = idAttr.pop();
    if (attr === 'children') {
      const {children} = this.state.currentRowItem.component;
      const i = idAttr.pop();
      children[i].label = value;
    } else {
      this.state.currentRowItem[attr] = value;
    }
    this.forceUpdate()
  }
  onFormSubmit = ()=>{
    console.log(this.state.rowItems)
  }
  render() {
    return (
      <div className={styles.container}>
        <Row gutter={16}>
          <Col span={6} ><AddPanel
            selections={this.state.selections}
            onAddItem={this.onAddItem}
          /></Col>
          <Col span={12} ><CenterPanel
            rowItems={this.state.rowItems}
            onRowItemClick={this.onRowItemClick}
            onRowItemIconCopy={this.onRowItemIconCopy}
            onRowItemIconDelete={this.onRowItemIconDelete}
            onFormSubmit={this.onFormSubmit}
          /></Col>
          <Col span={6} ><EditPanel
            currentRowItem={this.state.currentRowItem}
            updateCenterPanel={this.onUpdateCenterPanel}
            onRowItemIconCopy={this.onRowItemIconCopy}
            onRowItemIconDelete={this.onRowItemIconDelete}
            onPlusClick={this.onPlusClick} /></Col>
        </Row>
    </div>)
  }
}
