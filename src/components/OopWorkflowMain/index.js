/*
* @auth denggy
* @date 2018-7-6 10:08:50
* @desc workflow办理的公共页
 */
import React, { PureComponent } from 'react';
import {connect} from 'dva/index';
import { Tabs, Spin, Timeline, message } from 'antd';
import {inject} from '../../common/inject';
import OopForm from '../OopForm';
import {getApplicationContextUrl} from '../../utils/utils';
import styles from './index.less';

const { TabPane } = Tabs;
const BusinessPanel = (props)=>{
  const {self, formConfig = {}, defaultValue = {}, formLoading, isLaunch} = props;
  // 清空approvalRemarks审批说明字段
  defaultValue.approvalRemarks = null;
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

  // 如果审批节点 包含 审批意见 表单为只读
  if (!isLaunch) {
    if (!formConfig.formJson) {
      formConfig.formJson = [];
    }
    formConfig.formJson.forEach((item)=>{ item.component.props = {...item.component.props, disabled: true} });
    formConfig.formJson = formConfig.formJson.concat(ApprovalPanelJson);
  }
  console.log(formConfig.formJson)
  return (
    <Spin spinning={formLoading}>
      <OopForm {...formConfig} defaultValue={defaultValue} ref={(el)=>{ if (el) { self.oopForm = el } }} />
    </Spin>);
}

