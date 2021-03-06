import React, { PureComponent, Fragment } from 'react';
import {Table, Button, Divider, Popconfirm, Tooltip, Icon, Dropdown, Menu, message} from 'antd';
import styles from './index.less';

const downloadContext = (context)=>{
  const url = 'data:text/csv;charset=UTF-8,\uFEFF'.concat(context);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'table.csv';
  a.click();
  a = null;
  setTimeout(()=>{
    message.success('数据导出成功！')
  })
}

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
    const btns = topButtons.map(btn =>(
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
    ));
    if (this.props.showExport === true) {
      const menu = (
        <Menu onClick={this.handleExport}>
          <Menu.Item key="all"><Icon type="table" style={{marginRight: 4}} />导出所有</Menu.Item>
          <Menu.Item key="selected"><Icon type="check-square-o" style={{marginRight: 4}} />导出选中</Menu.Item>
        </Menu>
      );
      const exportButton = (
      <Dropdown overlay={menu} key="export">
        <Button style={{ paddingLeft: 8, paddingRight: 8, float: 'right'}} icon="export">
          导出 <Icon type="down" />
        </Button>
      </Dropdown>);
      btns.push(exportButton)
    }
    return btns
  }
  createRowButtons = (columns, rowButtons)=>{
    const cols = [...columns]
    rowButtons.length && cols.push({
      title: '操作',
      width: rowButtons.length < 3 ? 100 : rowButtons.length * 50,
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
  handleExport = (event)=>{
    const {key} = event;
    if (key === 'selected') {
      const exportData = this.state.selectedRowItems;
      if (exportData.length === 0) {
        message.warning('请选择想要导出的数据');
        return
      }
      this.exportTableDataToCSV(exportData);
    } else if (key === 'all') {
      // 导出全部的情况 需要看是否是前端分页还是后台分页
      const {list, pagination} = this.props.grid;
      if (pagination === undefined && list.length) {
        // 前端分页 静态数据导出
        this.exportTableDataToCSV(list);
      }
      if (pagination) {
        console.log('调用后台导出接口');
      }
    }
  }
  exportTableDataToCSV = (data)=> {
    const {columns} = this.props;
    const titles = columns.map(it=>it.title);
    const titleForKey = columns.map(it=>it.dataIndex);
    const str = [titles.join(',').concat('\n')];
    for (let i = 0; i < data.length; i++) {
      const temp = [];
      for (let j = 0; j < titleForKey.length; j++) {
        let value = data[i][titleForKey[j]];
        if (value) {
          // console.log(value)
          value = value.toString();
          if (value.includes(',')) {
            // 把英文的,转换成中文的，
            value = value.replace(new RegExp(',', 'gm'), '，');
          }
        }
        temp.push(value);
      }
      str.push(temp.join(',').concat('\n'));
    }
    console.log(str);
    downloadContext(str);
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
      onRowSelect, selectTriggerOnRowClick = false, onSelectAll, rowKey,
      _onSelect, _onSelectAll } = this.props
    const cols = this.createRowButtons(columns, rowButtons)
    const rowSelectionCfg = checkable ? {
      onChange: this.rowSelectionChange,
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        if (selectTriggerOnRowClick) {
          this.selectRow(record);
        }
        if (_onSelect) {
          _onSelect(record, selected, selectedRows, nativeEvent);
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
        if (_onSelectAll) {
          _onSelectAll(selected, selectedRows, changeRows);
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
          rowKey={record => record[rowKey || 'id']}
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
