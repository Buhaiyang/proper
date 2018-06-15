import React, { PureComponent, Fragment } from 'react';
import {Modal, Popover, Button, Alert, Icon, Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
const hLine = (<div style={{height: 1, borderBottom: '1px solid #ddd', margin: '24px 0'}} />)
export default class OopModal extends PureComponent {
  state = {
  }
  createModalContent = (tabs)=>{
    return tabs.map(tab=>(
    <div key={tab.key} className={styles.oopTabContainer} name={tab.key}>
      <div style={{fontSize: 16, fontWeight: 'bold'}}>{tab.title}</div>
      {hLine}
      {tab.tips ? <Alert message={tab.tips} type="info" showIcon /> : null}
      <div style={{marginTop: 24}}>{tab.content}</div>
    </div>))
  }
  getInitProps = ()=>{
    const { props } = this;
    const loading = false;
    const onOk = ()=>{
      console.log('ok');
      props.onOk && props.onOk()
    }
    const onCancel = ()=>{
      props.onCancel && props.onCancel()
    };
    const footer = (
      <Fragment>
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={onOk} loading={loading}>保存</Button>
      </Fragment>);
    const _props = {
      title: 'Title',
      footer,
      tabs: [
        {
          title: '基本信息',
          content: <div>表单内容</div>,
          tips: <div>新建时，需要<a>填写完基本信息的必填项并保存</a>后，滚动页面或点击左上角的导航来完善其他信息</div>,
          main: true
        },
        {
          title: '关联用户',
          content: <div>关联内容</div>,
          tips: <div>请选择您要关联的用户，<a>点击用户所在行</a>即可选中</div>
        }
      ],
      ...props,
    }
    const antdTabs = (
    <Tabs tabPosition="right" onTabClick={this.onTabClick} size="small">
      {_props.tabs.map(tab=>(<TabPane tab={tab.title} key={tab.key} />))}
    </Tabs>);
    _props.title = (
      <span style={{display: 'flex', alignItems: 'center'}}>
      <Popover placement="left" content={antdTabs} trigger="click" getPopupContainer={()=>document.getElementsByClassName(styles.oopModalContainer)[0]}>
        <Icon type="bars" style={{fontSize: 24, cursor: 'pointer'}} />
      </Popover>
      <span style={{marginLeft: 8}}>{_props.title}</span>
    </span>);
    return _props;
  }
  // 计算滚动的高度
  calculateScrollHeight = (currentElement)=>{
    let height = 0;
    let prevEl = currentElement.previousElementSibling;
    while (prevEl) {
      height += prevEl.offsetHeight;
      prevEl = prevEl.previousElementSibling;
    }
    return height;
  }
  // modalbody滚动到相应位置
  scrollModalBody = (currentElement, height)=>{
    const mbody = currentElement.parentNode;
    if (mbody) {
      mbody.scrollTo({top: height})
    }
  }
  onTabClick = (key)=>{
    const containers = document.getElementsByClassName(styles.oopTabContainer);
    const curContainer = Array.from(containers).find(item=>item.getAttribute('name') === key);
    const scrollHeight = this.calculateScrollHeight(curContainer);
    this.scrollModalBody(curContainer, scrollHeight);
  }
  render() {
    const props = this.getInitProps()
    const modalStyle = {
      top: 20,
      height: 'calc(100vh - 40px)',
      overflow: 'hidden',
      borderRadius: 5
    }
    return (
      <div className={styles.oopModalContainer}>
        <Modal
          getContainer={()=>document.getElementsByClassName(styles.oopModalContainer)[0]}
          ref={ (el)=>{ this.oopModal = el }}
          {...props}
          style={modalStyle}>
          {this.createModalContent(props.tabs)}
        </Modal>
      </div>)
  }
}