@inject('baseWorkflow')
@connect(({baseWorkflow, loading})=>({
  baseWorkflow,
  formLoading: loading.effects['baseWorkflow/fetchByFormCode']
}), null, null, {withRef: true})
export default class OopWorkflowMain extends PureComponent {
  state = {
    // defaultActiveKey: 'handle'
  }
  // 根据表单ID获取表单对象
  componentDidMount() {
    if (this.props.businessObj) {
      const { businessObj: {formKey} } = this.props;
      if (!formKey) {
        message.error('表单ID未设置')
        return
      }
      this.props.dispatch({
        type: 'baseWorkflow/fetchByFormCode',
        payload: formKey
      })
    } else {
      this.handleTabsChange('progress');
    }
  }
  // 清空表单对象
  componentWillUnmount() {
    this.props.dispatch({
      type: 'baseWorkflow/clear'
    })
  }
  // 获取流程处理tab
  getHandleTabComponent = ()=>{
    const { baseWorkflow: {formEntity}, businessObj: {formData, formTitle}, formLoading, isLaunch} = this.props;
    const { formDetails } = formEntity;
    const formConfig = formDetails ? JSON.parse(formDetails) : {};
    const title = isLaunch ? (<h2>流程发起</h2>) : (<h2>流程审批</h2>);
    return (
      <div>
        {title}
        <BusinessPanel
          self={this}
          isLaunch={isLaunch}
          formLoading={formLoading}
          defaultValue={formData}
          formConfig={{...formConfig, formTitle}} />
      </div>
    )
  }
  // 获取流程进度tab
  getProcessProgressTab = ()=>{
    const { baseWorkflow: {processProgress: {currentTasks = [], hisTasks = [], start = {}}} } = this.props;
    const title = (<h2>流程历史</h2>);
    return (
    <div>
      {title}
      <Timeline style={{marginLeft: 192}}>
        {currentTasks.length && (
          <Timeline.Item>
            <h3>{currentTasks[0].name}</h3>
            <div style={{marginTop: 16}}><span>当前审批人: </span>{currentTasks[0].assigneeName}</div>
            <div style={{position: 'absolute', top: 0, left: -88, fontSize: 16, fontWeight: 'bold'}}>当前节点</div>
          </Timeline.Item>)}
        {hisTasks.map(it=>(
        <Timeline.Item key={it.taskId}>
          <h3>{it.name}</h3>
          <div style={{marginTop: 16}}><span>审批人: </span>{it.assigneeName}</div>
          <div style={{marginTop: 16}}><span>审批状态: </span>{it.form.formData.passOrNot === 1 ? '同意' : <span>不同意</span>}</div>
          <div style={{marginTop: 16}}><span>审批意见: </span>{it.form.formData.approvalRemarks}</div>
          <div style={{position: 'absolute', top: 0, left: -144}}>{it.endTime}</div>
        </Timeline.Item>)
        )}
        <Timeline.Item>
          <h3>{start.name}</h3>
          <div style={{marginTop: 16}}><span>发起人: </span>{start.startUserName}</div>
          <div style={{position: 'absolute', top: 0, left: -144}}>{start.createTime}</div>
        </Timeline.Item>
      </Timeline>
    </div>);
  }
  // 获取流程图
  getProcessImageTab = ()=>{
    const { procInstId } = this.props;
    const token = window.localStorage.getItem('proper-auth-login-token');
    const title = (<h2>流程图</h2>);
    const context = getApplicationContextUrl();
    const imgUrl = `/workflow/service/api/runtime/process-instances/${procInstId}/diagram?token=${token}`;
    if (!procInstId) {
      return
    }
    return (
    <div>
      {title}
      <div style={{textAlign: 'center', overflowX: 'auto'}}>
        <img alt="流程图" src={`${context}${imgUrl}`} style={{width: '100%'}} />
      </div>
    </div>)
  }
  // 点击tab变化
  handleTabsChange = (key)=>{
    const { procInstId, baseWorkflow: {processProgress}, onTabsChange } = this.props;
    if (key === 'progress' && processProgress.length === 0 && procInstId) {
      this.props.dispatch({
        type: 'baseWorkflow/fetchProcessProgress',
        payload: procInstId
      })
    }
    onTabsChange && onTabsChange(key);
  }
  // render 页面
  renderPage = ()=>{
    const { isLaunch, taskOrProcDefKey } = this.props;
    const processProgressTab = this.getProcessProgressTab();
    const processImageTab = this.getProcessImageTab();
    const panes = [
      {title: '流程进度', key: 'progress', content: processProgressTab, disabled: isLaunch},
      {title: '流程图', key: 'image', content: processImageTab, disabled: isLaunch},
    ]
    // 查看流程的情况
    if (taskOrProcDefKey) {
      const handleTab = this.getHandleTabComponent();
      panes.unshift({title: '流程处理', key: 'handle', content: handleTab})
    }
    const tabs = (
      <Tabs defaultActiveKey={panes[0].key} onChange={this.handleTabsChange}>
        {panes.map(tab=>(
          <TabPane key={tab.key} tab={tab.title} disabled={tab.disabled}>{tab.content}</TabPane>
        ))
        }
      </Tabs>);
    return tabs;
  }
  // 提交工作流的方法
  submitWorkflow = (callback)=>{
    console.log('submitWorkflow...');
    const {taskOrProcDefKey, setButtonLoading} = this.props;
    const form = this.oopForm.getForm();
    form.validateFields((err, formData)=>{
      if (err) {
        setButtonLoading(false)
        return
      }
      this.props.dispatch({
        type: 'baseWorkflow/submitWorkflow',
        payload: {taskOrProcDefKey, formData},
        callback: (res)=>{
          callback && callback(res)
        }
      })
    });
  }
  // 发起工作流的方法
  launchWorkflow = (callback)=>{
    console.log('launchWorkflow...');
    const {taskOrProcDefKey, setButtonLoading} = this.props;
    const form = this.oopForm.getForm();
    form.validateFields((err, formData)=>{
      if (err) {
        setButtonLoading(false)
        return
      }
      this.props.dispatch({
        type: 'baseWorkflow/launchWorkflow',
        payload: {taskOrProcDefKey, formData},
        callback: (res)=>{
          callback && callback(res)
        }
      })
    });
  }
  render() {
    return (
      <div className={styles.container}>
        {this.renderPage()}
    </div>);
  }
}
