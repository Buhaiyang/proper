/*
* @auth denggy
* @date 2018-7-6 10:08:50
* @desc workflow办理的公共页
* taskOrProcDefKey 任务ID或者流程定义ID
* isLaunch 是否为发起节点
* 如果isLaunch为true taskOrProcDefKey为流程定义ID 否则为任务ID
 */
import React, { PureComponent, Fragment } from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { Input, Button, Popover, Alert, message } from 'antd';
import OopWorkflowMain from '../../OopWorkflowMain';
import {getParamObj} from '../../../utils/utils';
import styles from './index.less';

const { TextArea } = Input;
const PopPage = (props)=>{
  const { footer, children } = props;
  const footerStyle = {
    position: 'fixed',
    width: '100%',
    display: 'block',
    bottom: 0,
    padding: 16,
    background: '#fff',
    borderTop: '1px solid #ddd',
    textAlign: 'right'
  }
  return (
  <div className={styles.container}>
    {children}
    <div style={footerStyle}>{footer}</div>
  </div>)
}

@connect()
export default class WorkflowMainPop extends PureComponent {
  state = {
    buttonLoading: false,
    activeTabKey: 'handle'
  }
  submitWorkflow = ()=>{
    this.setState({
      buttonLoading: true
    })
    this.oopWorkflowMain.submitWorkflow(()=>{
      history.back()
      this.setState({
        buttonLoading: false
      })
      message.success('流程提交成功');
    })
  }
  launchWorkflow = ()=>{
    this.setButtonLoading(true)
    this.oopWorkflowMain.launchWorkflow(()=>{
      history.back()
      this.setButtonLoading(false)
      message.success('流程提交成功');
    })
  }
  setButtonLoading = (flag)=>{
    this.setState({
      buttonLoading: flag
    })
  }
  returnWorkflow = ()=>{
    console.log('returnWorkflow...');
  }
  handleCancel = ()=>{
    this.props.dispatch(routerRedux.push('/customframe/workflow'));
  }
  handleAfterClose = ()=>{
    this.setState({
      activeTabKey: 'handle'
    })
  }
  getPopoverContent = ()=>{
    return (
      <div style={{padding: 16}}>
        <Alert message="您正在进行退回流程操作，请填写退回意见并提交。（退回一旦成功无法撤销）" type="warning" showIcon />
        <TextArea style={{marginTop: 16, height: 90}} />
        <div style={{textAlign: 'right', marginTop: 8}}>
          <Button onClick={this.handleCancel} style={{marginRight: 8}}>取消</Button>
          <Button type="primary" onClick={this.returnWorkflow} loading={this.state.buttonLoading}>提交</Button>
        </div>
      </div>)
  }
  handleTabsChange = (key)=>{
    this.setState({
      activeTabKey: key
    })
  }
  render() {
    const { param } = getParamObj(this.props.location.search);
    const props = JSON.parse(decodeURIComponent(param))
    const footer = (
      <Fragment>
        <Popover
          placement="bottom"
          content={this.getPopoverContent()}
          trigger="click"
        >
          {!props.isLaunch ? <Button size="large" type="danger" ghost loading={this.state.buttonLoading} style={{display: 'none', float: 'left'}}>退回</Button> : null}
        </Popover>
        <Button size="large" onClick={this.handleCancel} style={{marginRight: 8}}>取消</Button>
        {this.state.activeTabKey === 'handle' ? (props.isLaunch ? <Button size="large" type="primary" onClick={this.launchWorkflow} loading={this.state.buttonLoading}>发起</Button>
          : <Button size="large" type="primary" onClick={this.submitWorkflow} loading={this.state.buttonLoading}>提交</Button>) : null}
      </Fragment>);
    return (
      <PopPage
        footer={footer}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        afterClose={this.handleAfterClose}
        maskClosable={false}>
        <OopWorkflowMain
          {...props}
          setButtonLoading={this.setButtonLoading}
          onTabsChange={this.handleTabsChange}
          ref={(el) => { if (el) { this.oopWorkflowMain = el.getWrappedInstance() } }} />
      </PopPage>);
  }
}
