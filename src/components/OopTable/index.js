import React, { PureComponent } from 'react';
import {Table, Button} from 'antd';
import styles from './index.less';

export default class OopTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  }
  rowSelectionCfg = {
    onChange: this.rowSelectionChange,
    selectedRowKeys: this.state.selectedRowKeys,
    getCheckboxProps: record => ({
      disabled: record.disabled,
    })
  }
  rowSelectionChange = (selectedRowKeys)=>{
    this.setState({
      selectedRowKeys
    })
  }
  onChange = (pagination, filters, sorter)=>{
    console.log(pagination, sorter);
    this.props.onLoad({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    })
  }
  clearSelection = ()=>{
    this.setState({
      selectedRowKeys: []
    })
  }
  createButtons = (topButtons)=>{
    return topButtons.map((btn) =>{
      // 1.btn属性配置了displayReg并且displayReg执行返回结果为true 或者 2.没有配置displayReg 渲染按钮
      return ((btn.display && btn.display(this.state.selectedRowKeys)) || !btn.display) &&
      (
        <Button
          key={btn.name}
          icon={btn.icon}
          type={btn.type}
          onClick={()=>{ btn.onClick && btn.onClick(this.state.selectedRowKeys) }}>
          {btn.text}
        </Button>
      )
    })
  }
  render() {
    const { grid: {list, pagination }, columns, loading, topButtons = [] } = this.props
    const rowSelectionCfg = {
      onChange: this.rowSelectionChange,
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      })
    }
    return (
      <div className={styles.oopTableWrapper}>
        <div className={styles.toolbar}>
          {
            this.createButtons(topButtons)
          }
        </div>
        <Table
          dataSource={list}
          rowKey={record => record.id}
          rowSelection={rowSelectionCfg}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
