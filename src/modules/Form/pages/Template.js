import React from 'react';
import { Modal, Card, Form, Spin, Input, Radio, Select, InputNumber } from 'antd';
import {connect} from 'dva';
import OopFormDesigner from '../components/OopFormDesigner';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopTable from '../../../components/OopTable';
import {inject} from '../../../common/inject';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
// const TYPE_ENUM = [
//   {label: '问卷', value: 'QUESTION'},
//   {label: '工作流', value: 'WORKFLOW'},
// ]
const ModalFormBasic = Form.create()((props) => {
  const { form, loading, visible, title, onModalCancel, onModalSubmit, formBasic } = props;
  const submitForm = ()=>{
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onModalSubmit(fieldsValue, form);
    });
  }
  const cancelForm = ()=>{
    onModalCancel(form)
  }
  return (
    <Modal title={title} visible={visible} onOk={submitForm} onCancel={cancelForm}>
      <Spin spinning={loading}>
        <Form>
          <div>
            {form.getFieldDecorator('id', {
              initialValue: formBasic.id,
            })(
              <Input type="hidden" />
            )}
          </div>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {form.getFieldDecorator('name', {
              initialValue: formBasic.name,
              rules: [{ required: true, message: '名称不能为空' }],
            })(
              <Input placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {form.getFieldDecorator('type', {
              initialValue: formBasic.type || 'QUESTION',
            })(<Select
                showSearch
                placeholder="请选择">
                <Option value="QUESTION">问卷</Option>
                <Option value="WORKFLOW">工作流</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
          >
            {form.getFieldDecorator('version', {
              initialValue: formBasic.version || 1.0
            })(
              <InputNumber placeholder="请输入版本" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {form.getFieldDecorator('description', {
              initialValue: formBasic.description
            })(
              <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 5 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            {form.getFieldDecorator('enable', {
              initialValue: formBasic.enable == null ? true : formBasic.enable
            })(
              <RadioGroup>
                <Radio value={true}>启用</Radio>
                <Radio value={false}>停用</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  )
});

@inject(['formTemplate', 'global'])
@connect(({ formTemplate, global, loading }) => ({
  formTemplate,
  global,
  loading: loading.models.formTemplate,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Template extends React.PureComponent {
  state = {
    formDesignerModalVisible: false,
    formBasicModalVisible: false,
  }
  setFormDesignerModalVisible = (flag) =>{
    this.setState({formDesignerModalVisible: flag})
  }
  setFormBasicModalVisible = (flag) =>{
    this.setState({formBasicModalVisible: flag})
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = ()=>{
    this.props.dispatch({type: 'formTemplate/fetch'});
  }
  handleEdit = (record)=>{
    this.setFormBasicModalVisible(true);
    this.props.dispatch({
      type: 'formTemplate/fetchById',
      payload: record.id
    });
  }
  handleRemove = (record)=>{
    this.props.dispatch({
      type: 'formTemplate/remove',
      payload: record.id,
      callback: (res)=>{
        oopToast(res, '删除成功', '删除失败');
        this.onLoad();
      }
    });
  }
  handleDesign = (record)=>{
    console.log(record)
    this.setFormDesignerModalVisible(true)
  }
  handleCreate = ()=>{
    this.setFormBasicModalVisible(true)
  }
  handleModalCancel = (form)=>{
    this.setFormBasicModalVisible(false);
    setTimeout(()=>{
      form.resetFields();
      this.props.dispatch({
        type: 'formTemplate/clearEntity'
      });
    }, 300)
  }
  handleModalSubmit = (values)=>{
    this.props.dispatch({
      type: 'formTemplate/saveOrUpdate',
      payload: values,
      callback: (res)=>{
        oopToast(res, '保存成功', '保存失败');
        this.onLoad();
      }
    });
  }
  render() {
    const {formTemplate: {grid, entity}, loading, global: { size } } = this.props;
    const columns = [
      {title: '名称', dataIndex: 'name'},
      {title: '类别', dataIndex: 'type'},
      {title: '版本', dataIndex: 'version'},
      {title: '描述说明', dataIndex: 'description'},
      {title: '状态', dataIndex: 'enable', render: (text)=>{
        return text ? '已启用' : '已禁用'
      }},
    ];
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.handleCreate() }
      },
    ];
    const rowButtons = [
      {
        text: '设计表单',
        name: 'design',
        icon: 'layout',
        onClick: (record)=>{ this.handleDesign(record) }
      },
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.handleEdit(record) }
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此条信息',
        onClick: (record)=>{ this.handleRemove(record) }
      },
    ];
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <OopTable
            loading={loading}
            grid={grid}
            columns={columns}
            rowButtons={rowButtons}
            topButtons={topButtons}
            checkable={false}
            size={size}
          />
        </Card>
        <ModalFormBasic
          visible={this.state.formBasicModalVisible}
          title="表单模板"
          onModalCancel={this.handleModalCancel}
          onModalSubmit={this.handleModalSubmit}
          formBasic={entity}
          loading={loading}
           />
        <Modal
          visible={this.state.formDesignerModalVisible}
          width="90%"
          style={{top: '50px'}}
          onCancel={()=>this.setFormDesignerModalVisible(false)}>
          <OopFormDesigner />
        </Modal>
    </PageHeaderLayout>)
  }
}
