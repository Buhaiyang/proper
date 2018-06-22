import React, { PureComponent, Fragment } from 'react';
import {Table, Button, Divider, Popconfirm, Tooltip, Icon} from 'antd';
import styles from './index.less';

export default class OopTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRowItems: [],
    changeRows: [],
  }
  rowSelectionChange = (selectedRowKeys, selectedRowItems)=>{
    this.setState({
      selectedRowKeys,
      selectedRowItems
    })
  }
  onChange = (pagination, filters, sorter)=>{
    this.props.onLoad && this.props.onLoad({pagination: {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      sorter
    }})
  }
  clearSelection = ()=>{
    this.setState({
      selectedRowKeys: [],
      selectedRowItems: []
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
          onClick={()=>{
            btn.onClick && btn.onClick(this.state.selectedRowKeys, this.state.selectedRowItems)
          }}>
          {btn.text}
        </Button>
      )
    ))
  }
  createRowButtons = (columns, rowButtons)=>{
    const cols = [...columns]
    rowButtons.length && cols.push({
      title: '操作',
      width: rowButtons.length * 50,
      render: (text, record)=>{
        const actions = [];
        const renderButtons = ((item)=> {
          actions.push(<Fragment key={item.name}>
            {
              item.confirm ? (
                <Popconfirm
                  title={item.confirm}
                  onConfirm={() => item.onClick(record)}>
                  {item.icon ?
                    (
                      <Tooltip placement="bottom" title={item.text}>
                        <a>
                          <Icon type={item.icon} style={item.style} />
                        </a>
                      </Tooltip>) : <a>{item.text}</a>
                  }
                </Popconfirm>
              ) : (
                item.icon ? (
                  <Tooltip placement="bottom" title={item.text}>
                    <a onClick={() => item.onClick(record)}>
                      <Icon type={item.icon} style={item.style} />
                    </a>
                  </Tooltip>) : <a onClick={() => item.onClick(record)}>{item.text}</a>
              )
            }
          </Fragment>)
          actions.push(<Divider key={`divider-${item.name}`} type="vertical" />)
        })
        rowButtons.map(item=> (
          item.display ? (item.display(record) ? renderButtons(item) : '') : renderButtons(item)
        ))
        actions.pop()
        return actions;
      }
    })
    return cols
  }
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const delIndex = selectedRowKeys.indexOf(record.id);
    if (delIndex >= 0) {
      selectedRowKeys.splice(delIndex, 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    this.setState({ selectedRowKeys });
    this.rowSelectionChange(selectedRowKeys);
    this.props.onRowSelect(record, selectedRowKeys);
  }
  rowClick = (record) => {
    return {
      onClick: () => {
        this.selectRow(record);
      },
    }
  }
  addSelectRow = (original, modifaction) => {
    original.map(item => modifaction.push(item))
  }
  addSelectRowKeys = (original, modifaction) => {
    original.map(item => modifaction.push(item.id))
  }
  getPreSelectState = () => {
    const { selectedRows, changeRows } = this.state;
    const keys = [];
    const lastCheck = selectedRows.filter(item => !changeRows.some(ele => ele.id === item.id))
    this.addSelectRowKeys(lastCheck, keys)
    if (selectedRows.length < changeRows.length) {
      this.addSelectRow(changeRows, selectedRows)
      this.addSelectRowKeys(selectedRows, keys)
      this.rowSelectionChange(keys, selectedRows)
    }
    this.rowSelectionChange(keys, lastCheck)
  }
  componentWillReceiveProps(props) {
    if (props.dataDefaultSelectedRowKeys) {
      this.setState({
        selectedRowKeys: props.dataDefaultSelectedRowKeys,
      })
    }
  }
  render() {
    const { grid: {list, pagination },
      columns, loading, topButtons = [], rowButtons = [], checkable = true, size,
      onRowSelect, selectTriggerOnRowClick = false, onSelectAll } = this.props
    const cols = this.createRowButtons(columns, rowButtons)
    const rowSelectionCfg = checkable ? {
      onChange: this.rowSelectionChange,
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
      onSelect: (record) => {
        if (selectTriggerOnRowClick) {
          this.selectRow(record);
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // TODO
        this.setState({
          changeRows,
          selectedRows
        })
        if (onSelectAll) {
          onSelectAll(changeRows)
        }
      },
    } : undefined
    return (
      <div className={styles.oopTableWrapper}>
        <div className={styles.toolbar}>
          {
            this.createTopButtons(topButtons)
          }
        </div>
        <Table
          className={onRowSelect ? styles.rowHover : ''}
          dataSource={list}
          rowKey={record => record.id}
          rowSelection={rowSelectionCfg}
          columns={cols}
          loading={loading}
          pagination={
            pagination ? {...pagination,
              current: pagination.pageNo, pageSize: pagination.pageSize, total: pagination.count
            } : {
                showSizeChanger: true,
                showQuickJumper: true,
              }
          }
          onChange={this.onChange}
          size={size}
          onRow={onRowSelect ? this.rowClick : undefined}
        />
      </div>
    )
  }
}
