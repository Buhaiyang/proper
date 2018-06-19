import React, { PureComponent, Fragment } from 'react';
import {Modal, Popover, Button, Alert, Icon, Tabs, Popconfirm } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
const hLine = (<div style={{height: 1, borderBottom: '1px solid #ddd', margin: '24px 0'}} />)
export default class OopModal extends PureComponent {
  state = {
  }
  // 编辑的时候不显示蓝色的提示框<Alert />
  createModalContent = (tabs, isCreate)=>{
    return tabs.map(tab=>(
      tab.disabled ? null : (
    <div key={tab.key} className={styles.oopTabContainer} name={tab.key}>
      <div style={{fontSize: 16, fontWeight: 'bold'}}>{tab.title}</div>
      {hLine}
      {isCreate ? (tab.tips ? <Alert message={tab.tips} type="info" showIcon /> : null) : null}
      <div style={{marginTop: 24}}>{tab.content}</div>
    </div>)));
  }
  getInitProps = ()=>{
    const { props } = this;
    const { loading, isCreate } = props;
    const onOk = ()=>{
      props.onOk && props.onOk()
    }
    const onCancel = ()=>{
      props.onCancel && props.onCancel()
    };
    const onDelete = ()=>{
      props.onDelete && props.onDelete()
    };
    const footer = (
      <Fragment>
        {isCreate ? null : (
          <Popconfirm
          title="确认删除吗？"
          onConfirm={onDelete}>
          <Button style={{float: 'left'}}>删除</Button>
        </Popconfirm>)}
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={onOk} loading={loading}>保存</Button>
      </Fragment>);
    const _props = {
      title: 'Title',
      footer,
      tabs: [],
      ...props,
    }
    // 通过 tab的isCreate属性为tab增加默认的disabled属性
    _props.tabs.forEach((tab)=>{
      tab.disabled = tab.disabled === undefined ?
        (tab.main ? false : _props.isCreate)
        : tab.disabled
    })
    const antdTabs = (
    <Tabs tabPosition="right" onTabClick={this.onTabClick} size="small">
      {_props.tabs.map(tab=>(<TabPane tab={tab.title} key={tab.key} disabled={tab.disabled} />))}
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
    this.props.onTabChange && this.props.onTabChange(key);
  }
  render() {
    const props = this.getInitProps()
    const modalStyle = {
      top: 20,
      height: 'calc(100vh - 32px)',
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
          {this.createModalContent(props.tabs, props.isCreate)}
        </Modal>
      </div>)
  }
}
