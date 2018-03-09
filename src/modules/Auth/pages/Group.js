import React, { PureComponent } from 'react';
import { Card, Button, Table, Switch, Divider, Spin, Transfer,
  Form, Modal, Input, message, Tabs, Radio, Select, Badge, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './Group.less';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OSearch from '../../../components/Osearch';
import DescriptionList from '../../../components/DescriptionList';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
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
  const { form, groupsBasicInfo } = props;

  return (
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
        {form.getFieldDecorator('groupEnable', {
          initialValue: groupsBasicInfo.enable || true
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
          initialValue: groupsBasicInfo.description,
          rules: [{ required: true, message: '描述不能为空' }]
        })(
          <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 5 }} />
        )}
      </FormItem>
    </Form>
  )
});

const UserInfoForm = Form.create()((props) => {
  // const { form, groupUsers, allUsers, loading, userTargetKeys, handleUserTrans } = props;
  const { allUsers, userTargetKeys, handleUserTrans } = props;

  for (const item of allUsers) {
    item.key = item.id;
  }

  const handleChange = (tKeys) => {
    handleUserTrans(tKeys);
  }

  return (
    <Form>
      {/* <FormItem
        {...formItemLayout}
        label="用户"
      >
        {form.getFieldDecorator('users', {
          initialValue: groupUsers && groupUsers.map(item => item.id),
          rules: [{ required: true, message: '用户不能为空' }],
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择用户 "
          >
            {allUsers.length ? allUsers.map(item=>
              <Option key={item.id}>{item.name}</Option>
              ) : allUsers}
          </Select>
        )}
        {loading && (
          <div className={styles.selectLoading}>
            <Spin size="small" />
          </div>
        )}
      </FormItem> */}
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

const GroupInfoForm = Form.create()((props) => {
  const { form, groupAll, userGroups, loading } = props;

  return (
    <Form>
      <FormItem
        {...formItemLayout}
        label="用户组"
      >
        {form.getFieldDecorator('groups', {
          initialValue: userGroups && userGroups.map(item => item.id),
          rules: [{ required: true, message: '用户组不能为空' }],
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择用户组 "
          >
            {groupAll.length ? groupAll.map(item=>
              <Option key={item.id}>{item.name}</Option>
            ) : groupAll}
          </Select>
        )}
        {loading && (
          <div className={styles.selectLoading}>
            <Spin size="small" />
          </div>
        )}
      </FormItem>
    </Form>
  )
});

const CreateForm = connect()((props) => {
  const { modalVisible, handleFormSubmit, closeForm, groupUsers,
    allUsers, groupAll, userGroups, userTargetKeys, isCreate, loading,
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
        groupUsers = {groupUsers}
        allUsers = {allUsers}
        handleUserTrans = {handleUserTrans}
        userTargetKeys = {userTargetKeys}
        loading = {loading}
      />
    },
    {
      key: 'group',
      tab: '用户组信息',
      disabled: isCreate,
      content: <GroupInfoForm
        ref = {(el) => { this.group = el; }}
        userGroups = {userGroups}
        allUsers = {allUsers}
        groupAll = {groupAll}
        loading = {loading}
      />
    }
  ];

  return (
    <Modal
      visible={modalVisible}
      onOk={okHandle}
      onCancel={handleCancel}
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
  loading: loading.models.authGroups
}))
@Form.create()
export default class Group extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    selectedRowKeys: [],
    currentTabKey: 'basic',
    userTargetKeys: [],
    viewVisible: false,
    userInfoView: {},
    groupUsers: [],
    userGroups: [],
    isCreate: !this.props.authGroups.groupsBasicInfo.id
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'authGroups/fetch'
    });
  }

  // 状态切换
  handleSwitchOnChange = (checked, record) => {
    this.props.dispatch({
      type: 'authGroups/update',
      payload: {
        enable: checked,
        ids: [record.id]
      },
      callback: () => {
        this.props.dispatch({
          type: 'authGroups/fetch'
        });
      }
    });
  }

  // 批量删除
  handleRemoveAll = (selectedRowKeys) => {
    this.props.dispatch({
      type: 'authGroups/removeAll',
      payload: {
        ids: selectedRowKeys.toString()
      },
      callback: () => {
        this.props.dispatch({
          type: 'authGroups/fetch'
        });
        message.success(this.props.authGroups.groupsMessageData);
        this.setState({
          selectedRows: [],
          selectedRowKeys: []
        });
      }
    });
  }

  // 单个删除
  handleRemove = (row) => {
    this.props.dispatch({
      type: 'authGroups/remove',
      payload: {
        ids: row.id
      },
      callback: () => {
        this.props.dispatch({
          type: 'authGroups/fetch'
        });
        message.success(this.props.authGroups.groupsMessageData);
        this.setState({
          selectedRows: [],
          selectedRowKeys: []
        });
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
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        currentTabKey: 'basic',
        userTargetKeys: [],
        isCreate: true
      });
      customForm.resetFields();
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
        callback: () => {
          this.props.dispatch({
            type: 'authGroups/fetch'
          });
          self.setState({
            isCreate: false
          });
        }
      });
    } else if (activeKey === 'user') {
      // TODO
    } else if (activeKey === 'group') {
      // TODO
    }
  }

  // tab切换
  handleTabChange = (activeKey) => {
    this.setState({
      currentTabKey: activeKey
    });
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
    } else if (activeKey === 'group') {
      this.props.dispatch({
        type: 'authGroups/fetchUserGroups',
        payload: this.props.authGroups.groupsBasicInfo.id,
        callback: () => {
          this.setState({
            userGroups: this.props.authGroups.userGroups
          });
        }
      });
    }
  }

  // 点击编辑按钮
  handleEdit = (record) => {
    const self = this;
    this.props.dispatch({
      type: 'authGroups/fetchById',
      payload: record.id,
      callback() {
        self.setState({
          modalVisible: true,
          isCreate: !record.id
        });
      }
    });
  }

  // user穿梭框change
  handleUserTrans = (key) => {
    this.setState({
      userTargetKeys: key
    });
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
      payload: this.props.authGroups.groupsBasicInfo.id,
      callback: () => {
        this.setState({
          groupUsers: this.props.authGroups.groupUsers
        });
      }
    });
    this.props.dispatch({
      type: 'authGroups/fetchUserGroups',
      payload: this.props.authGroups.groupsBasicInfo.id,
      callback: () => {
        this.setState({
          userGroups: this.props.authGroups.userGroups
        });
      }
    });
  }

  // 关闭基本信息
  handleViewModalVisible = (flag) => {
    this.setState({
      viewVisible: flag
    });
  }

  onSuggest = (query, matchStr)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'global/queryData',
      payload: matchStr
    });
  }

  onSearchResult = (param)=>{
    const { authGroups: { pagination = {}} } = this.props;
    this.props.dispatch({
      type: 'authGroups/fetch',
      payload: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        extraParams: param,
      }
    });
  }

  render() {
    const { authGroups: { groupsData }, loading,
      global: {searchOptions, size} } = this.props;
    const { modalVisible, selectedRows, selectedRowKeys,
      currentTabKey, userTargetKeys, viewVisible, userInfoView,
      groupUsers, userGroups, isCreate } = this.state;
    const rowSelection = {
      onChange: (keys, rows) => {
        this.setState({
          selectedRows: rows,
          selectedRowKeys: keys
        });
      }
    };

    const parentMethods = {
      handleFormSubmit: this.handleFormSubmit,
      closeForm: this.closeForm,
      groupsBasicInfo: this.props.authGroups.groupsBasicInfo,
      groupUsers: this.props.authGroups.groupUsers,
      allUsers: this.props.authGroups.allUsers,
      groupAll: this.props.authGroups.groupsData,
      userGroups: this.props.authGroups.userGroups,
      handleTabChange: this.handleTabChange,
      handleUserTrans: this.handleUserTrans,
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
      { title: '状态', dataIndex: 'enable', key: 'enable', render: (text, record) => (
          <Switch
            defaultChecked = { text }
            onChange={(value) => {
              this.handleSwitchOnChange(value, record);
            }} />)},
      {
        title: '操作', key: 'action', render: record => (
          <span>
            <a onClick={() => this.handleEdit(record)}>编辑</a>
            <Divider type="vertical" />
            {<Popconfirm title="是否要删除此条信息？" onConfirm={() => this.handleRemove(record)}>
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
                    {<Popconfirm title={`确定删除选中的${this.state.selectedRowKeys.length}条数据吗?`} onConfirm={() => this.handleRemoveAll(selectedRowKeys)}>
                      <Button icon="delete">批量删除</Button>
                    </Popconfirm>}
                  </span>
                )
              }
            </div>
            <Table
              loading= {loading}
              rowSelection={rowSelection}
              dataSource={groupsData}
              columns={columns}
              rowKey={record => record.id}
              size={size}
            />
          </div>
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
          <Divider style={{ marginBottom: 16 }} />
          <DescriptionList size={size} col="1" title="用户组信息">
            <Description>{userGroups.map(item=>item.name.concat(', '))}</Description>
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
