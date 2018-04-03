import React, { PureComponent, Fragment } from 'react';
import {Table, Button, Divider, Popconfirm, Tooltip, Icon} from 'antd';
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
    this.props.onLoad && this.props.onLoad({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    })
  }
  clearSelection = ()=>{
    this.setState({
      selectedRowKeys: []
    })
  }
  createTopButtons = (topButtons)=>{
    return topButtons.map(btn =>(
      // 1.btn属性配置了displayReg并且displayReg执行返回结果为true 或者 2.没有配置displayReg 渲染按钮
      ((btn.display && btn.display(this.state.selectedRowKeys)) || !btn.display) &&
      (
        <Button
          key={btn.name}
          icon={btn.icon}
          type={btn.type}
          onClick={()=>{ btn.onClick && btn.onClick(this.state.selectedRowKeys) }}>
          {btn.text}
        </Button>
      )
    ))
  }
  createRowButtons = (columns, rowButtons)=>{
    const cols = [...columns]
    rowButtons.length && cols.push({
      title: '操作',
      width: 150,
      render: (text, record)=>{
        const renderButtons = ((item, index)=> (
          <Fragment key={item.name}>
            {
              item.confirm ? (
                <Popconfirm
                  title={item.confirm}
                  onConfirm={() => item.onClick(record)}>
                  {item.icon ?
                    (
                      <Tooltip placement="bottom" title={item.text}>
                        <a>
                          <Icon type={item.icon} />
                        </a>
                      </Tooltip>) : <a>{item.text}</a>
                  }
                </Popconfirm>
              ) : (
                item.icon ? (
                  <Tooltip placement="bottom" title={item.text}>
                    <a onClick={() => item.onClick(record)}>
                      <Icon type={item.icon} />
                    </a>
                  </Tooltip>) : <a onClick={() => item.onClick(record)}>{item.text}</a>
              )
            }
            {(rowButtons.length - 1 !== index) && <Divider type="vertical" />}
          </Fragment>
        ))
        return rowButtons.map((item, index)=> (
          item.display ? (item.display(record) ? renderButtons(item, index) : '') : renderButtons(item, index)
        ))
      }
    })
    return cols
  }
  render() {
    const { grid: {list, pagination },
      columns, loading, topButtons = [], rowButtons = [], size } = this.props
    const cols = this.createRowButtons(columns, rowButtons)
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
            this.createTopButtons(topButtons)
          }
        </div>
        <Table
          dataSource={list}
          rowKey={record => record.id}
          rowSelection={rowSelectionCfg}
          columns={cols}
          loading={loading}
          pagination={pagination}
          onChange={this.onChange}
          size={size}
        />
      </div>
    )
  }
}
