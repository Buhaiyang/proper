/**
 * @author denggy
 * @desc 机构管理
 */
import React, { PureComponent, Fragment } from 'react';
import {connect} from 'dva';
import { Form, Modal, Button, Input, Spin, TreeSelect } from 'antd';
import {inject} from '../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/Oopsearch';
import OopTreeTable from '../../../components/OopTreeTable';
import styles from './Organization.less';
import { oopToast } from './../../../common/oopUtils';

const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const FuncBasicInfoForm = Form.create()((props) => {
  const {form, organizationInfo, parentTreeData, loading} = props;
  const {getFieldDecorator} = form;
  return (
    <Spin spinning={loading}>
      <Form>
        <div>
          {getFieldDecorator('id', {
            initialValue: organizationInfo.id,
          })(
            <Input type="hidden" />
          )}
        </div>
        <FormItem
          {...formItemLayout}
          label="部门名称"
        >
          {getFieldDecorator('name', {
            initialValue: organizationInfo.name,
            rules: [{
              required: true, message: '部门名称不能为空',
            }],
          })(
            <Input placeholder="请输入部门名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门简称"
        >
          {getFieldDecorator('alias', {
            initialValue: organizationInfo.alias,
            rules: [{
              required: true, message: '部门简称不能为空',
            }],
          })(
            <Input placeholder="请输入部门简称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门编码"
        >
          {getFieldDecorator('number', {
            initialValue: organizationInfo.number,
            rules: [{
              required: true, message: '部门编码不能为空',
            }],
          })(
            <Input placeholder="请输入部门编码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门地址"
        >
          {getFieldDecorator('address', {
            initialValue: organizationInfo.address,
            rules: [{
              required: true, message: '部门地址不能为空',
            }],
          })(
            <Input placeholder="请输入部门地址" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门电话"
        >
          {getFieldDecorator('phone', {
            initialValue: organizationInfo.phone,
            rules: [{
              required: true, message: '部门电话不能为空',
            }],
          })(
            <Input placeholder="请输入部门电话" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门传真"
        >
          {getFieldDecorator('fax', {
            initialValue: organizationInfo.fax,
            rules: [{
              required: true, message: '部门传真不能为空',
            }],
          })(
            <Input placeholder="请输入部门传真" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上级部门"
        >
          {getFieldDecorator('parentId', {
            initialValue: organizationInfo.parentId,
            rules: [{
              required: true, message: '上级部门不能为空',
            }],
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={parentTreeData}
              placeholder="请选择上级部门"
              treeDefaultExpandAll
            />
          )}
          {loading && (
            <div className={styles.selectLoading}>
              <Spin size="small" />
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门描述"
        >
          {getFieldDecorator('description', {
            initialValue: organizationInfo.description
          })(
            <TextArea placeholder="部门描述" />
          )}
        </FormItem>
      </Form>
    </Spin>);
});
const ModalForm = connect()((props) => {
  const {
    visible, currentTabKey, onSubmitForm, organizationInfo = {},
    parentTreeData, clearModalForms, loading,
  } = props;
  const onCancel = () => {
    // 隐藏窗口时
    const form = this[currentTabKey].getForm();
    clearModalForms(form);
  };
  const onOk = () => {
    const form = this[currentTabKey].getForm();
    const {validateFields} = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      const data = {
        ...fieldsValue,
        menuCode: fieldsValue.menuType
      }
      delete data.menuType
      onSubmitForm(data);
    });
  };
  const footer = (
    <Fragment>
      <Button onClick={onCancel}>取消</Button>
      {currentTabKey === 'basic' && <Button type="primary" onClick={onOk} loading={loading}>保存</Button>}
    </Fragment>);
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk} footer={footer} width={660} title="基本信息">
      <FuncBasicInfoForm
        ref={(el) => {
          this.basic = el;
        }}
        organizationInfo={organizationInfo}
        parentTreeData={parentTreeData}
        loading={loading} />
    </Modal>
  );
});
@inject(['hrmOrganization', 'global'])
@connect(({hrmOrganization, global, loading}) => ({
  hrmOrganization,
  global,
  loading: loading.models.hrmOrganization,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Organization extends PureComponent {
  state = {
    modalVisible: false,
    currentTabKey: 'basic',
    isCreate: true
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'hrmOrganization/fetchOrgTree'
    });
    this.onLoad()
  }
  handleOnSelect = (treeNode)=>{
    this.onLoad({
      parentId: treeNode[0]
    })
    this.oopTreeTable.table.clearSelection()
  }
  setModalVisible = (flag) => {
    this.setState({
      modalVisible: flag
    });
  }
  handleClearModalForms = (form)=>{
    this.setModalVisible(false)
    setTimeout(() => {
      form.resetFields();
      this.setState({
        currentTabKey: 'basic',
      });
      this.props.dispatch({
        type: 'hrmOrganization/clear'
      });
    }, 300);
  }
  handleOnSubmitForm = (data)=>{
    const me = this
    me.props.dispatch({
      type: 'hrmOrganization/createOrUpdate',
      payload: data,
      callback(res) {
        me.setState({
          isCreate: false
        });
        oopToast(res, '保存成功', '保存失败');
        me.onLoad();
        me.props.dispatch({
          type: 'hrmOrganization/fetchOrgTree'
        });
      }
    })
  }
  handleResourceListChange = (type, item)=>{
    const {dispatch, authFunc: {funcBasicInfo} } = this.props
    if (type === 'post') {
      if (item.id) {
        const data = {
          id: item.id,
          name: item.name,
          url: item.url,
          method: item.method,
        }
        dispatch({
          type: 'authFunc/updateResource',
          payload: data,
          callback(res) {
            oopToast(res, '更新成功', '更新失败');
            dispatch({
              type: 'authFunc/fetchResourceList',
              payload: funcBasicInfo.id
            })
          }
        })
      } else {
        dispatch({
          type: 'authFunc/saveResource',
          payload: {
            funcId: funcBasicInfo.id,
            resources: item,
          },
          callback(res) {
            oopToast(res, '保存成功', '保存失败');
            dispatch({
              type: 'authFunc/fetchResourceList',
              payload: funcBasicInfo.id
            })
          }
        })
      }
    } else {
      dispatch({
        type: 'authFunc/deleteResource',
        payload: item.id,
        callback(res) {
          oopToast(res, '删除成功', '删除失败');
          dispatch({
            type: 'authFunc/fetchResourceList',
            payload: funcBasicInfo.id
          })
        }
      })
    }
  }
  onLoad = (param)=>{
    let p = null
    if (Array.isArray(param) && param.length === 1) {
      p = {
        parentId: param[0]
      }
    }
    this.oopSearch.load({
      ...p,
      menuEnable: 'ALL'
    })
  }
  onBatchDelete = (items)=>{
    const me = this;
    Modal.confirm({
      title: '提示',
      content: `确定删除选中的${items.length}条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        me.props.dispatch({
          type: 'hrmOrganization/deleteOrg',
          payload: {ids: items.toString()},
          callback(res) {
            me.oopTreeTable.table.clearSelection()
            oopToast(res, '删除成功', '删除失败');
            me.onLoad()
          }
        })
      }
    });
  }
  onCreate = ()=>{
    this.setState({
      modalVisible: true,
      isCreate: true
    });
    this.props.dispatch({
      type: 'hrmOrganization/fetchParentTreeData'
    })
  }
  onDelete = (record)=>{
    const me = this
    me.props.dispatch({
      type: 'hrmOrganization/deleteOrg',
      payload: {ids: record.id},
      callback(res) {
        oopToast(res, '删除成功', '删除失败');
        me.onLoad()
      }
    })
  }
  onEdit = (record)=>{
    const me = this;
    me.setState({
      modalVisible: true,
      isCreate: false
    });
    me.props.dispatch({
      type: 'hrmOrganization/fetchParentTreeData',
      callback() {
        me.props.dispatch({
          type: 'hrmOrganization/fetchById',
          payload: record.id
        });
      }
    });
  }
  render() {
    const {
      loading,
      hrmOrganization: { treeData, organizationInfo, parentTreeData },
      gridLoading,
      global: { size, oopSearchGrid }
    } = this.props;
    const column = [
      {title: '部门名称', dataIndex: 'name'},
      {title: '部门编号', dataIndex: 'number'},
      {title: '部门电话', dataIndex: 'phone'},
      {title: '描述', dataIndex: 'description'}
    ]
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.onCreate() }
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        onClick: (items)=>{ this.onBatchDelete(items) },
        display: items=>(items.length),
      }
    ]
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.onEdit(record) },
      }, {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此行',
        onClick: (record)=>{ this.onDelete(record) },
      },
    ]
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="$hrm$organization"
          ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
        />
      }>
        <OopTreeTable
          ref={(el)=>{ this.oopTreeTable = el }}
          grid={oopSearchGrid}
          columns={column}
          gridLoading={gridLoading}
          treeLoading={loading}
          onLoad={this.onLoad}
          size={size}
          topButtons={topButtons}
          rowButtons={rowButtons}
          treeData={treeData}
          treeTitle="name"
          treeKey="id"
        />
        <ModalForm
          parentTreeData={parentTreeData}
          organizationInfo={organizationInfo}
          visible={this.state.modalVisible}
          currentTabKey={this.state.currentTabKey}
          onSubmitForm={this.handleOnSubmitForm}
          clearModalForms={this.handleClearModalForms}
          isCreate={this.state.isCreate}
          size={size}
          loading={!!loading}
          />
      </PageHeaderLayout>);
  }
}
