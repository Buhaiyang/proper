import React, {Fragment} from 'react';
import { Modal, Card, Form, Spin, Input, Button, Radio, InputNumber, Select } from 'antd';
import {connect} from 'dva';
import { inject } from '../../../../framework/common/inject';
import PageHeaderLayout from '../../../../framework/components/PageHeaderLayout';
import { oopToast } from '../../../../framework/common/oopUtils';
import OopTreeTable from '../../../components/OopTreeTable';
import DescriptionList from '../../../../framework/components/DescriptionList';

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
const TreeForm = Form.create()((props) => {
  const { form } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values)
      }
    });
  }
  const handlePopoverC = () => {
    props.onCancel();
  }
  return (
    <Form key="form" style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8', padding: 15, borderRadius: 5}}>
          <FormItem { ...formItemLayout } key="1" label="名称">
            {form.getFieldDecorator('catalogName', {
              initialValue: props.catalogName,
              rules: [
                { required: true, whitespace: true, message: '名称不能为空', }
              ]
            })(<Input placeholder="请输入字典项内容" style={{width: 200}} />)}
          </FormItem>
          <FormItem {...formItemLayout} key="2" label="编码">
            {form.getFieldDecorator('catalogCode', {
              initialValue: props.catalogCode,
              rules: [
                { required: true, whitespace: true, pattern: /^(?![0-9]+$)[^ \u4e00-\u9fa5]+$/, message: '不能为空，且不能为纯数字', },
              ]
            })(<Input placeholder="请输入字典编码" style={{width: 200}} />)}
          </FormItem>
          {props.catalogType ? (
          <FormItem {...formItemLayout} key="3" label="类型">
            {form.getFieldDecorator('catalogType', {
              initialValue: props.catalogType,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ \u4e00-\u9fa5]+$/, message: '类型不能为空，且为非汉字', },
              ]
            })(
              <Select disabled={true} getPopupContainer={()=>document.querySelector('.ant-form')} style={{ width: '200' }} placeholder="请选择类型">
                <Select.Option key="b" value="BUSINESS">BUSINESS</Select.Option>
                <Select.Option key="s" value="SYSTEM">SYSTEM</Select.Option>
              </Select>
            )
            }
          </FormItem>) :
          (
          <FormItem {...formItemLayout} key="3" label="类型">
            {form.getFieldDecorator('catalogType', {
              initialValue: props.catalogType,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ \u4e00-\u9fa5]+$/, message: '类型不能为空，且为非汉字', },
              ]
            })(
              <Select getPopupContainer={()=>document.querySelector('.ant-form')} style={{ width: '200' }} placeholder="请选择类型">
                <Select.Option key="b" value="BUSINESS">BUSINESS</Select.Option>
                <Select.Option key="s" value="SYSTEM">SYSTEM</Select.Option>
              </Select>
            )
            }
        </FormItem>)
        }
          <FormItem {...formItemLayout} key="4" label="排序">
            {form.getFieldDecorator('sort', {
              initialValue: props.sort,
              rules: [
                { required: true, whitespace: true, pattern: /^[^ \u4e00-\u9fa5]+$/, message: '排序不能为空', },
              ]
            })(<InputNumber min={0} max={100} />)}
          </FormItem>
          <FormItem key="5" style={{marginBottom: 0}}>
            {/* <Button type="primary" htmlType="submit" size="small"> */}
            <Button style={{float: 'right'}} key="p" size="small" type="primary" onClick={handleSubmit} className="login-form-button">
              确认
            </Button>
            <Button key="s" style={{float: 'right', marginRight: 10}} size="small" onClick={handlePopoverC}>取消</Button>
          </FormItem>
    </Form>
  )
});
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
      maskClosable={false}
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
                { whitespace: true, message: '排序只可以为 1 ~ 9999 范围的数字', pattern: /^([1-9]\d{0,3})$/ }
              ]
            })(<InputNumber style={{ paddingLeft: 10}} min={0} max={9999} />)}
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
// function documentClick (event){
//   if(event.target.children[0]){
//     if(event.target.children[0].className == "index__primaryColor___BRfLf"){
//       console.log("点着了")
//     }
//   }
//   // alert(1)
// }
@inject(['systemDictionary', 'global'])
@connect(({ systemDictionary, global, loading }) => ({
  systemDictionary,
  global,
  loading: loading.models.systemDictionary,
  gridLoading: loading.effects['systemDictionary/getTableData']
}))
export default class Dictionary extends React.PureComponent {
  state = {
    tableTitle: '所有',
    modalFormVisible: false,
    visible: false,
    info: {},
    treeMenuVisible: false,
    id: null,
    catalogName: '',
    catalogCode: '',
    catalogType: '',
    sort: '',
    newTableData: {},
    pageNumShow: 1,
  }
  componentDidMount() {
    this.onLoad();
    // document.addEventListener("click",documentClick)
    this.tableInit();
  }
  // componentWillUnmount(){


