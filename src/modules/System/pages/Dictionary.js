import React, {Fragment} from 'react';
import { Modal, Card, Form, Spin, Input, Button, Radio, InputNumber, message} from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/OopSearch';
import OopTable from '../../../components/OopTable';
import {inject} from '../../../common/inject';
import { oopToast } from './../../../common/oopUtils';
import DescriptionList from './../../../components/DescriptionList/index';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
const ModalForm = Form.create()((props) => {
  const { form, loading, visible, title, onModalCancel, onModalSubmit, formEntity } = props;
  const submitForm = ()=>{
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onModalSubmit(fieldsValue, form);
    });
  }
  const cancelForm = ()=>{
    onModalCancel(form)
  }
  const footer = (
    <Fragment>
      <Button onClick={cancelForm}>取消</Button>
      <Button type="primary" onClick={submitForm} loading={loading}>保存</Button>
    </Fragment>);
  return (
    <Modal
      title={title}
      visible={visible}
      footer={footer}
      onCancel={cancelForm}
      destroyOnClose={true} >
      <Spin spinning={loading}>
        <Form>
          <div>
            {form.getFieldDecorator('id', {
              initialValue: formEntity.id
            })(<Input type="hidden" />)}
          </div>
          <FormItem {...formItemLayout} label="字典项">
            {form.getFieldDecorator('catalog', {
              initialValue: formEntity.catalog,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ \u4e00-\u9fa5]+$/, message: '字典项不能为空，且为非汉字', }
              ]
            })(<Input placeholder="请输入字典项内容" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="字典编码">
            {form.getFieldDecorator('code', {
              initialValue: formEntity.code,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ \u4e00-\u9fa5]+$/, message: '字典编码不能为空，且为非汉字', },
              ]
            })(<Input placeholder="请输入字典编码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="字典值">
            {form.getFieldDecorator('name', {
              initialValue: formEntity.name,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ ]+$/, message: '字典值不能为空，且不可以有空格' }
              ]
            })(<Input placeholder="请输入字典值" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="排序">
            {form.getFieldDecorator('order', {
              initialValue: formEntity.order,
              rules: [
                { required: true, message: '排序不可以为空' },
                { whitespace: true, message: '排序只可以为 1 ~ 999 范围的数字', pattern: /^([1-9]\d{0,2})$/ }
              ]
            })(<InputNumber style={{ paddingLeft: 10}} min={0} max={999} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否默认">
            {form.getFieldDecorator('deft', {
              initialValue: formEntity.deft != null ? formEntity.deft : true,
            })(<RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
            </RadioGroup>)}
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  )
});

@inject(['systemDictionary', 'global'])
@connect(({ systemDictionary, global, loading }) => ({
  systemDictionary,
  global,
  loading: loading.models.systemDictionary,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Dictionary extends React.PureComponent {
  state = {
    modalFormVisible: false,
    visible: false,
    info: {}
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = (param = {})=>{
    const {pagination} = param;
    this.oopSearch.load({
      pagination,
      dataDicType: ''
    })
  }
  handleCreate = ()=>{
    this.setModalFormVisible(true);
  }
  handleEdit = (record) => {
    this.props.dispatch({
      type: 'systemDictionary/fetchById',
      payload: record.id,
    });
    this.setModalFormVisible(true);
  }
  deleteById = (record) => {
    this.props.dispatch({
      type: 'systemDictionary/remove',
      payload: record.id,
      callback: (res)=>{
        oopToast(res, '删除成功', '删除失败');
        this.onLoad();
      }
    })
  }
  handleRemove = (record) => {
    record.dataDicType === 'SYSTEM' ? message.warning('系统字典不可以删除') : this.deleteById(record)
  }
  handleModalCancel = (form) => {
    this.setModalFormVisible(false);
    setTimeout(()=>{
      form.resetFields();
      this.props.dispatch({
        type: 'systemDictionary/clearEntity'
      });
    }, 300)
  }
  handleModalSubmit = (values, form) => {
    Object.assign(values, { dataDicType: 'BUSINESS' });
    this.props.dispatch({
      type: 'systemDictionary/saveOrUpdate',
      payload: values,
      callback: (res)=>{
        oopToast(res, '保存成功', '保存失败');
        this.handleModalCancel(form);
        this.onLoad();
      }
    });
  }
  handleView = (record) => {
    this.setState({
      visible: true,
      info: record
    });
  }
  handleClose = () => {
    this.setState({
      visible: false,
      info: {}
    });
  }
  setModalFormVisible = (flag) =>{
    this.setState({modalFormVisible: flag})
  }
  render() {
    const {systemDictionary: {entity}, loading,
      global: { oopSearchGrid, size }, gridLoading } = this.props;
    const { visible, info } = this.state;
    const { newForm, editFrom } = { newForm: '新建数据字典', editFrom: '编辑数据字典' }
    const columns = [
      { title: '字典项', dataIndex: 'catalog', render: (text, record)=>(
        <span
          onClick={()=>this.handleView(record)}
          style={{textDecoration: 'underline', cursor: 'pointer'}}>
          {text}
      </span>)},
      { title: '字典编码', dataIndex: 'code' },
      { title: '字典值', dataIndex: 'name' },
      { title: '排序', dataIndex: 'order' },
      { title: '是否默认', dataIndex: 'deft', render: text => (
        <Fragment>
          {text === true ? '是' : '否'}
        </Fragment>
      ) },
      { title: '系统字典', dataIndex: 'dataDicType', render: text => (
          <Fragment>
            {text === 'SYSTEM' ? '是' : '否'}
          </Fragment>
      ) }
    ];
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.handleCreate() }
      }
    ];
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.handleEdit(record) },
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此条信息',
        onClick: (record)=>{ this.handleRemove(record) },
      },
    ];
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="systemdictionary"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
            onLoad={this.onLoad}
            checkable={false}
            loading={gridLoading}
            grid={oopSearchGrid}
            columns={columns}
            rowButtons={rowButtons}
            topButtons={topButtons}
            size={size}
            ref={(el)=>{ this.oopTable = el }}
          />
        </Card>
        <ModalForm
          visible={this.state.modalFormVisible}
          title={entity.id ? editFrom : newForm}
          onModalCancel={this.handleModalCancel}
          onModalSubmit={this.handleModalSubmit}
          formEntity={entity}
          loading={!!loading}
        />
        <Modal
          visible={visible}
          title="数据字典配置"
          onCancel={()=>this.handleClose()}
          footer={<Button type="primary" onClick={()=>this.handleClose()}>确定</Button>}
        >
          <DescriptionList size={size} col="1">
            <Description term="字典项">
              {info.catalog}
            </Description>
            <Description term="字典编码">
              {info.code}
            </Description>
            <Description term="字典值">
              {info.name}
            </Description>
            <Description term="排序">
              {info.order}
            </Description>
            <Description term="是否默认">
              {info.deft === true ? '是' : '否'}
            </Description>
            <Description term="系统字典">
              {info.dataDicType === 'SYSTEM' ? '是' : '否'}
            </Description>
          </DescriptionList>
        </Modal>
      </PageHeaderLayout>)
  }
}
