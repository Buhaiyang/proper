import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Table, Card, Divider, Popconfirm, Form, Modal, Button, Input, Radio, InputNumber } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import OSearch from '../../components/Osearch';
import { inject } from '../../common/inject';
import styles from './Demo.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const ModalForm = Form.create()((props)=>{
  const { form, visible, handleModalVisible } = props;
  const { getFieldDecorator, validateFields, getFieldValue} = form;
  const onOk = ()=>{
    validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      handleModalVisible(false);
    });
  };
  const onCancel = ()=>{
    handleModalVisible(false);
  };
  const menu = {};
  return (
    <Modal onOk={onOk} visible={visible} onCancel={onCancel} title="新建" destroyOnClose={true}>
      <Form>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="菜单名称"
        >
          {getFieldDecorator('menuName', {
            initialValue: menu.menuName,
            rules: [{
              required: true, message: '菜单名称不能为空',
            }],
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="菜单链接"
        >
          {getFieldDecorator('menuUrl', {
            initialValue: menu.menuUrl,
            // rules: [ {
            //   required: true, message: '菜单链接不能为空',
            // }],
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="是否子菜单"
        >
          {getFieldDecorator('isLeaf', {
            initialValue: menu.isLeaf || '1'
          })(
            <RadioGroup>
              <Radio value="1">是</Radio>
              <Radio value="0">否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="是否设置待办"
        >
          {getFieldDecorator('isGtask', {
            initialValue: menu.isGtask || '1'
          })(
            <RadioGroup>
              <Radio value="0">是</Radio>
              <Radio value="1">否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {getFieldValue('isGtask') === '0' && (
          <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="待办类型" >
          {getFieldDecorator('gTaskType', {
            initialValue: menu.gTaskType,
            rules: [{
              required: true, message: '待办类型不能为空',
            }],
          })(
            <Input placeholder="待办类型" />
          )}
          </FormItem>
        )}
        {getFieldValue('isGtask') === '0' && (
          <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="待办链接" >
         {getFieldDecorator('gTaskUrl', {
           initialValue: menu.gTaskUrl,
           rules: [{
             required: true, message: '待办链接不能为空',
           }],
         })(
           <Input placeholder="待办链接" />
         )}
          </FormItem>
        )}
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          label="排序"
        >
          {getFieldDecorator('sortId', {
            initialValue: menu.sortId,
            rules: [{
              required: true, message: '排序不能为空',
            }],
          })(
            <InputNumber min={1} max={999} />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});
@inject(['demo', 'global'])
@connect(({demo, global, loading})=>({
  demo,
  global,
  loading: loading.models.demo
}))
export default class Demo extends React.PureComponent {
  state = {
    modalVisible: false,
    selectedRowKeys: []
  }
  componentDidMount() {
    this.props.dispatch({type: 'demo/fetch'});
  }
  onChange = (pagination, filters, sorter) => {
    console.log(pagination, sorter);
    this.props.dispatch({
      type: 'demo/fetch',
      payload: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        extraParams: pagination.extraParams,
      }
    });
  }
  onEdit = (record)=>{
    console.log('edit', record);
  }
  onDelete = (record)=>{
    console.log('delete', record);
  }
  rowSelectionChange = (selectedRowKeys, selectedRows)=>{
    this.setState({
      selectedRowKeys
    });
    console.log(selectedRows);
  }
  batchDelete = ()=> {
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${this.state.selectedRowKeys.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>{
        console.log(this.state.selectedRowKeys);
      }
    });
  }
  onSearchResult = (param)=> {
    const { demo: { data: { pagination = {}}} } = this.props;
    this.props.dispatch({
      type: 'demo/fetch',
      payload: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        extraParams: param,
      }
    });
  }
  onSuggest = (query, matchStr)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'global/queryData',
      payload: matchStr
    });
  }
  handleModalVisible = (flag)=>{
    this.setState({
      modalVisible: flag
    });
  }
  render() {
    const { demo: {data: {list, pagination}}, loading, global: {searchOptions, size }} = this.props;
    const column = [
      {title: '所属机构', dataIndex: 'belong_name'},
      {title: '姓名', dataIndex: 'person_name'},
      {title: '身份证', dataIndex: 'id_card_no'},
      {title: '性别', dataIndex: 'sex_value'},
      {title: '学历', dataIndex: 'education_background'},
      {title: '编号', dataIndex: 'job_number'},
      {title: '合同类型', dataIndex: 'organization_name'},
      {title: '操作', render: (text, record)=>(
          <Fragment>
            <a onClick={()=>this.onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            {<Popconfirm title="是否要删除此行？" onConfirm={() => this.onDelete(record)}>
              <a>删除</a>
             </Popconfirm>}
          </Fragment>
      )}
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    };
    const rowSelectionCfg = {
      onChange: this.rowSelectionChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      })
    };
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
            <div className={styles.toolbar}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
              {this.state.selectedRowKeys.length > 0 && (<Button icon="delete" onClick={() => this.batchDelete()}>删除</Button>)}
            </div>
            <Table
                   dataSource={list}
                   rowKey={record=>record.id_card_no}
                   rowSelection={rowSelectionCfg}
                   columns={column}
                   loading={loading}
                   pagination={paginationProps}
                   onChange={this.onChange}
                   size={size} />
        </Card>
        <ModalForm visible={this.state.modalVisible} handleModalVisible={this.handleModalVisible} />
      </PageHeaderLayout>);
  }
}

