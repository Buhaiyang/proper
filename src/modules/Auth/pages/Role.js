import React, { PureComponent } from 'react';
import { Card, Button, Switch, Divider, Modal, Spin, Badge,
  Form, message, Popconfirm } from 'antd';
import { connect } from 'dva';
// import styles from './Role.less';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/Oopsearch';
import DescriptionList from '../../../components/DescriptionList';
import OopTable from '../../../components/OopTable';

const { Description } = DescriptionList;

@inject(['authRole', 'global'])
@connect(({ authRole, global, loading }) => ({
  authRole,
  global,
  loading: loading.models.authRole,
  gridLoading: loading.effects['global/oopSearchResult']
}))
@Form.create()
export default class Role extends PureComponent {
  state = {
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
    this.onLoad();
  }

  // 刷新角色列表
  onLoad = (param) => {
    this.oopSearch.load(param);
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
        this.onLoad();
      }
    });
  }

  // 切换状态功能
  handleSwitchOnChange = (value, record) => {
    const self = this;
    const ids = [];
    ids.push(record.id);
    this.props.dispatch({
      type: 'authRole/fetchUpdateStatus',
      payload: {
        enable: value,
        ids
      },
      callback: () => {
        self.onLoad();
      }
    });
  }

  // 编辑功能
  handleEdit = ()=>{
  }

  render() {
    const { loading, gridLoading,
      global: { size, oopSearchGrid } } = this.props;

    const { viewVisible, roleInfo,
      roleUsers, roleGroups } = this.state;

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

    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.handleCreate(true) }
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        onClick: (items)=>{ this.handleRemove(items) },
        display: items=>(items.length),
      }
    ];

    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="$auth$roles"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
            grid={oopSearchGrid}
            columns={columns}
            loading={gridLoading}
            onLoad={this.onLoad}
            size={size}
            topButtons={topButtons}
            ref={(el)=>{ this.oopTable = el }}
          />
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
          <Spin spinning={loading}>
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
          </Spin>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
