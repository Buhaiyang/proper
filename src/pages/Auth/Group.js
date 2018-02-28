import React, { PureComponent } from 'react';
import { Card, Button, Table, Switch, Divider, Form, Modal, Input, message, Tabs } from 'antd';
import { connect } from 'dva';
import styles from './Group.less';
import { inject } from './../../common/inject';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleCreateOk, handleCreate } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleCreateOk(fieldsValue);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleCreate()}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="基本信息" key="1">
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Tabs.TabPane>
        <Tabs.TabPane tab="用户/用户组信息" key="2">
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
});


@inject('authGroups')
@connect(({ authGroups, loading }) => ({
  authGroups,
  loading: loading.models.authGroups
}))
@Form.create()
export default class Group extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    selectedRowKeys: []
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

  // 批量删除弹出框
  showDeleteAllConfirm = (row) => {
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${this.state.selectedRowKeys.length}条数据吗?`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.handleRemoveAll(row);
      },
      onCancel() {},
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

  // 单个删除提示框
  showDeleteConfirm = (row) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除选中的数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.handleRemove(row);
      },
      onCancel() {},
    });
  }

  // 打开新建层
  handleCreate = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  // 新建确认
  handleCreateOk = (fields) => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加用户成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { authGroups: { groupsData }, loading } = this.props;
    const { modalVisible, selectedRows, selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (keys, rows) => {
        this.setState({
          selectedRows: rows,
          selectedRowKeys: keys
        });
      }
    };

    const parentMethods = {
      handleCreateOk: this.handleCreateOk,
      handleCreate: this.handleCreate,
    };

    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name',
        render: text => (<span style={{textDecoration: 'underline', cursor: 'pointer'}}>{text}</span>)
      },
      { title: '描述说明', dataIndex: 'description', key: 'description', },
      { title: '顺序', dataIndex: 'seq', key: 'seq', },
      { title: '状态', dataIndex: 'enable', key: 'enable', render: (text, record) => (
        <Switch
          defaultChecked = { text }
          onChange={(value) => {
          this.handleSwitchOnChange(value, record);
        }} />
      )},
      {
        title: '操作', key: 'action', render: record => (
          <span>
            <a href="#">编辑</a>
            <Divider type="vertical" />
            <a onClick={() => { this.showDeleteConfirm(record); }}>删除</a>
          </span>
        )
      }
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreate(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="delete" onClick={() => this.showDeleteAllConfirm(selectedRowKeys)}>批量删除</Button>
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
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
