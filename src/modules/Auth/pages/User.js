import React, {Fragment} from 'react';
import {connect} from 'dva';
import { Card, Divider, Form, Modal, Button, Input, Radio, Select, Badge, Tooltip, Spin} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import OopSearch from '../../../components/OopSearch';
import OopTable from '../../../components/OopTable';
import OopModal from '../../../components/OopModal';
import {inject} from '../../../common/inject';
import styles from './User.less';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
            initialValue: userBasicInfo.enable == null ? true : userBasicInfo.enable
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
            optionFilterProp="children"
            onChange={handleChange}
          >
            {userRolesAll.length ? userRolesAll.map(item =>
              (
                <Option key={item.id}>
                  {item.enable ? item.name :
                    (<Tooltip title="已停用"><Badge status="default" />{item.name}</Tooltip>)}
                </Option>)
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
        label="用户组"
      >
        {getFieldDecorator('groups', {
          initialValue: userGroups && userGroups.map(item => item.id)
        })(
          <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="请选择用户组"
            optionFilterProp="children"
            onChange={handleChange}
          >
            {userGroupsAll.length ? userGroupsAll.map(item =>
              (
                <Option key={item.id}>
                  {item.enable ? item.name :
                    (<Tooltip title="已停用"><Badge status="default" />{item.name}</Tooltip>)}
                </Option>)
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
    isCreate: !this.props.authUser.userBasicInfo.id
  }

  componentDidMount() {
    this.onLoad()
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
  handleDelete = ()=>{
    const record = this.props.authUser.userBasicInfo;
    this.onDelete(record);
    this.clearModalForms();
  }
  onDelete = (record) => {
    const me = this
    me.props.dispatch({
      type: 'authUser/deleteUsers',
      payload: {ids: record.id},
      callback(res) {
        oopToast(res, '删除成功', '删除失败');
        me.onLoad()
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
  onSubmitForm = () => {
    const basicUserForm = this.basicUser.getForm();
    if (basicUserForm) {
      basicUserForm.validateFieldsAndScroll((err, data) => {
        if (err) return;
        this.props.dispatch({
          type: 'authUser/saveOrUpdateUser',
          payload: data,
          callback: (res)=>{
            this.setState({
              isCreate: false
            });
            oopToast(res, '保存成功', '保存失败');
            this.onLoad();
          }
        });
      });
    }
  }
  // 隐藏窗口时重置form 清空 userBasicInfo、userRoles
  clearModalForms = () => {
    this.handleModalVisible(false);
    setTimeout(() => {
      this.props.dispatch({
        type: 'authUser/clear'
      });
    }, 300);
  }
  batchDelete = (items) => {
    const me = this;
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${items.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: 'authUser/deleteUsers',
          payload: {ids: items.toString()},
          callback(res) {
            me.oopTable.clearSelection()
            oopToast(res, '删除成功', '删除失败');
            me.onLoad()
          }
        })
      }
    });
  }
  // 查询方法 加载所有数据
  onLoad = (param = {})=> {
    const { pagination } = param;
    const params = {
      pagination,
      ...param,
      userEnable: 'ALL'
    }
    this.oopSearch.load(params)
  }
  userAddDel = (value, typeAdd, typeDel, typeRoles, data) => {
    const userIds = [];
    for (let i = 0; i < data.length; i++) {
      userIds.push(data[i].id);
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
    const data = this.props.authUser.userRoles;
    this.userAddDel(value, typeAdd, typeDel, typeRoles, data);
  }
  // 用户添加用户组
  userAddGroups = (value) => {
    const typeAdd = 'authUser/userAddGroup';
    const typeDel = 'authUser/userDelGroup';
    const typeRoles = 'authUser/fetchUserGroups';
    const data = this.props.authUser.userGroups;
    this.userAddDel(value, typeAdd, typeDel, typeRoles, data);
  }
  render() {
    const {
      authUser: {
        userBasicInfo, userRoles, userRolesAll, userGroups, userGroupsAll
      },
      loading,
      gridLoading,
      global: { size, oopSearchGrid }
    } = this.props;
    const column = [
      {
        title: '用户名', dataIndex: 'username', render: (text, record) => {
          return <div onClick={() => this.onView(record)} style={{textDecoration: 'underline', cursor: 'pointer'}}>{text}</div>;
        }
      },
      {title: '显示名', dataIndex: 'name'},
      {title: '电子邮箱', dataIndex: 'email'},
      {title: '手机号码', dataIndex: 'phone'},
      {
        title: '状态', dataIndex: 'enable', render: text => (
          <Fragment>
            {text === true ? <Badge status="processing" text="已启用" /> : <Badge status="default" text="已停用" />}
          </Fragment>
        )
      }
    ]
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.onCreate() }
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        onClick: (items)=>{ this.batchDelete(items) },
        display: items=>(items.length),
      }
    ]
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.onEdit(record) },
        display: record=>(!record.superuser)
      }, {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '确认删除吗？',
        onClick: (record)=>{ this.onDelete(record) },
        display: record=>(!record.superuser)
      },
    ]
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="authusers"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
            grid={{...oopSearchGrid,
              list: oopSearchGrid.list.map(item=>({...item, disabled: item.superuser === true}))}}
            columns={column}
            loading={gridLoading}
            onLoad={this.onLoad}
            size={size}
            topButtons={topButtons}
            rowButtons={rowButtons}
            ref={(el)=>{ this.oopTable = el }}
          />
        </Card>
        <OopModal
          title={this.state.isCreate ? '新建用户' : '编辑用户'}
          visible={this.state.modalVisible}
          destroyOnClose={true}
          width={800}
          onCancel={this.clearModalForms}
          onOk={this.onSubmitForm}
          onDelete={this.handleDelete}
          isCreate={this.state.isCreate}
          loading={!!loading}
          onTabChange={this.handleTabChange}
          tabs={[{
            key: 'basicUser',
            title: '基本信息',
            main: true,
            tips: (<div>新建时，需要<a>填写完基本信息的必填项并保存</a>后，滚动页面或点击左上角的导航来完善其他信息</div>),
            content: <UserBasicInfoForm
              ref={(el) => {
                this.basicUser = el;
              }}
              userBasicInfo={userBasicInfo}
              loading={!!loading} />
          }, {
            key: 'roleUser',
            title: '角色信息',
            tips: (<div>新建时，需要<a>填写完基本信息的必填项并保存</a>后，滚动页面或点击左上角的导航来完善其他信息</div>),
            content: <RoleInfoForm
              ref={(el) => {
                this.roleUser = el;
              }}
              userRoles={userRoles}
              userRolesAll={userRolesAll}
              userAddRoles={this.userAddRoles}
              loading={!!loading} />
          }, {
            key: 'userGroups',
            title: '用户组信息',
            content: <UserGroupInfoForm
              ref={(el) => {
                this.userGroups = el;
              }}
              userGroups={userGroups}
              userGroupsAll={userGroupsAll}
              userAddGroups={this.userAddGroups}
              loading={!!loading} />

          }]}
        />
        <Modal
          visible={this.state.viewModalVisible}
          destroyOnClose={true}
          width={600}
          footer={<Button type="primary" onClick={() => this.handleViewModalVisible(false)}>确定</Button>}
          onCancel={() => this.handleViewModalVisible(false)}>
          <Spin spinning={loading}>
            <DescriptionList size={size} col="2" title="基本信息">
              <Description term="用户名">{userBasicInfo.username}</Description>
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
