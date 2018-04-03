import React from 'react';
import { connect } from 'dva';
import { Form, Card, Divider, Popconfirm, Icon, Tooltip, Modal, message,
  Input, Select, Spin, DatePicker, Row, Col, TreeSelect } from 'antd';
import moment from 'moment';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from './../../../components/Oopsearch/index';
import OopTable from './../../../components/OopTable/index';
import styles from './Employee.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const dateFormat = 'YYYY-MM-DD';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

const textareLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
}

const CreateForm = Form.create()((props) => {
  const { formVisible, loading, form, employeeInfo,
    closeForm, submitForm, organization } = props;

  // 取消
  const handleCancel = () => {
    closeForm(form);
  }

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      submitForm(fieldsValue, form);
    });
  };

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} value={item.id} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode title={item.name} value={item.id} key={item.id} dataRef={item} />
      );
    });
  }

  return (
    <Modal
      title="基本信息"
      visible={formVisible}
      onOk={okHandle}
      onCancel={handleCancel}
      width={750}
    >
      <Spin spinning={loading}>
        <Form id="employee_modal_form">
          <Row>
            <Col span={12}>
              <div>
                {form.getFieldDecorator('id', {
                  initialValue: employeeInfo.id ? employeeInfo.id : null,
                })(
                  <Input type="hidden" />
                )}
              </div>
              <FormItem
                {...formItemLayout}
                label="姓名"
              >
                {form.getFieldDecorator('name', {
                  initialValue: employeeInfo.name ? employeeInfo.name : '',
                  rules: [{ required: true, message: '姓名不能为空' }],
                })(
                  <Input placeholder="请输入姓名" />
                )}
              </FormItem></Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="工号"
              >
                {form.getFieldDecorator('number', {
                  initialValue: employeeInfo.number ? employeeInfo.number : '',
                })(
                  <Input placeholder="请输入工号" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {form.getFieldDecorator('sex', {
                  initialValue: employeeInfo.sex ? employeeInfo.sex : '',
                })(
                  <Select placeholder="请选择" getPopupContainer={() => document.getElementById('employee_modal_form')}>
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="部门"
              >
                {form.getFieldDecorator('organizationId', {
                  initialValue: employeeInfo.organizationId ? employeeInfo.organizationId : null,
                  rules: [{ required: true, message: '部门不能为空' }],
                })(
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择部门"
                    allowClear
                    treeDefaultExpandAll
                    getPopupContainer={() => document.getElementById('employee_modal_form')}
                  >
                    {
                      renderTreeNodes(organization)
                    }
                  </TreeSelect>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="出生日期"
              >
                {form.getFieldDecorator('birthday', {
                  initialValue: employeeInfo.birthday ? moment(employeeInfo.birthday) : null,
                })(
                  <DatePicker
                    format={dateFormat}
                    className={styles.datePickerWidth}
                    getCalendarContainer={() => document.getElementById('employee_modal_form')} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="身份证号"
              >
                {form.getFieldDecorator('idcard', {
                  initialValue: employeeInfo.idcard ? employeeInfo.idcard : '',
                })(
                  <Input placeholder="请输入身份证号" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="固定电话1"
              >
                {form.getFieldDecorator('telephone', {
                  initialValue: employeeInfo.telephone ? employeeInfo.telephone : '',
                })(
                  <Input placeholder="请输入固定电话1" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="固定电话2"
              >
                {form.getFieldDecorator('telephone1', {
                  initialValue: employeeInfo.telephone1 ? employeeInfo.telephone1 : '',
                })(
                  <Input placeholder="请输入固定电话2" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="移动电话1"
              >
                {form.getFieldDecorator('phone', {
                  initialValue: employeeInfo.phone ? employeeInfo.phone : '',
                  rules: [{
                    pattern: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i, message: '请输入正确的手机号码',
                  }],
                })(
                  <Input placeholder="请输入移动电话1" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="移动电话2"
              >
                {form.getFieldDecorator('phone1', {
                  initialValue: employeeInfo.phone1 ? employeeInfo.phone1 : '',
                  rules: [{
                    pattern: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i, message: '请输入正确的手机号码',
                  }],
                })(
                  <Input placeholder="请输入移动电话2" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="传真"
              >
                {form.getFieldDecorator('fax', {
                  initialValue: employeeInfo.fax ? employeeInfo.fax : '',
                })(
                  <Input placeholder="请输入传真" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="电子邮件"
              >
                {form.getFieldDecorator('email', {
                  initialValue: employeeInfo.email ? employeeInfo.email : '',
                  rules: [{
                    type: 'email', message: '请输入正确的电子邮件',
                  }],
                })(
                  <Input placeholder="请输入电子邮件" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                {...textareLayout}
                label="描述"
              >
                {form.getFieldDecorator('description', {
                  initialValue: employeeInfo.description ? employeeInfo.description : '',
                })(
                  <TextArea placeholder="请输入描述" autosize={{ minRows: 4 }} />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
});

@inject(['hrmEmployee', 'global'])
@connect(({ hrmEmployee, global, loading }) => ({
  hrmEmployee,
  global,
  loading: loading.models.hrmEmployee,
  gridLoading: loading.effects['global/oopSearchResult']
}))
@Form.create()
export default class Employee extends React.PureComponent {
  state = {
    // 是否显示form表单
    formVisible: false,
  }
  componentDidMount() {
    this.onLoad();
  }

  onLoad = (param) => {
    this.oopSearch.load(param);
  }

  // 删除
  handleRemove = (id) => {
    const self = this;
    this.props.dispatch({
      type: 'hrmEmployee/employeeRemove',
      payload: {ids: id},
      callback: () => {
        message.success(self.props.hrmEmployee.messageText);
        this.onLoad();
      }
    })
  }

  // 批量删除
  handleRemoveAll = (items) => {
    const self = this;
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${items.length}条数据吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        self.props.dispatch({
          type: 'hrmEmployee/employeeRemove',
          payload: {ids: items.toString()},
          callback: () => {
            self.oopTable.clearSelection()
            message.success(self.props.hrmEmployee.messageText);
            self.onLoad()
          }
        })
      }
    });
  }

  // 从人员中批量添加平台用户
  handleCreateUsers = (items) => {
    const self = this;
    Modal.confirm({
      title: '提示',
      content: `确定添加选中的${items.length}条人员吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        self.props.dispatch({
          type: 'hrmEmployee/employeeAddUsers',
          payload: {ids: items.toString()},
          callback: () => {
            self.oopTable.clearSelection()
            message.success(self.props.hrmEmployee.messageText);
            self.onLoad()
          }
        })
      }
    });
  }

  // 新建
  handleCreate = (flag) => {
    this.setState({
      formVisible: flag
    });
    this.props.dispatch({
      type: 'hrmEmployee/fetchOrganization'
    });
  }

  // 编辑
  handleEdit = (record) => {
    const self = this;
    this.props.dispatch({
      type: 'hrmEmployee/employeeInfo',
      payload: record.id,
      callback: () => {
        self.props.dispatch({
          type: 'hrmEmployee/fetchOrganization'
        });
        self.setState({
          formVisible: true
        });
      }
    });
  }

  // 新建或者更新的提交
  submitForm = (fields, form) => {
    const self = this;
    const params = fields;
    params.birthday = params.birthday ? params.birthday.format('YYYY-MM-DD') : null;
    this.props.dispatch({
      type: 'hrmEmployee/createOrUpdate',
      payload: params,
      callback: () => {
        message.success(self.props.hrmEmployee.messageText);
        this.closeForm(form);
        this.onLoad();
      }
    });
  }

  // 关闭form
  closeForm = (form) => {
    this.setState({
      formVisible: false
    });
    setTimeout(() => {
      form.resetFields();
      this.props.dispatch({
        type: 'hrmEmployee/clear'
      });
    }, 300);
  }

  render() {
    const { loading, gridLoading,
      global: { size, oopSearchGrid },
      hrmEmployee: { employeeInfo, organization } } = this.props;

    const { formVisible } = this.state;

    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name'},
      { title: '工号', dataIndex: 'number', key: 'number'},
      { title: '性别', dataIndex: 'sex', key: 'sex', render: record => (record === '0' ? '男' : '女')},
      { title: '出生日期', dataIndex: 'birthday', key: 'birthday'},
      { title: '固定电话1', dataIndex: 'telephone', key: 'telephone'},
      { title: '移动电话1', dataIndex: 'phone', key: 'phone'},
      { title: '部门', dataIndex: 'organization', key: 'organization'},
      {
        title: '操作', key: 'action', render: record => (
          <span>
            <Tooltip placement="bottom" title="编辑">
              <a onClick={() => this.handleEdit(record)}>
                <Icon type="edit" />
              </a>
            </Tooltip>
            <Divider type="vertical" />
            {<Popconfirm title="是否要删除此条信息？" onConfirm={() => this.handleRemove(record.id)}>
              <Tooltip placement="bottom" title="删除">
                <a><Icon type="delete" /></a>
              </Tooltip>
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
        text: '批量建用户',
        name: 'createUsers',
        icon: 'usergroup-add',
        onClick: (items)=>{ this.handleCreateUsers(items) },
        display: items=>(items.length),
      },
      {
        text: '批量删除',
        name: 'delete',
        icon: 'delete',
        onClick: (items)=>{ this.handleRemoveAll(items) },
        display: items=>(items.length),
      }
    ];

    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="$hrm$employee"
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
        <CreateForm
          formVisible={formVisible}
          loading={!!loading}
          organization={organization}
          closeForm={this.closeForm}
          submitForm={this.submitForm}
          employeeInfo={employeeInfo}
        />
      </PageHeaderLayout>
    );
  }
}