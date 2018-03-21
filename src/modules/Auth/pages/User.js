import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Table, Card, Divider, Popconfirm, Form, Modal, Button, Input, Radio, Tabs, Select, Spin, message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import OopSearch from '../../../components/Oopsearch';
import {inject} from '../../../common/inject';
import styles from './User.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TabPane} = Tabs;
const {Option} = Select;
const {Description} = DescriptionList;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const UserBasicInfoForm = Form.create()((props) => {
  const {form, userBasicInfo, loading} = props;
  const {getFieldDecorator} = form;
  const handleConfirmBlur = (e) => {
    console.log(e);
  };
  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  };
  return (
    <Spin spinning={loading}>
      <Form>
        <div>
          {getFieldDecorator('id', {
            initialValue: userBasicInfo.id,
          })(
            <Input type="hidden" />
          )}
        </div>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            initialValue: userBasicInfo.username,
            rules: [{
              required: true, message: '用户名不能为空',
            }],
          })(
            <Input placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="显示名"
        >
          {getFieldDecorator('name', {
            initialValue: userBasicInfo.name,
            rules: [{
              required: true, message: '显示名不能为空',
            }],
          })(
            <Input placeholder="请输入显示名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            initialValue: userBasicInfo.password,
            rules: [{
              required: true, message: '密码不能为空',
            }],
          })(
            <Input type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            initialValue: userBasicInfo.password,
            rules: [{
              required: true, message: '请确认密码',
            }, {
              validator: checkPassword,
            }],
          })(
            <Input type="password" placeholder="请确认密码" onBlur={handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电子邮件"
        >
          {getFieldDecorator('email', {
            initialValue: userBasicInfo.email,
            rules: [{
              required: true, message: '电子邮件不能为空',
            }, {
              type: 'email', message: '请输入正确的电子邮件',
            }],
          })(
            <Input placeholder="请输入电子邮件" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            initialValue: userBasicInfo.phone,
            rules: [{
              required: true, message: '手机号码不能为空',
            }, {
              pattern: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i, message: '请输入正确的手机号码',
            }],
          })(
            <Input placeholder="请输入手机号码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('enable', {
            initialValue: userBasicInfo.enable || true
          })(
            <RadioGroup>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>停用</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Spin>);
});
const RoleInfoForm = Form.create()((props) => {
  const {form, userRoles, userRolesAll, loading, userAddRoles} = props;
  const {getFieldDecorator} = form;
  const handleChange = (value) => {
    userAddRoles(value);
  };
  return (
    <Form>
      <FormItem
        {...formItemLayout}
        label="角色"
      >
        {getFieldDecorator('roles', {
          initialValue: userRoles && userRoles.map(item => item.id)
        })(<Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="请选择角色 "
            onChange={handleChange}
          >
            {userRolesAll.length ? userRolesAll.map(item =>
              <Option key={item.id}>{item.name}</Option>
            ) : userRolesAll}
          </Select>
        )
        }
        {loading && (
          <div className={styles.selectLoading}>
            <Spin size="small" />
          </div>
        )}
      </FormItem>
    </Form>
  );
});
const UserGroupInfoForm = Form.create()((props) => {
  const {form, userGroups, userGroupsAll, loading, userAddGroups} = props;
  const {getFieldDecorator} = form;
  const handleChange = (value) => {
    userAddGroups(value);
  };
  return (
    <Form>
      <FormItem
        {...formItemLayout}
        label="角色"
      >
        {getFieldDecorator('roles', {
          initialValue: userGroups && userGroups.map(item => item.id)
        })(
          <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="请选择角色 "
            onChange={handleChange}
          >
            {userGroupsAll.length ? userGroupsAll.map(item =>
              <Option key={item.id}>{item.name}</Option>
            ) : userGroupsAll}
          </Select>
        )}
        {loading && (
          <div className={styles.selectLoading}>
            <Spin size="small" />
          </div>
        )}
      </FormItem>
    </Form>);
});
const ModalForm = connect()((props) => {
  const {
    visible, size, handleTabChange, currentTabKey, onSubmitForm, userBasicInfo,
    clearModalForms, userRoles, userRolesAll, userGroups, userGroupsAll,
    isCreate, loading, userAddRoles, userAddGroups
  } = props;
  const onCancel = () => {
    // 隐藏窗口时
    const form = this[currentTabKey].getForm();
    clearModalForms(form);
  };
  const onOk = () => {
    const form = this[currentTabKey].getForm();
    const {validateFields} = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmitForm(fieldsValue);
    });
  };
  const onTabChange = (activeKey) => {
    handleTabChange(activeKey);
  };
  const tabList = [{
    key: 'basicUser',
    tab: '基本信息',
    disabled: false,
    content: <UserBasicInfoForm
      ref={(el) => {
        this.basicUser = el;
      }}
      userBasicInfo={userBasicInfo}
      loading={loading} />
  }, {
    key: 'roleUser',
    tab: '角色信息',
    disabled: isCreate,
    content: <RoleInfoForm
      ref={(el) => {
        this.roleUser = el;
      }}
      userRoles={userRoles}
      userRolesAll={userRolesAll}
      userAddRoles={userAddRoles}
      loading={loading} />
  }, {
    key: 'userGroups',
    tab: '用户组信息',
    disabled: isCreate,
    content: <UserGroupInfoForm
      ref={(el) => {
        this.userGroups = el;
      }}
      userGroups={userGroups}
      userGroupsAll={userGroupsAll}
      userAddGroups={userAddGroups}
      loading={loading} />

  }];
  const footer = (
    <Fragment><Button onClick={onCancel}>取消</Button><Button type="primary" onClick={onOk} loading={loading}>保存</Button></Fragment>);
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk} footer={footer}>
      <Tabs size={size} animated={false} onChange={onTabChange} activeKey={currentTabKey}>
        {tabList.map(item =>
          <TabPane tab={item.tab} key={item.key} disabled={item.disabled}>{item.content}</TabPane>
        )}
      </Tabs>
    </Modal>
  );
});
@inject(['authUser', 'global'])
@connect(({authUser, global, loading}) => ({
  authUser,
  global,
  loading: loading.models.authUser,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class User extends React.PureComponent {
  state = {
    modalVisible: false,
    viewModalVisible: false,
    currentTabKey: 'basicUser',
    selectedRowKeys: [],
    isCreate: !this.props.authUser.userBasicInfo.id
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.oopSearch.load({
      moduleName: 'authUser'
    });
  }

  onChange = (pagination, filters, sorter) => {
    console.log(pagination, sorter);
    this.oopSearch.load({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      moduleName: 'authUser'
    })
  }
  onEdit = (record) => {
    this.setState({
      modalVisible: true,
      isCreate: false
    });
    this.props.dispatch({
      type: 'authUser/fetchById',
      payload: record.id
    });
  }
  onView = (record) => {
    const me = this
    me.props.dispatch({
      type: 'authUser/fetchAll',
      payload: record.id,
      callback() {
      }
    });
    this.setState({
      viewModalVisible: true
    });
  }
  onDelete = (record) => {
    const me = this
    me.props.dispatch({
      type: 'authUser/deleteUsers',
      payload: {ids: record.id},
      callback() {
        me.setState({
          selectedRowKeys: []
        });
        message.success('删除成功');
      }
    })
  }
  onCreate = () => {
    this.setState({
      modalVisible: true,
      isCreate: true
    });
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: flag
    });
  }
  handleViewModalVisible = (flag) => {
    this.setState({
      viewModalVisible: flag
    });
    this.props.dispatch({
      type: 'authUser/clear'
    });
  }
  handleTabChange = (activeKey) => {
    const me = this;
    me.setState({
      currentTabKey: activeKey
    });
    if (activeKey === 'roleUser') {
      if (this.props.authUser.userRolesAll.length === 0) {
        me.props.dispatch({
          type: 'authUser/fetchUserRoles',
          payload: this.props.authUser.userBasicInfo.id
        });
      }
    } else if (activeKey === 'userGroups') {
      if (this.props.authUser.userGroupsAll.length === 0) {
        me.props.dispatch({
          type: 'authUser/fetchUserGroups',
          payload: this.props.authUser.userBasicInfo.id
        });
      }
    }
  }
  onSubmitForm = (data) => {
    // 根据 currentTabKey dispatch action
    console.log(this.state.currentTabKey, data);
    const activeKey = this.state.currentTabKey;
    const me = this;
    if (activeKey === 'basicUser') {
      this.props.dispatch({
        type: 'authUser/saveOrUpdateUser',
        payload: data,
        callback() {
          me.setState({
            isCreate: false
          });
          message.success('保存成功');
          me.refresh();
        }
      });
    } else if (activeKey === 'roleUser') {
      // TODO
    } else if (activeKey === 'userGroups') {
      // TODO
    }
  }
  // 隐藏窗口时重置form 清空 userBasicInfo、userRoles
  clearModalForms = (form) => {
    this.handleModalVisible(false);
    setTimeout(() => {
      form.resetFields();
      this.setState({
        currentTabKey: 'basicUser',
      });
      this.props.dispatch({
        type: 'authUser/clear'
      });
    }, 300);
  }
  rowSelectionChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  }
  batchDelete = () => {
    const me = this;
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${this.state.selectedRowKeys.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: 'authUser/deleteUsers',
          payload: {ids: this.state.selectedRowKeys.toString()},
          callback() {
            me.setState({
              selectedRowKeys: []
            });
            message.success('删除成功');
            me.refresh();
          }
        })
      }
    });
  }
  userAddDel = (value, typeAdd, typeDel, typeRoles) => {
    const userIds = [];
    for (let i = 0; i < this.props.authUser.userRoles.length; i++) {
      userIds.push(this.props.authUser.userRoles[i].id);
    }
    if (value.length > userIds.length) {
      for (let i = 0; i < value.length; i++) {
        if (userIds.indexOf(value[i]) === -1) {
          this.props.dispatch({
            type: typeAdd,
            payload: {
              userId: this.props.authUser.userBasicInfo.id,
              id: value[i]
            },
            callback: () => {
              this.props.dispatch({
                type: typeRoles,
                payload: this.props.authUser.userBasicInfo.id
              })
            }
          });
        }
      }
    }
    if (value.length < userIds.length) {
      for (let i = 0; i < userIds.length; i++) {
        if (value.indexOf(userIds[i]) === -1) {
          this.props.dispatch({
            type: typeDel,
            payload: {
              userId: this.props.authUser.userBasicInfo.id,
              id: userIds[i]
            },
            callback: () => {
              this.props.dispatch({
                type: typeRoles,
                payload: this.props.authUser.userBasicInfo.id
              })
            }
          });
        }
      }
    }
  }
  // 用户添加角色
  userAddRoles = (value) => {
    const typeAdd = 'authUser/userAddRole';
    const typeDel = 'authUser/userDelRole';
    const typeRoles = 'authUser/fetchUserRoles';
    this.userAddDel(value, typeAdd, typeDel, typeRoles);
  }
  // 用户添加用户组
  userAddGroups = (value) => {
    const typeAdd = 'authUser/userAddGroup';
    const typeDel = 'authUser/userDelGroup';
    const typeRoles = 'authUser/fetchUserGroups';
    this.userAddDel(value, typeAdd, typeDel, typeRoles);
  }
  render() {
    const {
      authUser: {
        // data: {list, pagination},
        userBasicInfo, userRoles, userRolesAll, userGroups, userGroupsAll
      },
      loading,
      gridLoading,
      global: { size, oopSearchGrid: {list, pagination}}
    } = this.props;
    const column = [
      {
        title: '用户名', dataIndex: 'username', render: (text, record) => {
          return <div onClick={() => this.onView(record)} style={{textDecoration: 'underline', cursor: 'pointer'}}>{text}</div>;
        }
      },
      {title: '密码', dataIndex: 'password'},
      {title: '显示名', dataIndex: 'name'},
      {title: '电子邮箱', dataIndex: 'email'},
      {title: '手机号码', dataIndex: 'phone'},
      {
        title: '状态', dataIndex: 'enable', render: text => (
          <Fragment>
            {text === true ? '已启用' : '已停用'}
          </Fragment>
        )
      },
      // {title:'是否为超级用户',dataIndex:'superuser',render(text){
      //       return <div>
      //         {text==true?'是':'否'}
      //       </div>
      //   }},
      {
        title: '操作', render: (text, record) => {
          if (record.superuser) {
            return null;
          } else {
            return (
              <Fragment>
                <a onClick={() => this.onEdit(record)}>编辑</a>
                <Divider type="vertical" />
                {<Popconfirm title="是否要删除此行？" onConfirm={() => this.onDelete(record)}>
                  <a>删除</a>
                </Popconfirm>}
              </Fragment>
            )
          }
        }
      }
    ];
    // const column = [
    //   {title: 'name0', dataIndex: 'name0'},
    //   {title: 'name1', dataIndex: 'name1'},
    //   {title: 'phone0', dataIndex: 'phone0'},
    //   {title: 'description0', dataIndex: 'description0'},
    //   {title: 'username0', dataIndex: 'username0'},
    // ]
    const rowSelectionCfg = {
      onChange: this.rowSelectionChange,
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      })
    };
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <div className={styles.toolbar}>
            <Button icon="plus" type="primary" onClick={() => this.onCreate()}>
              新建
            </Button>
            {this.state.selectedRowKeys.length > 0 && (
              <Button icon="delete" type="" onClick={() => this.batchDelete()}>
                删除
              </Button>
            )}
          </div>
          <Table
            dataSource={list}
            rowKey={record => record.id}
            rowSelection={rowSelectionCfg}
            columns={column}
            loading={gridLoading}
            pagination={pagination}
            onChange={this.onChange}
            size={size} />
        </Card>
        <ModalForm
          visible={this.state.modalVisible}
          currentTabKey={this.state.currentTabKey}
          handleTabChange={this.handleTabChange}
          onSubmitForm={this.onSubmitForm}
          userBasicInfo={userBasicInfo}
          userRoles={userRoles}
          userRolesAll={userRolesAll}
          userAddRoles={this.userAddRoles}
          userGroups={userGroups}
          userGroupsAll={userGroupsAll}
          userAddGroups={this.userAddGroups}
          clearModalForms={this.clearModalForms}
          isCreate={this.state.isCreate}
          size={size}
          loading={!!loading} />
        <Modal
          visible={this.state.viewModalVisible}
          destroyOnClose={true}
          footer={<Button type="primary" onClick={() => this.handleViewModalVisible(false)}>确定</Button>}
          onCancel={() => this.handleViewModalVisible(false)}>
          <Spin spinning={loading}>
            <DescriptionList size={size} col="2" title="基本信息">
              <Description term="用户名">{userBasicInfo.username}</Description>
              <Description term="密码">{userBasicInfo.password}</Description>
              <Description term="显示名">{userBasicInfo.name}</Description>
              <Description term="电子邮箱">{userBasicInfo.email}</Description>
              <Description term="手机号码">{userBasicInfo.phone}</Description>
              <Description term="状态">{userBasicInfo.enable ? '已启用' : '已停用'}</Description>
            </DescriptionList>
            <Divider style={{marginBottom: 16}} />
            <DescriptionList size={size} col="2" title="角色信息">
              <Description>{userRoles.map(item => item.name.concat(', '))}</Description>
            </DescriptionList>
            <Divider style={{marginBottom: 16}} />
            <DescriptionList size={size} col="2" title="用户组信息">
              <Description>{userGroups.map(item => item.name.concat(', '))}</Description>
            </DescriptionList>
          </Spin>
        </Modal>
      </PageHeaderLayout>);
  }
}