  //   // document.removeEventListener("click", documentClick);
  // }
  tableInit = (pagination) =>{
    const param = {
      dataDicType: '',
      pageSize: 10
    }
    if (pagination) {
      param.pageNo = pagination.pageNo;
    } else {
      param.pageNo = 1;
    }
    this.props.dispatch({
      type: 'systemDictionary/tableInit',
      payload: param,
    });
  }
  onLoad = (param = {})=>{
    const {pagination} = param;
    this.props.dispatch({
      type: 'systemDictionary/getTreeData',
    });
    if (pagination) {
      this.setState({
        pageNumShow: pagination.pageNo
      })
      this.tableInit(pagination);
    }
  }
  handlePopoverEditSub = (values) =>{
    const {catalogName, catalogCode, catalogType, sort} = values;
    const {id} = this.state;
    // console.log(node)
    // const {id} = node.props;
    console.log(id)
    const param = [{
      catalogCode,
      catalogName,
      catalogType,
      sort
    }, id]
    this.treeListEdit(param)
    this.setState({
      treeMenuVisible: false,
      catalogName: '',
      catalogCode: '',
      catalogType: '',
      sort: '',
    })
  }
  handlePopoverAddSub = (values) =>{
    this.treeListAdd(values)
    this.setState({
      treeMenuVisible: false,
      catalogName: '',
      catalogCode: '',
      catalogType: '',
      sort: '',
    })
  }
  handlePopoverC = () =>{
    this.setState({
      treeMenuVisible: false,
    });
  }
  rightClick = (data) =>{
    const newData = {
      catalogName: data.catalogName,
      catalogCode: data.catalogCode,
      catalogType: data.catalogType,
      sort: data.sort,
      id: data.id
    }
    this.setState({
      ...newData
    });
  }
  setVisible = (state) => {
    this.setState({
      treeMenuVisible: state,
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
  treeListAdd = (record) => {
    this.props.dispatch({
      type: 'systemDictionary/treeListAdd',
      payload: record,
      callback: (res)=>{
        oopToast(res, '添加成功', '添加失败');
        this.onLoad();
      }
    })
  }
  treeListEdit = (record) => {
    this.props.dispatch({
      type: 'systemDictionary/treeListEdit',
      payload: record,
      callback: (res)=>{
        oopToast(res, '保存成功', '保存失败');
        this.onLoad();
      }
    })
  }
  treeListDelete = (record) => {
    this.props.dispatch({
      type: 'systemDictionary/treeListDelete',
      payload: record.id,
      callback: (res)=>{
        oopToast(res, '删除成功', '删除失败');
        this.onLoad();
      }
    })
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
  handleTableTreeNodeSelect = ()=>{
    const treeNode = this.oopTreeTable.getCurrentSelectTreeNode();
    this.setState({
      tableTitle: treeNode.catalogName || treeNode.title || '所有',
    })
    this.tableInit();
    this.props.dispatch({
      type: 'systemDictionary/getTableData',
      payload: treeNode.catalogCode,
    });
  }
  filterTable = (inputValue, filter) => {
    const {systemDictionary: {tableData, tableInitData} } = this.props;
    const filterTable = tableData.length > 0 ? tableData : tableInitData.data
    const tableDataFinal = inputValue ? filter(filterTable, ['catalog', 'code', 'name']) : filterTable;
    const newTableDataFinal = {list: tableDataFinal, pagination: { pageNo: 3, pageSize: 10, count: tableData.length}}
    this.setState({
      newTableData: newTableDataFinal,
    })
  }
  render() {
    const {systemDictionary: {entity, treeData, tableData, tableInitData},
      global: { size }, gridLoading } = this.props;
    const loading = false;
    const { visible, info, tableTitle, newTableData, pageNumShow } = this.state;
    const tableDataFinal = JSON.stringify(newTableData) !== '{}' ?
      newTableData : tableData.length > 0 ? {list: tableData, pagination: {
        pageNo: 1,
        pageSize: 10,
        count: tableData.length}} : {
        list: tableInitData.data,
        pagination: {
          pageNo: pageNumShow,
          pageSize: 10,
          count: tableInitData.count}};
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
        onClick: (record) => { this.handleEdit(record) },
        display: record=>(record.dataDicType !== 'SYSTEM'),
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此条信息',
        onClick: (record) => { this.deleteById(record) },
        display: record=>(record.dataDicType !== 'SYSTEM'),
      },
    ];
    const menuList = [
      {
        icon: 'folder-add',
        text: '增加',
        name: 'add',
        onClick: (record) => {
          this.treeListAdd(record)
        },
        render: (
            <TreeForm
              onSubmit={(values)=>{ this.handlePopoverAddSub(values) }}
              onCancel={()=>{ this.handlePopoverC() }}
            />)
      },
      {
        icon: 'edit',
        text: '编辑',
        name: 'edit',
        onClick: (record) => {
          this.treeListEdit(record)
        },
        render: (
              <TreeForm
              catalogType={this.state.catalogType}
              catalogName={this.state.catalogName}
              catalogCode={this.state.catalogCode}
              sort={this.state.sort}
              onSubmit={(values)=>{ this.handlePopoverEditSub(values) }}
              onCancel={()=>{ this.handlePopoverC() }}
            />)
      },
      {
        confirm: '确认删除这条信息吗？',
        icon: 'delete',
        text: '删除',
        name: 'remove',
        onClick: (record) => {
          this.treeListDelete(record)
        },
      }
    ]
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
        <OopTreeTable
          ref={(el)=>{ this.oopTreeTable = el }}
          table={{
            title: `${tableTitle}数据字典`,
            grid: tableDataFinal,
            columns,
            gridLoading,
            onLoad: this.onLoad,
            topButtons,
            rowButtons,
            oopSearch: {
              onInputChange: this.filterTable,
              placeholder: '请输入',
              enterButtonText: '搜索'
            }
          }}
          tree={{
            onRightClickConfig: {
              menuList,
              menuVisible: (state)=>{ this.setVisible(state) },
              treeMenuVisible: this.state.treeMenuVisible,
              rightClick: (data)=>{
                this.rightClick(data)
              },
            },
            title: '数据字典项',
            treeLoading: loading,
            treeData,
            treeTitle: 'catalogName',
            treeKey: 'id',
            treeRoot: {
              key: '-1',
              title: '数据字典项',
              // icon: 'laptop'
            },
          }}
          size={size}
          onTableTreeNodeSelect={this.handleTableTreeNodeSelect}
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

