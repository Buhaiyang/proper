import React from 'react';
import { connect } from 'dva';
import { Card, Form, Modal, Spin, Input, Button } from 'antd';
import { inject } from './../../../common/inject';
import OopSearch from './../../../components/OopSearch/index';
import OopTable from './../../../components/OopTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const { TextArea } = Input;

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

const CreateForm = Form.create()((props) => {
  const { form, formVisible, loading, closeForm, submitForm, submitAndPublish, verInfo } = props;

  // 取消
  const handleCancel = () => {
    closeForm(form);
  }

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      submitForm(form, fieldsValue);
    });
  };

  const okAndPublish = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      submitAndPublish(form, fieldsValue);
    });
  }

  return (
    <Modal
      visible={formVisible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title="APP版本信息管理"
      footer={
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button
            type="primary"
            onClick={okHandle}>
            保存
          </Button>
          <Button
            type="primary"
            onClick={okAndPublish}>
            保存并发布
          </Button>
        </div>
      }
    >
      <Spin spinning={loading}>
        <Form>
          <div>
            {form.getFieldDecorator('id', {
              initialValue: verInfo.id,
            })(
              <Input type="hidden" />
            )}
          </div>
          <FormItem
            {...formItemLayout}
            label="版本号"
          >
            {form.getFieldDecorator('ver', {
              initialValue: verInfo.ver,
              rules: [{ required: true, message: '版本号不能为空' }],
            })(
              <Input placeholder="请输入版本号" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="下载链接"
          >
            {form.getFieldDecorator('url', {
              initialValue: verInfo.url,
              rules: [{ required: true, message: '下载链接不能为空' }],
            })(
              <Input placeholder="请输入下载链接" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本内容"
          >
            {form.getFieldDecorator('note', {
              initialValue: verInfo.note,
              rules: [{ required: true, message: '版本内容不能为空' }],
            })(
              <TextArea placeholder="请输入版本内容" autosize={{ minRows: 4, maxRows: 8 }} />
            )}
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
});

@inject(['devtoolsAppver', 'global'])
@connect(({ devtoolsAppver, global, loading }) => ({
  devtoolsAppver,
  global,
  loading: loading.models.devtoolsAppver,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Appver extends React.Component {
  state = {
    lastedVer: '',
    // 是否显示form表单
    formVisible: false,
  }

  componentDidMount() {
    this.refresh();
    this.getLastedVer();
  }

  getLastedVer = () => {
    const self = this;
    this.props.dispatch({
      type: 'devtoolsAppver/getLastedVer',
      callback: (res) => {
        self.setState({
          lastedVer: res.ver
        })
      }
    })
  }

  refresh = (param) => {
    const { pagination } = this.props.global.oopSearchGrid
    const params = {
      ...pagination,
      ...param,
      isAllDataLoad: false,
      loadIndex: 1,
    }
    this.oopSearch.load(params);
  }

  // 删除单项
  handleRemove = (ids) => {
    let idsArray = [];
    if (ids instanceof Array) {
      idsArray = ids;
    } else {
      idsArray.push(ids.id);
    }
    this.props.dispatch({
      type: 'devtoolsAppver/remove',
      payload: { ver: idsArray.toString() },
      callback: (res) => {
        oopToast(res, '删除成功');
        if (this.oopTable) {
          this.oopTable.clearSelection();
          this.refresh();
        }
      }
    });
  }

  // 发布
  handlePublish = (record) => {
    this.props.dispatch({
      type: 'devtoolsAppver/publish',
      payload: {
        ver: record.ver,
        url: record.url,
        note: record.note
      },
      callback: (res) => {
        oopToast(res, '发布成功');
        if (this.oopTable) {
          this.refresh();
          this.getLastedVer();
        }
      }
    });
  }

  // 新建功能
  handleCreate = (flag) => {
    this.setState({
      formVisible: flag
    });
  }

  // 编辑功能
  handleEdit = (record) => {
    const self = this;
    this.props.dispatch({
      type: 'devtoolsAppver/fetchByVer',
      payload: record.ver,
      callback(res) {
        self.props.dispatch({
          type: 'devtoolsAppver/saveVerInfo',
          payload: res
        });
        self.setState({
          formVisible: true,
        });
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
        type: 'devtoolsAppver/clear'
      });
    }, 300);
  }

  // 保存并发布
  submitAndPublish = (form, fields) => {
    const self = this;
    const params = fields;
    this.props.dispatch({
      type: 'devtoolsAppver/publish',
      payload: params,
      callback: (res) => {
        oopToast(res, '保存并发布成功');
        self.refresh();
        this.getLastedVer();
        self.closeForm(form);
      }
    });
  }

  // 提交form
  submitForm = (form, fields) => {
    const self = this;
    const params = fields;
    this.props.dispatch({
      type: 'devtoolsAppver/createOrUpdate',
      payload: params,
      callback: (res) => {
        oopToast(res, '保存成功');
        self.refresh();
        this.getLastedVer();
        self.closeForm(form);
      }
    });
  }

  render() {
    const { loading, gridLoading,
      global: { size, oopSearchGrid },
      devtoolsAppver: { verInfo } } = this.props;

    const { lastedVer, formVisible } = this.state;

    const columns = [
      { title: 'ID号', dataIndex: 'id', key: 'id'},
      { title: '版本号', dataIndex: 'ver', key: 'ver', render: text => (
        text && text === lastedVer ?
          (<span style={{color: 'red'}}>{text}</span>) : (<span>{text}</span>)
      )},
      { title: '版本连接', dataIndex: 'url', key: 'url', render: text => (
        text && text.length > 25 ?
          (<span>{text.substr(0, 25)}...</span>) : (<span>{text}</span>)
      )},
      { title: '内容信息', dataIndex: 'note', key: 'note', render: text => (
        text && text.length > 25 ?
          (<span>{text.substr(0, 25)}...</span>) : (<span>{text}</span>)
      )},
    ];

    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.handleCreate(true) }
      }
    ];
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.handleEdit(record) }
      }, {
        text: '发布',
        name: 'publish',
        icon: 'cloud-upload-o',
        confirm: '是否要发布此版本',
        onClick: (record)=>{ this.handlePublish(record) },
        display: record=>(record.ver !== lastedVer)
      }, {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此条信息',
        onClick: (record)=>{ this.handleRemove(record) },
        display: record=>(record.ver !== lastedVer)
      },
    ]

    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="devtoolsappver"
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
          formVisible={formVisible}
          loading={!!loading}
          closeForm={this.closeForm}
          submitForm={this.submitForm}
          submitAndPublish={this.submitAndPublish}
          verInfo={verInfo}
        />
      </PageHeaderLayout>
    );
  }
}