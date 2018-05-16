import React, {Fragment} from 'react';
import { Modal, Card, Form, Spin, Input, Select, Badge, Button } from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/OopSearch';
import OopTable from '../../../components/OopTable';
import {inject} from '../../../common/inject';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
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
  const { form, loading, visible, title, onModalCancel, onModalSubmit, formEntity} = props;
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
    <Modal title={title} visible={visible} footer={footer} onCancel={cancelForm}>
      <Spin spinning={loading}>
        <Form>
          <div>
            {form.getFieldDecorator('id', {
              initialValue: formEntity.id,
            })(
              <Input type="hidden" />
            )}
          </div>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {form.getFieldDecorator('name', {
              initialValue: formEntity.name,
              rules: [{ required: true, message: '名称不能为空' }],
            })(
              <Input placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="问卷模板"
          >
            {form.getFieldDecorator('type', {
              initialValue: formEntity.type,
              rules: [{ required: true, message: '请选择模板' }],
            })(<Select
                placeholder="请选择">
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {form.getFieldDecorator('description', {
              initialValue: formEntity.description
            })(
              <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 5 }} />
            )}
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  )
});

@inject(['${modelName}', 'global'])
@connect(({ ${modelName}, global, loading }) => ({
  ${modelName},
  global,
  loading: loading.models.${modelName},
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Manager extends React.PureComponent {
  state = {
    modalFormVisible: false,
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = (param = {})=>{
    const {pagination} = param;
    this.oopSearch.load({
      pagination
    })
  }
  handleCreate = ()=>{
    this.setModalFormVisible(true);
  }
  handleEdit = (record)=>{
    this.props.dispatch({
      type: '${modelName}/fetchById',
      payload: record.id,
    });
    this.setModalFormVisible(true);
  }
  handleRemove = (record)=>{
    this.props.dispatch({
      type: '${modelName}/remove',
      payload: record.id,
      callback: (res)=>{
        oopToast(res, '删除成功', '删除失败');
        this.onLoad();
      }
    });
  }
  handleBatchRemove = (items) => {
    const me = this;
    Modal.confirm({
      title: '提示',
      content: \`确定删除选中的\$\{items.length\}条数据吗\`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: '${modelName}/batchRemove',
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
  handleModalCancel = (form)=>{
    this.setModalFormVisible(false);
    setTimeout(()=>{
      form.resetFields();
      this.props.dispatch({
        type: '${modelName}/clearEntity'
      });
    }, 300)
  }
  handleModalSubmit = (values)=>{
    this.props.dispatch({
      type: '${modelName}/saveOrUpdate',
      payload: values,
      callback: (res)=>{
        oopToast(res, '保存成功', '保存失败');
        this.onLoad();
      }
    });
  }
  setModalFormVisible = (flag) =>{
    this.setState({modalFormVisible: flag})
  }
  render() {
    const {${modelName}: {entity, templateList}, loading,
      global: { oopSearchGrid, size }, gridLoading } = this.props;
    const columns = [
      {title: '名称', dataIndex: 'name'},
      {title: '创建时间', dataIndex: 'createDate'},
      {title: '发布时间', dataIndex: 'publishDate'},
      {title: '问卷状态', dataIndex: 'status'},
    ];
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.handleCreate() }
      },
      {
        text: '删除',
        name: 'batchDelete',
        icon: 'delete',
        display: items=>(items.length > 0),
        onClick: (items)=>{ this.handleBatchRemove(items) }
      },
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
          moduleName="${modelName.toLocaleLowerCase()}"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
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
          title={entity.id ? '编辑问卷' : '新建问卷'}
          onModalCancel={this.handleModalCancel}
          onModalSubmit={this.handleModalSubmit}
          formEntity={entity}
          templateList={templateList}
          loading={!!loading}
        />
      </PageHeaderLayout>)
  }
}
