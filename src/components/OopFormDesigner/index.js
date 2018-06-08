import React from 'react';
import { Button, Card, Row, Col, Radio, Input, Tooltip } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import cloneDeep from 'lodash/cloneDeep';
import update from 'immutability-helper/index';
import { getUuid } from '../../common/oopUtils';
import OopForm from '../../components/OopForm';
import styles from './index.less';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// console.log(formJson)
const CenterPanel = (props) => {
  const {rowItems, onFormTitleClick,
    onRowItemClick, onRowItemIconCopy, onRowItemIconDelete, onRowItemDrag,
    onFormSubmit, onFormLayoutChange, formLayout, formTitle, self} = props;
  const rowItemClick = (name)=>{
    onRowItemClick(name)
  }
  const rowItemIconCopy = ()=>{
    onRowItemIconCopy()
  }
  const rowItemIconDelete = ()=>{
    onRowItemIconDelete()
  }
  const rowItemDrag = (i, j)=>{
    onRowItemDrag(i, j)
  }
  const formLayoutChange = (event)=>{
    onFormLayoutChange(event)
  }
  const toggleFormLayoutButtons = (
    <RadioGroup defaultValue={formLayout} onChange={formLayoutChange}>
      <RadioButton value="horizontal">横向布局</RadioButton>
      <RadioButton value="vertical">纵向布局</RadioButton>
    </RadioGroup>)
  const param = {formJson: rowItems, dragable: true, formLayout,
    rowItemClick, rowItemIconCopy, rowItemIconDelete, rowItemDrag
  }
  const titleCss = {
    maxWidth: '380px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block'
  }
  const wrapperCss = {
    display: 'flex',
    alignItems: 'center'
  }
  const titleClick = ()=>{
    onFormTitleClick(formTitle)
  }
  const title = (
    <div style={wrapperCss}>
      { typeof formTitle === 'object' ? <span style={titleCss}>{formTitle}</span> : (
        <Tooltip placement="topLeft" title={formTitle}>
          <span style={titleCss}>{formTitle}</span>
        </Tooltip>)}
      {(typeof formTitle === 'object') ? null : (<a onClick={titleClick} className="form-title">编辑</a>)}
    </div>);
  return (
    <div className={styles.centerPanel}>
      <Card title={title} extra={toggleFormLayoutButtons}>
        <OopForm {...param} ref={(el)=>{ self.oopForm = el }} />
        <div style={{textAlign: 'center', display: 'none'}}>
          {rowItems.length ? (<Button type="primary" onClick={onFormSubmit}>保存为自定义组件</Button>) : null}
        </div>
      </Card>
    </div>);
};
const AddPanel = (props) => {
  const { selections, onAddItem} = props;
  const addItem = (item)=>{
    onAddItem(item)
  }
  return (
    <div className={styles.addPanel}><Card title="添加组件" bordered={false}><ul>{
      selections.map(item=>(<li key={item.key}><Button type="primary" ghost onClick={()=>addItem(item)}>{item.label}</Button></li>))
    }</ul></Card></div>);
};
const EditPanel = (props) => {
  const { currentRowItem,
    updateCenterPanel, onRowItemIconCopy, onRowItemIconDelete, onPlusClick, onRowItemDrag } = props;
  const rowItemIconCopy = (event, name)=>{
    onRowItemIconCopy(name)
  }
  const rowItemIconDelete = (event, name)=>{
    onRowItemIconDelete(name)
  }
  const rowItemDrag = (i, j, item)=>{
    onRowItemDrag(i, j, item)
  }
  const createFormByFormItemData = (item)=>{
    if (!item) {
      return
    }
    // console.log(item)
    const { name, label, initialValue, component} = item;
    const cName = component.name;
    if (!cName) {
      return
    }
    const { children } = component;
    const onChange = (e)=>{
      const element = e.currentTarget;
      updateCenterPanel(element.id, element.value);
    }
    const plusClick = ()=>{
      onPlusClick(name)
    }
    const prefix = '_edit';
    let formConfig = {
      formJson: []
    }
    // 输入框 文本域 数字输入框
    if ('Input,TextArea,InputNumber'.includes(cName)) {
      formConfig.formJson = [{
        name: `${name}${prefix}_label`,
        label: '标题',
        component: {
          name: 'Input',
          props: {placeholder: label, onChange}
        },
        initialValue: initialValue || label
      }, {
        name: `${name}${prefix}_props_placeholder`,
        label: '占位符',
        component: {
          name: 'Input',
          props: {placeholder: '该输入些什么', onChange}
        },
      },
      {
        name: `${name}${prefix}_name`,
        label: 'name',
        component: {
          name: 'Input',
          props: {placeholder: name, onChange}
        },
        initialValue: name
      }];
      formConfig = {...formConfig, formLayout: 'vertical'}
    } else if ('RadioGroup,CheckboxGroup,Select'.includes(cName)) {
      formConfig.formJson = [{
        name: `${name}${prefix}_label`,
        label: '标题',
        component: {
          name: 'Input',
          props: {placeholder: label, onChange}
        },
        initialValue: initialValue || label
      },
      {
        name: `${name}${prefix}_children`,
        label: '选项',
        component: children.length === 0 ? {
          name: 'Button',
          props: {icon: 'plus', onClick: plusClick}
        } : {
          name: 'Input',
          props: {type: 'hidden'}
        },
        initialValue: ''
      }];
      const childrenArr = children.map((cld, i)=>(
        {
          name: `${name}${prefix}_${i}_children`,
          label: '',
          component: {
            name: 'Input',
            props: {onChange}
          },
          initialValue: cld.label,
          dragable: true,
          active: true
        }
      ))
      childrenArr.push({
        name: `${name}${prefix}_name`,
        label: 'name',
        component: {
          name: 'Input',
          props: {placeholder: name}
        },
        initialValue: name
      })
      formConfig.formJson = formConfig.formJson.concat(childrenArr)
      // radio checkbox 增加布局判断
      if ('RadioGroup,CheckboxGroup'.includes(cName)) {
        const layoutChange = (event)=>{
          updateCenterPanel(event.target.name, event.target.value)
        }
        let layout = 'horizontal';
        if (component.props && component.props.className === 'vertical') {
          layout = 'vertical'
        }
        const componentName = `${name}${prefix}_props_className`
        const toggleFormLayoutButtons = (
          <RadioGroup onChange={layoutChange} size="small" name={componentName} >
            <RadioButton value="horizontal">横向布局</RadioButton>
            <RadioButton value="vertical">纵向布局</RadioButton>
          </RadioGroup>)
        formConfig.formJson.push({
          name: componentName,
          label: '布局',
          component: toggleFormLayoutButtons,
          initialValue: layout
        })
      }
      formConfig = {...formConfig, formLayout: 'vertical', rowItemIconCopy, rowItemIconDelete, rowItemDrag}
    }
    const ruleChange = (event)=>{
      const {value} = event.target;
      if (value === '1') {
        const rule = {required: true, message: '此项为必填项'};
        updateCenterPanel(event.target.name, rule);
      } else if (value === '0') {
        const rule = {required: false};
        updateCenterPanel(event.target.name, rule);
      } else if (value === '2') {
        // TODO show modal custom
      }
    }
    const requieRulesRadio = (
      <RadioGroup onChange={ruleChange} size="small" name={`${name}${prefix}_rules`} >
        <Radio value="1">必填</Radio>
        <Radio value="0">不必填</Radio>
        <Radio value="2">自定义</Radio>
      </RadioGroup>);
    // 增加规则判断
    const rulesArr = [{
      name: `${name}${prefix}_rules`,
      label: '规则',
      component: requieRulesRadio,
      initialValue: '0'
    }]
    formConfig.formJson = formConfig.formJson.concat(rulesArr)
    return (<OopForm {...formConfig} />);
  }
  return (
    <div className={styles.editPanel}>
      <Card title="编辑组件详情" bordered={false}>
        {createFormByFormItemData(currentRowItem)}
      </Card></div>);
};
const componentData = [
  {label: 'A', value: 'A'},
  {label: 'B', value: 'B'},
  {label: 'C', value: 'C'},
  {label: 'D', value: 'D'}
]

