import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Divider, Spin, Transfer,
  Form, Modal, Input, Tabs, Radio, Badge } from 'antd';
import { connect } from 'dva';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/Oopsearch';
import OopTable from '../../../components/OopTable';
import DescriptionList from '../../../components/DescriptionList';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
// const { Option } = Select;
const { Description } = DescriptionList;
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
  const { form, groupsBasicInfo, loading } = props;

  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem>
          {form.getFieldDecorator('id', {
            initialValue: groupsBasicInfo.id,
          })(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {form.getFieldDecorator('name', {
            initialValue: groupsBasicInfo.name,
            rules: [{ required: true, message: '名称不能为空' }],
          })(
            <Input placeholder="请输入名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="顺序"
        >
          {form.getFieldDecorator('seq', {
            initialValue: groupsBasicInfo.seq,
            rules: [
              { required: true, message: '顺序不能为空' },
              { pattern: /\d+/i, message: '顺序只能为数字'}
            ],
          })(
            <Input placeholder="请输入顺序" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          {form.getFieldDecorator('enable', {
            initialValue: groupsBasicInfo.enable == null ? true : groupsBasicInfo.enable
          })(
            <RadioGroup>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>停用</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {form.getFieldDecorator('description', {
            initialValue: groupsBasicInfo.description
          })(
            <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 5 }} />
          )}
        </FormItem>
      </Form>
    </Spin>
  )
});

const UserInfoForm = Form.create()((props) => {
  const { form, allUsers, userTargetKeys, handleUserTrans, groupsBasicInfo } = props;

  for (const item of allUsers) {
    item.key = item.id;
  }

  const handleChange = (tKeys) => {
    handleUserTrans(groupsBasicInfo.id, tKeys);
  }
  console.log('userTargetKeys', userTargetKeys)
  return (
    <Form>
      <FormItem>
        {form.getFieldDecorator('id', {
          initialValue: groupsBasicInfo.id,
        })(
          <Input type="hidden" />
        )}
      </FormItem>
      <FormItem>
        <Transfer
          dataSource={allUsers}
          showSearch
          listStyle={{
            width: '40%',
            height: 300,
          }}
          operations={['添加', '删除']}
          targetKeys={userTargetKeys}
          onChange={handleChange}
          render={item => `${item.username}-${item.name}`}
        />
      </FormItem>
    </Form>
  )
});

const CreateForm = connect()((props) => {
  const { modalVisible, handleFormSubmit, closeForm, groupUsers,
    allUsers, userTargetKeys, isCreate, loading,
    groupsBasicInfo, currentTabKey, handleTabChange, handleUserTrans } = props;

  // 取消
  const handleCancel = () => {
    const customForm = this[currentTabKey].getForm();
    closeForm(customForm);
  }

  const okHandle = () => {
    const customForm = this[currentTabKey].getForm();
    customForm.validateFields((err, fieldsValue) => {
      if (err) return;
      handleFormSubmit(customForm, fieldsValue);
    });
  };

  const onTabChange = (activeKey) => {
    handleTabChange(activeKey);
  }

  const tabList = [
    {
      key: 'basic',
      tab: '基本信息',
      disabled: false,
      content: <BasicInfoForm
        ref = {(el) => { this.basic = el; }}
        groupsBasicInfo = {groupsBasicInfo}
        loading = {loading}
      />
    },
    {
      key: 'user',
      tab: '用户信息',
      disabled: isCreate,
      content: <UserInfoForm
        ref = {(el) => { this.user = el; }}
        groupsBasicInfo = {groupsBasicInfo}
        groupUsers = {groupUsers}
        allUsers = {allUsers}
        handleUserTrans = {handleUserTrans}
        userTargetKeys = {userTargetKeys}
        loading = {loading}
      />
    },
    // {
    //   key: 'group',
    //   tab: '用户组信息',
    //   disabled: isCreate,
    //   content: <GroupInfoForm
    //     ref = {(el) => { this.group = el; }}
    //     userGroups = {userGroups}
    //     allUsers = {allUsers}
    //     groupAll = {groupAll}
    //     loading = {loading}
    //   />
    // }
  ];
  const footer = (
    <Fragment>
      <Button onClick={handleCancel}>取消</Button>
      {currentTabKey === 'basic' && <Button type="primary" onClick={okHandle} loading={loading}>保存</Button>}
    </Fragment>);
  return (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      footer={footer}
    >
      <Tabs
        onChange={onTabChange}
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


@inject(['authGroups', 'global'])
@connect(({ authGroups, global, loading }) => ({
  authGroups,
  global,
  loading: loading.models.authGroups,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Group extends PureComponent {
  state = {
    modalVisible: false,
    currentTabKey: 'basic',
    userTargetKeys: [],
    viewVisible: false,
    userInfoView: {},
    groupUsers: [],
    userGroups: [],
    isCreate: !this.props.authGroups.groupsBasicInfo.id
  };

  componentDidMount() {
    this.refresh();
  }

  refresh = (param)=>{
    const { pagination } = this.props.global.oopSearchGrid
    const params = {
      ...pagination,
      ...param,
      userGroupEnable: 'ALL'
    }
    this.oopSearch.load(params);
  }

  onChange = (pagination, filters, sorter) => {
    console.log(pagination, sorter);
    this.oopSearch.load({
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  // 状态切换
  handleSwitchOnChange = (checked, record) => {
    this.props.dispatch({
      type: 'authGroups/update',
      payload: {
        enable: checked,
        ids: [record.id]
      },
      callback: (res) => {
        oopToast(res, '已启用', '已停用');
        this.refresh();
      }
    });
  }

  // 批量删除
  handleRemoveAll = (selectedRowKeys) => {
    const me = this;
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${selectedRowKeys.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: 'authGroups/removeAll',
          payload: {
            ids: selectedRowKeys.toString()
          },
          callback: (res) => {
            oopToast(res, '删除成功', '删除失败');
            if (me.oopTable) {
              me.oopTable.clearSelection();
              me.refresh();
            }
          }
        });
      }
    });
  }

  // 单个删除
  handleRemove = (row) => {
    const me = this;
    this.props.dispatch({
      type: 'authGroups/remove',
      payload: {
        ids: row.id
      },
      callback: (res) => {
        oopToast(res, '删除成功', '删除失败');
        if (me.oopTable) {
          me.oopTable.clearSelection();
          me.refresh();
        }
      }
    });
  }

  // 打开新建层
  handleCreate = (flag) => {
    this.setState({
      modalVisible: flag
    });
  }

  // 关闭form
  closeForm = (customForm) => {
    this.setState({
      modalVisible: false
    });
    setTimeout(() => {
      customForm.resetFields();
      this.setState({
        currentTabKey: 'basic',
        userTargetKeys: [],
        isCreate: true
      });
      this.props.dispatch({
        type: 'authGroups/clear'
      });
    }, 300);
  }

  // form确认按钮
  handleFormSubmit = (customForm, fields) => {
    const activeKey = this.state.currentTabKey;
    const self = this;
    if (activeKey === 'basic') {
      this.props.dispatch({
        type: 'authGroups/createOrUpdate',
        payload: fields,
        callback: (res) => {
          oopToast(res, '保存成功', '保存失败');
          this.refresh();
          self.setState({
            isCreate: false
          });
        }
      });
    }
  }

  // tab切换
  handleTabChange = (activeKey) => {
    this.setState({
      currentTabKey: activeKey
    });
    console.log(activeKey)
    if (activeKey === 'user') {
      this.props.dispatch({
        type: 'authGroups/fetchUserAll',
      });
      if (this.props.authGroups.groupsBasicInfo.id) {
        this.props.dispatch({
          type: 'authGroups/fetchGroupUsers',
          payload: this.props.authGroups.groupsBasicInfo.id,
          callback: () => {
            const userKey = [];
            for (const item of this.props.authGroups.groupUsers) {
              userKey.push(item.id);
            }
            this.setState({
              userTargetKeys: userKey
            });
          }
        });
      } else {
        this.setState({
          userTargetKeys: []
        });
      }
    // } else if (activeKey === 'group') {
    //   this.props.dispatch({
    //     type: 'authGroups/fetchUserGroups',
    //     payload: this.props.authGroups.groupsBasicInfo.id,
    //     callback: () => {
    //       this.setState({
    //         userGroups: this.props.authGroups.userGroups
    //       });
    //     }
    //   });
    }
  }

  // 点击编辑按钮
  handleEdit = (record) => {
    this.setState({
      modalVisible: true,
      isCreate: !record.id
    });
    this.props.dispatch({
      type: 'authGroups/fetchById',
      payload: record.id
    });
  }

  // user穿梭框change
  handleUserTrans = (groupId, key) => {
    const me = this;
    const userKey = [];
    for (const item of this.props.authGroups.groupUsers) {
      userKey.push(item.id);
    }
    const data = [];
    if (key.length > userKey.length) {
      for (let i = 0; i < key.length; i++) {
        if (userKey.indexOf(key[i]) === -1) {
          data.push(key[i]);
        }
      }
      this.props.dispatch({
        type: 'authGroups/groupAddUsers',
        payload: {
          id: groupId,
          ids: data.toString()
        },
        callback: () => {
          me.props.dispatch({
            type: 'authGroups/fetchGroupUsers',
            payload: groupId,
            callback: (userTargetKeys) => {
              me.setState({
                userTargetKeys: userTargetKeys.map(item=>item.id)
              })
            }
          })
        }
      });
    }
    if (key.length < userKey.length) {
      for (let i = 0; i < userKey.length; i++) {
        if (key.indexOf(userKey[i]) === -1) {
          data.push(userKey[i]);
        }
      }
      this.props.dispatch({
        type: 'authGroups/groupDeleteUsers',
        payload: {
          id: groupId,
          ids: data.toString()
        },
        callback: () => {
          me.props.dispatch({
            type: 'authGroups/fetchGroupUsers',
            payload: groupId,
            callback: (userTargetKeys) => {
              me.setState({
                userTargetKeys: userTargetKeys.map(item=>item.id)
              })
            }
          })
        }
      });
    }
  }

  // 查看基本信息
  handleView = (record) => {
    const userInfoView = record;
    const text = userInfoView.enable;
    userInfoView.enableLabel = text === true ? '已启用' : '已停用';
    userInfoView.badge = text === true ? 'processing' : 'default';
    this.setState({
      viewVisible: true,
      userInfoView
    });
    this.props.dispatch({
      type: 'authGroups/fetchGroupUsers',
      payload: record.id,
      callback: () => {
        this.setState({
          groupUsers: this.props.authGroups.groupUsers
        });
      }
    });
    // this.props.dispatch({
    //   type: 'authGroups/fetchUserGroups',
    //   payload: record.id,
    //   callback: () => {
    //     this.setState({
    //       userGroups: this.props.authGroups.userGroups
    //     });
    //   }
    // });
  }

  // 关闭基本信息
  handleViewModalVisible = (flag) => {
    this.setState({
      viewVisible: flag
    });
  }

  render() {
    const { loading, global: { size, oopSearchGrid}, gridLoading } = this.props;
    const { modalVisible, currentTabKey, userTargetKeys, viewVisible, userInfoView,
      groupUsers, userGroups, isCreate } = this.state;

    const parentMethods = {
      handleFormSubmit: this.handleFormSubmit,
      closeForm: this.closeForm,
      groupsBasicInfo: this.props.authGroups.groupsBasicInfo,
      groupUsers: this.props.authGroups.groupUsers,
      allUsers: this.props.authGroups.allUsers,
      groupAll: this.props.authGroups.groupAll,
      userGroups: this.props.authGroups.userGroups,
      handleTabChange: this.handleTabChange,
      handleUserTrans: this.handleUserTrans,
      loading: !!loading,
      isCreate,
      currentTabKey,
      userTargetKeys
    };

    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name',
        render: (text, record) => (
          <span onClick={() => this.handleView(record)} style={{textDecoration: 'underline', cursor: 'pointer'}}>
            {text}
          </span>
        )
      },
      { title: '描述说明', dataIndex: 'description', key: 'description', },
      { title: '顺序', dataIndex: 'seq', key: 'seq', },
      { title: '状态', dataIndex: 'enable', key: 'enable', render: text => (
        <Fragment>
          {text === true ? '已启用' : '已停用'}
        </Fragment>
      )},
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
        onClick: (items)=>{ this.handleRemoveAll(items) },
        display: items=>(items.length),
      }
    ]
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
          moduleName="authusergroups"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
            grid={oopSearchGrid}
            columns={columns}
            loading={gridLoading}
            onLoad={this.refresh}
            size={size}
            topButtons={topButtons}
            rowButtons={rowButtons}
            ref={(el)=>{ this.oopTable = el }}
          />
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
        <Modal
          title="用户组信息"
          visible={viewVisible}
          userInfoView={userInfoView}
          groupUsers={groupUsers}
          userGroups={userGroups}
          footer={<Button type="primary" onClick={()=>this.handleViewModalVisible(false)}>确定</Button>}
          onCancel={()=>this.handleViewModalVisible(false)}
        >
          <Spin spinning={loading}>
            <DescriptionList size="small" col="1">
              <Description term="名称">
                {userInfoView.name}
              </Description>
              <Description term="顺序">
                {userInfoView.seq}
              </Description>
              <Description term="描述">
                {userInfoView.description}
              </Description>
              <p>
                <Badge status={userInfoView.badge} text={userInfoView.enableLabel} />
              </p>
            </DescriptionList>
            <Divider style={{ marginBottom: 16 }} />
            <DescriptionList size={size} col="1" title="包含的用户信息">
              <Description>{groupUsers.map(item=>item.name.concat(', '))}</Description>
            </DescriptionList>
            {/* <Divider style={{ marginBottom: 16 }} />
            <DescriptionList size={size} col="1" title="用户组信息">
              <Description>{userGroups.map(item=>item.name.concat(', '))}</Description>
            </DescriptionList> */}
          </Spin>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
