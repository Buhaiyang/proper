import React, { PureComponent } from 'react';
import { Card, Button, Table, Switch, Divider, Modal, Spin, Badge,
  Form, message, Popconfirm } from 'antd';
// import { Card, Button, Table, Switch, Divider, Spin, Transfer,
//   Form, Modal, Input, message, Tabs, Radio, Select, Badge, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './Role.less';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OSearch from '../../../components/Osearch';
import DescriptionList from '../../../components/DescriptionList';

const { Description } = DescriptionList;

@inject(['authRole', 'global'])
@connect(({ authRole, global, loading }) => ({
  authRole,
  global,
  loading: loading.models.authRole
}))
@Form.create()
export default class Role extends PureComponent {
  state = {
    // 选中的行
    selectedRows: [],
    // 选中的行的id
    selectedRowKeys: [],
    // 是否显示个人信息
    viewVisible: false,
    // 个人信息
    roleInfo: {},
    // 指定角色ID的用户列表
    roleUsers: [],
    // 指定角色ID的用户组列表
    roleGroups: []
  };

  componentDidMount() {
    this.refresh();
  }

  onSuggest = (query, matchStr)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'global/queryData',
      payload: matchStr
    });
  }

  onSearchResult = (param)=>{
    const { authRole: { pagination = {}} } = this.props;
    this.props.dispatch({
      type: 'authRole/fetch',
      payload: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        extraParams: param,
      }
    });
  }

  // 关闭基本信息
  handleViewModalVisible = (flag) => {
    this.setState({
      viewVisible: flag
    });
  }

  // 查看基本信息
  handleView = (record) => {
    this.props.dispatch({
      type: 'authRole/fetchById',
      payload: record.id,
      callback: (res) => {
        const text = res.enable;
        res.enableLabel = text === true ? '已启用' : '已停用';
        res.badge = text === true ? 'processing' : 'default';
        this.setState({
          viewVisible: true,
          roleInfo: res
        });
      }
    })
    this.props.dispatch({
      type: 'authRole/fetchRoleUsersById',
      payload: record.id,
      callback: (res) => {
        this.setState({
          roleUsers: res
        });
      }
    });
    this.props.dispatch({
      type: 'authRole/fetchRoleGroupsById',
      payload: record.id,
      callback: (res) => {
        this.setState({
          roleGroups: res
        });
      }
    });
  }

  // 刷新角色列表
  refresh = () => {
    this.props.dispatch({
      type: 'authRole/fetch'
    });
  }

  // 删除功能
  handleRemove = (ids) => {
    let idsArray = [];
    if (ids instanceof Array) {
      idsArray = ids;
    } else {
      idsArray.push(ids);
    }
    this.props.dispatch({
      type: 'authRole/removeRoles',
      payload: { ids: idsArray.toString() },
      callback: () => {
        message.success(this.props.authRole.messageText);
        this.refresh();
        this.setState({
          selectedRows: [],
          selectedRowKeys: []
        });
      }
    });
  }

  render() {
    const { authRole: { roleList }, loading,
      global: {searchOptions, size}} = this.props;

    const { selectedRows, selectedRowKeys, viewVisible, roleInfo,
      roleUsers, roleGroups } = this.state;


    const rowSelection = {
      onChange: (keys, rows) => {
        this.setState({
          selectedRows: rows,
          selectedRowKeys: keys
        });
      }
    };

    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name',
        render: (text, record) => (
          <span
            onClick={() => this.handleView(record)}
            style={{textDecoration: 'underline', cursor: 'pointer'}}>
            {text}
          </span>
        )
      },
      { title: '功能描述说明', dataIndex: 'description', key: 'description', },
      { title: '状态', dataIndex: 'enable', key: 'enable', render: (text, record) => (
          <Switch
            checked = { record.enable }
            size="small"
            onChange={(value) => {
              this.handleSwitchOnChange(value, record);
            }} />)},
      {
        title: '操作', key: 'action', render: record => (
          <span>
            <a onClick={() => this.handleEdit(record)}>编辑</a>
            <Divider type="vertical" />
            {<Popconfirm title="是否要删除此条信息？" onConfirm={() => this.handleRemove(record.id)}>
              <a>删除</a>
            </Popconfirm>}
          </span>
        )
      }
    ];

    return (
      <PageHeaderLayout content={
        <OSearch
          searchOptions={searchOptions}
          placeholder="请输入"
          enterButtonText="搜索"
          size={size}
          onSuggest={this.onSuggest}
          onSearchResult={this.onSearchResult}
        />
      }>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreate(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    {<Popconfirm
                      title={`确定删除选中的${this.state.selectedRowKeys.length}条数据吗?`}
                      onConfirm={() => this.handleRemove(selectedRowKeys)}>
                      <Button icon="delete">批量删除</Button>
                    </Popconfirm>}
                  </span>
                )
              }
            </div>
            <Table
              loading= {loading}
              rowSelection={rowSelection}
              dataSource={roleList}
              columns={columns}
              rowKey={record => record.id}
              size={size}
            />
          </div>
        </Card>
        <Modal
          title="角色信息"
          visible={viewVisible}
          userInfoView={roleInfo}
          roleUsers={roleUsers}
          roleGroups={roleGroups}
          footer={<Button type="primary" onClick={()=>this.handleViewModalVisible(false)}>确定</Button>}
          onCancel={()=>this.handleViewModalVisible(false)}
        >
          <DescriptionList size="small" col="1">
            <Description term="名称">
              {roleInfo.name}
            </Description>
            <Description term="功能描述说明">
              {roleInfo.description}
            </Description>
            <p>
              <Badge status={roleInfo.badge} text={roleInfo.enableLabel} />
            </p>
          </DescriptionList>
          <Divider style={{ marginBottom: 16 }} />
          <DescriptionList size={size} col="1" title="包含的用户信息">
            <Description>{roleUsers.map(item=>item.name.concat(', '))}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 16 }} />
          <DescriptionList size={size} col="1" title="用户组信息">
            <Description>{roleGroups.map(item=>item.name.concat(', '))}</Description>
          </DescriptionList>
          {loading && (
            <div className={styles.viewModalLoading}>
              <Spin />
            </div>
          )}
        </Modal>
      </PageHeaderLayout>
    );
  }
}