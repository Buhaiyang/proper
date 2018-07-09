/*
* @auth denggy
* @date 2018-7-6 10:08:50
* @desc workflow办理的公共页
 */
import React, { PureComponent } from 'react';
import {connect} from 'dva/index';
import { Tabs, Spin } from 'antd';
import {inject} from '../../common/inject';
import OopForm from '../OopForm'

const { TabPane } = Tabs;
const BusinessPanel = (props)=>{
  const {formConfig = {}, defaultValue, formLoading, isLaunch} = props;
  const ApprovalPanelJson = [{
    label: '审批意见',
    name: 'passOrNot',
    component: {
      name: 'RadioGroup',
      children: [
        {label: '同意', value: 1},
        {label: '不同意', value: 0},
      ],
    },
    initialValue: 1
  },
  {
    label: '审批说明',
    name: 'approvalRemarks',
    component: {
      name: 'TextArea',
      props: {
        placeholder: '请对审核意见进行说明'
      }
    }
  }];

  // 如果是发起的节点 那么 没有 审批意见
  if (!isLaunch) {
    if (!formConfig.formJson) {
      formConfig.formJson = [];
    }
    formConfig.formJson = formConfig.formJson.concat(ApprovalPanelJson);
  }
  return (
    <Spin spinning={formLoading}>
      <OopForm {...formConfig} defaultValue={defaultValue} />
    </Spin>);
}

@inject('baseWorkflow')
@connect(({baseWorkflow, loading})=>({
  baseWorkflow,
  formLoading: loading.effects['baseWorkflow/fetchByFormCode']
}), null, null, {withRef: true})
export default class OopWorkflowMain extends PureComponent {
  state = {
    defaultActiveKey: 'handle'
  }
  componentDidMount() {
    const { businessObj } = this.props;
    const key = Object.keys(businessObj)[0];
    this.props.dispatch({
      type: 'baseWorkflow/fetchByFormCode',
      payload: key
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'baseWorkflow/clearFormEntiry'
    })
  }
  getHandleTabComponent = ()=>{
    const { baseWorkflow: {formEntity}, businessObj, formLoading, isLaunch} = this.props;
    const { formDetails } = formEntity;
    const formConfig = formDetails ? JSON.parse(formDetails) : {};
    const title = isLaunch ? (<h2>流程发起</h2>) : (<h2>流程审批</h2>);
    const key = Object.keys(businessObj)[0];
    const value = businessObj[key];
    return (
      <div>
        {title}
        <BusinessPanel isLaunch={isLaunch} formLoading={formLoading} defaultValue={value} formConfig={formConfig} />
      </div>
    )
  }
  renderPage = ()=>{
    const handleTab = this.getHandleTabComponent();
    const panes = [
      {title: '流程处理', key: 'handle', content: handleTab},
      {title: '流程进度', key: 'progress', disabled: true},
      {title: '流程图', key: 'image', disabled: true},
    ];
    const tabs = (
      <Tabs defaultActiveKey={this.state.defaultActiveKey}>
        {panes.map(tab=>(
          <TabPane key={tab.key} tab={tab.title} disabled={tab.disabled}>{tab.content}</TabPane>
        ))
        }
      </Tabs>);
    return tabs;
  }
  submitWorkflow = (callback)=>{
    console.log('submitWorkflow...');
    const {taskOrProcDefKey} = this.props;
    const formData = {
      a: 1,
      b: 2,
      c: 3
    }
    this.props.dispatch({
      type: 'baseWorkflow/submitWorkflow',
      payload: {taskOrProcDefKey, formData},
      callback: (res)=>{
        callback && callback(res)
      }
    })
  }
  launchWorkflow = (callback)=>{
    console.log('launchWorkflow...', this.props);
    const {taskOrProcDefKey} = this.props;
    const formData = {
      a: 1,
      b: 2,
      c: 3
    }
    this.props.dispatch({
      type: 'baseWorkflow/launchWorkflow',
      payload: {taskOrProcDefKey, formData},
      callback: (res)=>{
        callback && callback(res)
      }
    })
  }
  render() {
    return (
      <div>
        {this.renderPage()}
    </div>);
  }
}
