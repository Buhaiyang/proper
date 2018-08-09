import React, {Fragment} from 'react';
import { Modal, Card, Form, Spin, Button } from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../../framework/components/PageHeaderLayout';
import OopSearch from '../../../components/OopSearch';
import OopForm from '../../../components/OopForm';
import OopTable from '../../../components/OopTable';
import {inject} from '../../../../framework/common/inject';
import { oopToast } from '../../../../framework/common/oopUtils';
import OopSystemCurrent from '../../../components/OopSystemCurrent';

const ModalForm = Form.create()((props) => {
  const {loading, visible, title, onModalCancel, onModalSubmit, formEntity} = props;
  const submitForm = ()=>{
    const form = this.oopForm.getForm()
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onModalSubmit(fieldsValue, form);
    });
  }
  const cancelForm = ()=>{
    const form = this.oopForm.getForm()
    onModalCancel(form)
  }
  const footer = (
    <Fragment>
      <Button onClick={cancelForm}>取消</Button>
      <Button type="primary" onClick={submitForm} loading={loading}>保存</Button>
    </Fragment>);
  const formConfig = {
    formJson: [{
      name: 'id',
      component: {name: 'Input', props: {type: 'hidden'}},
      wrapper: true
    }, {
      label: '名称',
      key: 'Input',
      component: {name: 'Input', props: {placeholder: '下拉的查询项名称'}},
      name: 'vROHZEpk1a',
      rules: [{required: true, message: '此项为必填项'}]
    }, {
      label: 'URL',
      key: 'Input',
      component: {name: 'Input', props: {placeholder: '请求数据的URL'}},
      name: 'alqtQANGIM',
      rules: [{required: true, message: '此项为必填项'}]
    }, {
      label: '回显的属性值',
      key: 'Input',
      component: {name: 'Input', props: {placeholder: '回填到页面的值'}},
      name: '3HpWBS7VEi'
    }, {
      label: '排序',
      key: 'InputNumber',
      component: {name: 'InputNumber', props: {placeholder: '排序'}},
      name: 'lPTMBWvoAQ'
    }], formLayout: 'horizontal'
  }
  return (
    <Modal title={title} visible={visible} footer={footer} onCancel={cancelForm}>
      <Spin spinning={loading}>
        <OopForm {...formConfig} ref={(el)=>{ this.oopForm = el }} defaultValue={formEntity} />
      </Spin>
    </Modal>
  )
});

@inject(['formCurrentComponentSetting', 'global'])
@connect(({ formCurrentComponentSetting, global, loading }) => ({
  formCurrentComponentSetting,
  global,
  loading: loading.models.formCurrentComponentSetting,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class CurrentComponentSetting extends React.PureComponent {
  state = {
    modalFormVisible: false,
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = (param = {})=>{
    const {pagination, condition} = param;
    // this.oopSearch.load({
    //  pagination
    // });
    this.props.dispatch({
      type: 'formCurrentComponentSetting/fetch',
      payload: {
        pagination,
        ...condition
      }
    });
  }
  handleCreate = ()=>{
    this.setModalFormVisible(true);
  }
  handleEdit = (record)=>{
    this.props.dispatch({
      type: 'formCurrentComponentSetting/fetchById',
      payload: record.id,
    });
    this.setModalFormVisible(true);
  }
  handleRemove = (record)=>{
    this.props.dispatch({
      type: 'formCurrentComponentSetting/remove',
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
      content: `确定删除选中的${items.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: 'formCurrentComponentSetting/batchRemove',
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
        type: 'formCurrentComponentSetting/clearEntity'
      });
    }, 300)
  }
  handleModalSubmit = (values)=>{
    this.props.dispatch({
      type: 'formCurrentComponentSetting/saveOrUpdate',
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
    const {formCurrentComponentSetting: {entity, list}, loading,
      global: { oopSearchGrid, size }, gridLoading } = this.props;
    const {columns} = {
      columns: [{title: '名称', dataIndex: 'vROHZEpk1a'}, {
        title: 'URL',
        dataIndex: 'alqtQANGIM'
      }, {title: '回显的属性值', dataIndex: '3HpWBS7VEi'}, {title: '排序', dataIndex: 'lPTMBWvoAQ'}]
    };
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
          moduleName="formcurrentcomponentsetting"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <Card bordered={false}>
          <OopTable
            loading={loading === undefined ? gridLoading : loading}
            grid={{list} || oopSearchGrid}
            columns={columns}
            rowButtons={rowButtons}
            topButtons={topButtons}
            size={size}
            ref={(el)=>{ this.oopTable = el }}
          />
          <OopSystemCurrent value={{url: '/auth/current/user', showPropName: 'name', label: '当前登录人'}} name="currentUser" />
          <OopSystemCurrent value={{url: '/sys/current/date', label: '当前时间'}} name="currentSysDate" />
        </Card>
        <ModalForm
          visible={this.state.modalFormVisible}
          title={entity.id ? '编辑' : '新建'}
          onModalCancel={this.handleModalCancel}
          onModalSubmit={this.handleModalSubmit}
          formEntity={entity}
          loading={!!loading}
        />
      </PageHeaderLayout>);
  }
}