export default class OopFormDesigner extends React.PureComponent {
  state = {
    currentRowItem: null,
    selections: [
      {label: '输入框', key: 'Input', component: {name: 'Input'}},
      {label: '文本域', key: 'TextArea', component: {name: 'TextArea'}},
      {label: '单选框', key: 'RadioGroup', component: {name: 'RadioGroup', children: componentData}},
      {label: '多选框', key: 'CheckboxGroup', component: {name: 'CheckboxGroup', children: componentData}, initialValue: []},
      {label: '选择器', key: 'Select', component: {name: 'Select', children: componentData}},
      {label: '数字输入框', key: 'InputNumber', component: {name: 'InputNumber'}}
    ],
    rowItems: this.props.formDetails.formJson,
    formLayout: this.props.formDetails.formLayout,
    formTitle: this.props.formDetails.formTitle
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
      name: getUuid(5)
    }
    this.state.rowItems.push(newItem);
    this.forceUpdate()
  }
  onPlusClick = ()=>{
    this.state.currentRowItem.component.children = [
      {label: 'A', value: 'A'}
    ]
    this.forceUpdate();
  }
  onRowItemDrag = (dragIndex, hoverIndex)=>{
    const dragCard = this.state.rowItems[dragIndex]
    console.log(dragCard)
    this.setState(
      update(this.state, {
        rowItems: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }
  onEditPanelRowItemDrag = (dragIndex, hoverIndex)=>{
    const {children} = this.state.currentRowItem.component;
    const dragCard = children[dragIndex];
    console.log(dragCard)
    const newChildren = update(children, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    })
    console.log(newChildren)
    this.state.currentRowItem.component.children = newChildren;
    this.forceUpdate();
  }
  onUpdateCenterPanel = (elementId, value)=>{
    if (elementId) {
      this.renderCenterPanel(elementId, value);
    }
  }
  @Debounce(300)
  renderCenterPanel(id, value) {
    console.log(this.state.currentRowItem)
    console.log(id, value);
    const idAttr = id.split('_');
    const attr = idAttr.pop();
    // 组件内部props的同步
    if (idAttr.pop() === 'props') {
      const { component } = this.state.currentRowItem;
      component.props = {
        ...component.props,
        [attr]: value
      };
      this.forceUpdate();
      return
    }
    // children 或者 组件外部属性的同步
    if (attr === 'children') {
      const {children} = this.state.currentRowItem.component;
      const i = idAttr.pop();
      children[i].label = value;
    } else if (attr === 'rules') {
      const {rules = []} = this.state.currentRowItem;
      if (rules.length) {
        rules[0].required = value.required;
      } else {
        rules.push(value)
      }
      this.state.currentRowItem.rules = rules;
    } else {
      this.state.currentRowItem[attr] = value;
    }
    this.forceUpdate()
  }
  getFormConfig = ()=>{
    const {rowItems, formLayout, formTitle} = this.state;
    console.log('getFormConfig', this)
    const form = this.oopForm.getForm();
    const fieldsValue = form.getFieldsValue();
    // 设置默认值
    rowItems.forEach((item)=>{
      const {name} = item;
      const value = fieldsValue[name];
      if (value) {
        item.initialValue = value
      }
    })
    return {
      formJson: rowItems,
      formTitle,
      formLayout
    }
  }
  resetForm = ()=>{
    this.setState({
      rowItems: [],
      formLayout: 'horizontal',
      formTitle: '你的表单'
    })
  }
  onFormLayoutChange = (event)=>{
    this.setState({
      formLayout: event.target.value
    })
  }
  onFormTitleClick = (title)=>{
    const confirm = ()=>{
      const {value} = this.formTitleEditInput.input;
      this.setState({
        formTitle: value
      })
    }
    const cancel = ()=>{
      this.setState({
        formTitle: title
      })
    }
    const formTitle = (
      <div>
        <Input defaultValue={title} style={{width: '208px'}} ref={ (el)=>{ this.formTitleEditInput = el } } />
        <Button type="primary" onClick={confirm}>确定</Button><Button onClick={cancel}>取消</Button>
      </div>);
    this.setState({
      formTitle
    })
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
            onRowItemDrag={this.onRowItemDrag}
            onFormLayoutChange={this.onFormLayoutChange}
            formTitle={this.state.formTitle}
            formLayout={this.state.formLayout}
            onFormTitleClick={this.onFormTitleClick}
            self={this}
          /></Col>
          <Col span={6} ><EditPanel
            currentRowItem={this.state.currentRowItem}
            updateCenterPanel={this.onUpdateCenterPanel}
            onRowItemIconCopy={this.onRowItemIconCopy}
            onRowItemIconDelete={this.onRowItemIconDelete}
            onPlusClick={this.onPlusClick}
            onRowItemDrag={this.onEditPanelRowItemDrag} /></Col>
        </Row>
      </div>)
  }
}
