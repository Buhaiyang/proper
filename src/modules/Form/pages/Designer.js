import React from 'react';
import { Form, Button, Card } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import {connect} from 'dva';
import styles from './Designer.less';
import { formGenerator, getUuid } from '../../../common/oopUtils';

// console.log(formJson)
const CenterBox = Form.create()((props) => {
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
  <div className={styles.centerBox}>
    <Card title="你的表单" bordered={false} style={{ width: 700 }}>
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
    <div className={styles.addPanel}><Card title="添加组件" bordered={false} style={{ width: 300 }}><ul>{
    selections.map(item=>(<li key={item.key}><Button type="primary" ghost onClick={()=>addItem(item)}>{item.text}</Button></li>))
    }</ul></Card></div>);
});
const EditPanel = Form.create()((props) => {
  const { form, currentRowItem, updateCenterBox, onRowItemIconCopy, onRowItemIconDelete } = props;
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
        updateCenterBox(element);
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
            component: {
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
const generateData = ()=>{
  const arr = [...componentData]
  return [
    ...arr
  ]
}
export default class Designer extends React.PureComponent {
  state = {
    currentRowItem: null,
    selections: [
      {text: '输入框', key: '1', component: {name: 'Input'}},
      {text: '文本域', key: '2', component: {name: 'TextArea'}},
      {text: '单选框', key: '3', component: {name: 'RadioGroup', children: generateData()}},
      {text: '多选框', key: '4', component: {name: 'CheckboxGroup', children: generateData()}, initialValue: []},
      {text: '选择器', key: '5', component: {name: 'Select', children: generateData()}},
      {text: '数字输入框', key: '6', component: {name: 'InputNumber'}}
    ],
    rowItems: [],
  }
  componentWillUnmount() {
    this.renderCenterBox.cancel();
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
   * 否则是“CenterBox中”的复制
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
      if (item) {
        let copy = {
          ...item,
        }
        // 如果是radio checkbox
        if (copy.component.children) {
          copy = {
            ...copy,
            component: {
              ...item.component,
              children: [
                ...item.component.children
              ]
            }
          }
        }
        copy.active = false;
        copy.name = getUuid(5);
        this.state.rowItems.push(copy)
      }
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
    const {component, text, initialValue} = item
    let newItem = {
      name: getUuid(5),
      label: text,
      initialValue,
      component
    }
    if (component.children) {
      newItem = {
        ...newItem,
        component: {
          ...item.component,
          children: [
            ...item.component.children
          ]
        }
      }
    }
    console.log(newItem)
    this.state.rowItems.push(newItem);
    this.forceUpdate()
  }
  onUpdateCenterBox = (element)=>{
    this.renderCenterBox(element);
  }
  @Debounce(300)
  renderCenterBox(element) {
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
        <div className={styles.leftPage} >
          <AddPanel
            selections={this.state.selections}
            onAddItem={this.onAddItem}
          />
          <CenterBox
            rowItems={this.state.rowItems}
            onRowItemClick={this.onRowItemClick}
            onRowItemIconCopy={this.onRowItemIconCopy}
            onRowItemIconDelete={this.onRowItemIconDelete}
            onFormSubmit={this.onFormSubmit}
          />
        </div>
        <div className={styles.rightPage} >
          <EditPanel
            currentRowItem={this.state.currentRowItem}
            updateCenterBox={this.onUpdateCenterBox}
            onRowItemIconCopy={this.onRowItemIconCopy}
            onRowItemIconDelete={this.onRowItemIconDelete} />
        </div>
    </div>)
  }
}
