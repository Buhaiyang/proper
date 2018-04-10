import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Divider, Modal, Spin, Badge,
  Form, Tabs, Input, Radio, Select, Tree } from 'antd';
import { connect } from 'dva';
// import styles from './Role.less';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/Oopsearch';
import DescriptionList from '../../../components/DescriptionList';
import OopTable from '../../../components/OopTable';
import { oopToast } from './../../../common/oopUtils';

const { Description } = DescriptionList;
const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = Tree;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const BasicInfoForm = Form.create()((props) => {
  const { form, roleInfo, roleList, loading } = props;

  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem>
          {form.getFieldDecorator('id', {
            initialValue: roleInfo.id,
          })(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {form.getFieldDecorator('name', {
            initialValue: roleInfo.name,
            rules: [{ required: true, message: '名称不能为空' }],
          })(
            <Input placeholder="请输入名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="继承"
        >
          {form.getFieldDecorator('parentId', {
            initialValue: roleList ? roleInfo.parentId : null,
          })(<Select
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                roleList ? roleList.map(item => (
                  <Option
                    key={item.id}
                    disabled={item.id === roleInfo.id}>
                    {item.name}
                  </Option>
                  // <Option key={item.id}>{item.name}</Option>
                )) : null
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {form.getFieldDecorator('description', {
            initialValue: roleInfo.description
          })(
            <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 5 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          {form.getFieldDecorator('enable', {
            initialValue: roleInfo.enable == null ? true : roleInfo.enable
          })(
            <RadioGroup>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>停用</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Spin>
  )
});

const ManagerInfoForm = Form.create()((props) => {
  const { loading, roleMenus, checkedMenuKeys, handleMenuKeys, roleInfo, labelText } = props;

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item} disableCheckbox={!item.enable}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode title={item.name} key={item.id} dataRef={item} disableCheckbox={!item.enable} />
      );
    });
  }

  const onCheck = (checkedKeys, id) => {
    handleMenuKeys(checkedKeys, id);
  }

  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem
          {...formItemLayout}
          label={labelText}
        >
          <Tree
            checkable
            showLine
            checkedKeys={checkedMenuKeys}
            onCheck={value => onCheck(value, roleInfo.id)}
          >
            {
              renderTreeNodes(roleMenus)
            }
          </Tree>
        </FormItem>
      </Form>
    </Spin>
  )
});

const UserInfoForm = Form.create()((props) => {
  const { loading, form, roleUsers, allUsers, roleInfo, handleUserChange } = props;

  const handleChange = (value, id) => {
    handleUserChange(value, id);
  }

  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem
          {...formItemLayout}
          label="用户"
        >
          {form.getFieldDecorator('user', {
            initialValue: roleUsers && roleUsers.map(item => item.id)
          })(<Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder="请选择用户 "
              onChange={value => handleChange(value, roleInfo.id)}
            >
              {allUsers.length ? allUsers.map(item =>
                <Option key={item.id}>{item.name}</Option>
              ) : allUsers}
            </Select>
          )
          }
        </FormItem>
      </Form>
    </Spin>
  )
});

const GroupInfoForm = Form.create()((props) => {
  const { loading, form, allGroups, roleGroups, roleInfo, handleGroupChange } = props;

  const handleChange = (value, id) => {
    handleGroupChange(value, id);
  }

  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem
          {...formItemLayout}
          label="用户组"
        >
          {form.getFieldDecorator('group', {
            initialValue: roleGroups && roleGroups.map(item => item.id)
          })(<Select
              mode="multiple"
              style={{width: '100%'}}
              placeholder="请选择用户组 "
              onChange={value => handleChange(value, roleInfo.id)}
            >
              {allGroups.length ? allGroups.map(item =>
                <Option key={item.id}>{item.name}</Option>
              ) : allGroups}
            </Select>
          )
          }
        </FormItem>
      </Form>
    </Spin>
  )
});

const CreateForm = connect()((props) => {
  const { formVisible, loading, currentTabKey, closeForm, isCreate, submitForm,
    roleInfo, roleList, roleMenus, checkedMenuKeys,
    handleTabChange, handleMenuKeys, allUsers, roleUsers, allGroups, roleGroups,
    handleUserChange, handleGroupChange } = props;

  // 取消
  const handleCancel = () => {
    const customForm = this[currentTabKey].getForm();
    closeForm(customForm);
  }

  const okHandle = () => {
    const customForm = this[currentTabKey].getForm();
    customForm.validateFields((err, fieldsValue) => {
      if (err) return;
      submitForm(customForm, fieldsValue);
    });
  };

  const onTabChange = (activeKey, id) => {
    handleTabChange(activeKey, id);
  }

  const customFooter = {
    basic: [
        <Button key="back" onClick={handleCancel}>取消</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={okHandle}>
          保存
        </Button>,
    ],
    manager: [
      <Button key="back" onClick={handleCancel}>取消</Button>
    ],
    user: [
      <Button key="back" onClick={handleCancel}>取消</Button>
    ],
    group: [
      <Button key="back" onClick={handleCancel}>取消</Button>
    ]
  };

  const tabList = [
    {
      key: 'basic',
      tab: '基本信息',
      disabled: false,
      content: <BasicInfoForm
        ref = {(el) => { this.basic = el; }}
        roleInfo = {roleInfo}
        roleList = {roleList}
        loading = {loading}
      />
    },
    {
      key: 'manager',
      tab: '权限管理',
      disabled: isCreate,
      content: <ManagerInfoForm
        ref = {(el) => { this.manager = el; }}
        roleInfo = {roleInfo}
        checkedMenuKeys = {checkedMenuKeys}
        handleMenuKeys = {handleMenuKeys}
        roleMenus = {roleMenus}
        loading = {loading}
        labelText = "权限管理"
      />
    },
    {
      key: 'user',
      tab: '关联用户',
      disabled: isCreate,
      content: <UserInfoForm
        ref = {(el) => { this.user = el; }}
        loading = {loading}
        roleInfo = {roleInfo}
        allUsers = {allUsers}
        roleUsers = {roleUsers}
        handleUserChange = {handleUserChange}
      />
    },
    {
      key: 'group',
      tab: '关联用户组',
      disabled: isCreate,
      content: <GroupInfoForm
        ref = {(el) => { this.group = el; }}
        loading = {loading}
        roleInfo = {roleInfo}
        allGroups = {allGroups}
        roleGroups = {roleGroups}
        handleGroupChange = {handleGroupChange}
      />
    }
  ];
  return (
    <Modal
      visible={formVisible}
      onOk={okHandle}
      onCancel={handleCancel}
      footer={customFooter[currentTabKey]}
    >
      <Tabs
        onChange={value => onTabChange(value, roleInfo.id)}
        activeKey={currentTabKey}
      >
        {
          tabList.map(item => (
            <TabPane tab={item.tab} key={item.key} disabled={item.disabled}>{item.content}</TabPane>
          ))
        }
      </Tabs>
    </Modal>
  );
});

@inject(['authRole', 'global'])
@connect(({ authRole, global, loading }) => ({
  authRole,
  global,
  loading: loading.models.authRole,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Role extends PureComponent {
  state = {
    // 是否显示个人信息
    viewVisible: false,
    // 是否显示form表单
    formVisible: false,
    // 当前tab页面
    currentTabKey: 'basic',
    // 是否是新建，新建为true，编辑为false
    isCreate: !this.props.authRole.roleInfo.id,
    // 菜单被选择的项
    checkedMenuKeys: [],
    // 当前角色保存的用户
    userKey: [],
    // 当前角色保存的用户组
    groupKey: [],
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
    const self = this;
    this.props.dispatch({
      type: 'authRole/fetchById',
      payload: record.id,
      callback: (res) => {
        const text = res.enable;
        res.enableLabel = text === true ? '已启用' : '已停用';
        res.badge = text === true ? 'processing' : 'default';
        this.setState({
          viewVisible: true,
        });
        self.props.dispatch({
          type: 'authRole/saveRoleInfo',
          payload: res
        });
      }
    })
    this.props.dispatch({
      type: 'authRole/fetchRoleUsersById',
      payload: record.id,
    });
    this.props.dispatch({
      type: 'authRole/fetchRoleGroupsById',
      payload: record.id,
    });
    this.getMenus(record.id);
  }

  // 删除功能
  handleRemove = (ids) => {
    let idsArray = [];
    if (ids instanceof Array) {
      idsArray = ids;
    } else {
      idsArray.push(ids.id);
    }
    this.props.dispatch({
      type: 'authRole/removeRoles',
      payload: { ids: idsArray.toString() },
      callback: (res) => {
        oopToast(res, '删除成功', '删除失败');
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
  handleEdit = (record) => {
    const self = this;
    this.props.dispatch({
      type: 'authRole/fetchById',
      payload: record.id,
      callback(res) {
        self.props.dispatch({
          type: 'authRole/saveRoleInfo',
          payload: res
        });
        self.setState({
          formVisible: true,
          isCreate: !res.id
        });
      }
    });
    this.getAllRoles();
  }

  // 新建功能
  handleCreate = (flag) => {
    this.getAllRoles();
    this.setState({
      formVisible: flag
    });
  }

  // 取得角色列表
  getAllRoles = () => {
    this.props.dispatch({
      type: 'authRole/fetch',
    })
  }

  // 取得角色的菜单
  getMenus = (roleId) => {
    this.props.dispatch({
      type: 'authRole/fetchMenus',
      payload: { roleId },
      callback: () => {
        this.setState({
          checkedMenuKeys: this.props.authRole.roleMenusChecked.map(item => item.id)
        })
      }
    })
  }

  // 控制菜单选择的渲染
  handleMenuKeys = (checkedKeys, id) => {
    const oldMenus = this.state.checkedMenuKeys;
    const changeMenus = [];
    this.setState({
      checkedMenuKeys: checkedKeys
    })
    if (oldMenus.length < checkedKeys.length) {
      for (let i = 0; i < checkedKeys.length; i++) {
        if (oldMenus.indexOf(checkedKeys[i]) === -1) {
          changeMenus.push(checkedKeys[i]);
        }
      }
      this.props.dispatch({
        type: 'authRole/menusAdd',
        payload: {
          roleId: id,
          ids: changeMenus
        },
        callback: (res) => {
          oopToast(res, '菜单添加成功', '菜单添加失败');
        }
      });
    }
    if (oldMenus.length > checkedKeys.length) {
      for (let i = 0; i < oldMenus.length; i++) {
        if (checkedKeys.indexOf(oldMenus[i]) === -1) {
          changeMenus.push(oldMenus[i]);
        }
      }
      this.props.dispatch({
        type: 'authRole/menusDelete',
        payload: {
          roleId: id,
          ids: {ids: changeMenus.toString()}
        },
        callback: (res) => {
          oopToast(res, '菜单删除成功', '菜单删除失败');
        }
      });
    }
  }

  // 显示层的菜单
  handleMenuKeysView = () => {}

  // tab切换
  handleTabChange = (activeKey, id) => {
    const self = this;
    this.setState({
      currentTabKey: activeKey
    });
    if (activeKey === 'manager') {
      this.getMenus(id);
    } else if (activeKey === 'user') {
      this.props.dispatch({
        type: 'authRole/fetchAllUsers'
      })
      this.props.dispatch({
        type: 'authRole/fetchRoleUsersById',
        payload: id,
        callback: (res) => {
          self.setState({
            userKey: res.map(item => item.id)
          })
        }
      });
    } else if (activeKey === 'group') {
      this.props.dispatch({
        type: 'authRole/fetchAllGroups'
      })
      this.props.dispatch({
        type: 'authRole/fetchRoleGroupsById',
        payload: id,
        callback: (res) => {
          self.setState({
            groupKey: res.map(item => item.id)
          })
        }
      });
    }
  }

  // 关闭form
  closeForm = (customForm) => {
    this.setState({
      formVisible: false
    });
    setTimeout(() => {
      customForm.resetFields();
      this.setState({
        currentTabKey: 'basic',
        isCreate: true
      });
      this.props.dispatch({
        type: 'authRole/clear'
      });
    }, 300);
  }

  // 提交form
  submitForm = (customForm, fields) => {
    const activeKey = this.state.currentTabKey;
    const self = this;
    if (activeKey === 'basic') {
      this.props.dispatch({
        type: 'authRole/createOrUpdate',
        payload: fields,
        callback: (res) => {
          oopToast(res, '保存成功', '保存失败');
          this.getAllRoles();
          this.onLoad();
          self.setState({
            isCreate: false
          });
        }
      });
    }
  }

  // 添加删除公用函数
  addAndDel(roleId, newKeys, oldKeys, typeAdd, typeDel, stateName) {
    this.setState({
      [stateName]: newKeys
    });
    if (oldKeys.length < newKeys.length) {
      for (let i = 0; i < newKeys.length; i++) {
        if (oldKeys.indexOf(newKeys[i]) === -1) {
          this.props.dispatch({
            type: typeAdd,
            payload: {
              userOrGroupId: newKeys[i],
              roleId
            },
            callback: (res) => {
              oopToast(res, '添加成功', '添加失败');
            }
          });
        }
      }
    }
    if (oldKeys.length > newKeys.length) {
      for (let i = 0; i < oldKeys.length; i++) {
        if (newKeys.indexOf(oldKeys[i]) === -1) {
          this.props.dispatch({
            type: typeDel,
            payload: {
              userOrGroupId: oldKeys[i],
              roleId
            },
            callback: (res) => {
              oopToast(res, '删除成功', '删除失败');
            }
          });
        }
      }
    }
  }

  // 角色添加删除用户
  handleUserChange = (value, id) => {
    this.addAndDel(id, value, this.state.userKey, 'authRole/roleAddUsers', 'authRole/roleDelUsers', 'userKey');
  }

  // 角色添加删除用户组
  handleGroupChange = (value, id) => {
    this.addAndDel(id, value, this.state.groupKey, 'authRole/roleAddGroups', 'authRole/userDelGroups', 'groupKey');
  }

  render() {
    const { loading, gridLoading,
      global: { size, oopSearchGrid },
      authRole: { roleInfo, roleUsers, roleGroups, roleList,
        roleMenus, allUsers, allGroups } } = this.props;

    const { viewVisible, formVisible, currentTabKey, isCreate,
      checkedMenuKeys } = this.state;

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
      { title: '继承', dataIndex: 'parentName', key: 'parentName', },
      { title: '状态', dataIndex: 'enable', key: 'enable', render: text => (
          <Fragment>
            {text === true ? '已启用' : '已停用'}
          </Fragment>
      )}
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
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.handleEdit(record) }
      }, {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此条信息',
        onClick: (record)=>{ this.handleRemove(record) }
      },
    ]
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="authroles"
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
            rowButtons={rowButtons}
            ref={(el)=>{ this.oopTable = el }}
          />
        </Card>
        <CreateForm
          formVisible={formVisible}
          loading={loading}
          currentTabKey={currentTabKey}
          closeForm={this.closeForm}
          submitForm={this.submitForm}
          isCreate={isCreate}
          roleInfo={roleInfo}
          roleList={roleList}
          roleMenus={roleMenus}
          checkedMenuKeys={checkedMenuKeys}
          handleMenuKeys={this.handleMenuKeys}
          handleTabChange={this.handleTabChange}
          allUsers={allUsers}
          roleUsers={roleUsers}
          allGroups={allGroups}
          roleGroups={roleGroups}
          handleUserChange={this.handleUserChange}
          handleGroupChange={this.handleGroupChange}
        />
        <Modal
          title="角色信息"
          visible={viewVisible}
          userInfoView={roleInfo}
          roleUsers={roleUsers}
          roleGroups={roleGroups}
          footer={<Button type="primary" onClick={()=>this.handleViewModalVisible(false)}>确定</Button>}
          onCancel={()=>this.handleViewModalVisible(false)}
        >
          <DescriptionList size={size} col="1">
            <Description term="名称">
              {roleInfo.name}
            </Description>
            <Description term="功能描述说明">
              {roleInfo.description}
            </Description>
            <Description term="继承">
              {roleInfo.parentName}
            </Description>
            <Description term="权限">
              <ManagerInfoForm
                roleInfo = {roleInfo}
                checkedMenuKeys = {checkedMenuKeys}
                handleMenuKeys = {this.handleMenuKeysView}
                roleMenus = {roleMenus}
                loading = {loading}
                labelText = ""
              />
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
        </Modal>
      </PageHeaderLayout>
    );
  }
}
