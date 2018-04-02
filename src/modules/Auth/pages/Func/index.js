/**
 * @author denggy
 * @desc 功能管理
 */
import React, { PureComponent, Fragment } from 'react';
import {connect} from 'dva';
import { Tree, Form, Modal, Button, Input, Radio, Tabs, Spin, InputNumber, TreeSelect, Select, message } from 'antd';
import {inject} from '../../../../common/inject';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import OopSearch from '../../../../components/Oopsearch';
import OopTreeTable from '../../../../components/OopTreeTable';
import TableForm from './TableForm'
import styles from './index.less'

const { TreeNode } = Tree;
const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TabPane} = Tabs;
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
  const {form, funcBasicInfo, parentTreeData, loading} = props;
  const {getFieldDecorator} = form;
  const onChange = (value)=>{
    console.log(value)
  }
  return (
    <Spin spinning={loading}>
      <Form>
        <div>
          {getFieldDecorator('id', {
            initialValue: funcBasicInfo.id,
          })(
            <Input type="hidden" />
          )}
        </div>
        <FormItem
          {...formItemLayout}
          label="菜单名称"
        >
          {getFieldDecorator('name', {
            initialValue: funcBasicInfo.name,
            rules: [{
              required: true, message: '菜单名称不能为空',
            }],
          })(
            <Input placeholder="请输入菜单名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标识"
        >
          {getFieldDecorator('route', {
            initialValue: funcBasicInfo.route,
            rules: [{
              required: true, message: '标识不能为空',
            }],
          })(
            <Input placeholder="请输入标识" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图标"
        >
          {getFieldDecorator('icon', {
            initialValue: funcBasicInfo.icon,
            rules: [{
              required: true, message: '图标',
            }],
          })(
            <Input placeholder="请输入图标" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="同级排序"
        >
          {getFieldDecorator('sequenceNumber', {
            initialValue: funcBasicInfo.sequenceNumber,
            rules: [{
              required: true, message: '同级排序不能为空',
            }],
          })(
            <InputNumber placeholder="请输入同级排序" min={1} max={999} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="父节点"
        >
          {getFieldDecorator('parentId', {
            initialValue: funcBasicInfo.parentId,
            rules: [{
              required: true, message: '父节点不能为空',
            }],
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={parentTreeData}
              placeholder="请选择父节点"
              treeDefaultExpandAll
              onChange={onChange}
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
          label="菜单类型"
        >
          {getFieldDecorator('menuType', {
            initialValue: funcBasicInfo.menuCode,
            rules: [{
              required: true, message: '菜单类型不能为空',
            }]
          })(
            <Select placeholder="菜单类型" >
              <Option value="2">功能</Option>
              <Option value="1">页面</Option>
              <Option value="0">系统</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('enable', {
            initialValue: funcBasicInfo.enable == null ? true : funcBasicInfo.enable
          })(
            <RadioGroup>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>停用</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="功能描述"
        >
          {getFieldDecorator('description', {
            initialValue: funcBasicInfo.description
          })(
            <TextArea placeholder="功能描述" />
          )}
        </FormItem>
      </Form>
    </Spin>);
});
const ResourceInfoForm = Form.create()((props) => {
  const {resourceList, loading, handleResourceListChange} = props;
  const onChange = (type, item)=>{
    handleResourceListChange(type, item)
  }
  return (
    <TableForm
      value={resourceList}
      onChange={onChange}
      loading={loading}
      size="small"
  />)
});
const ModalForm = connect()((props) => {
  const {
    visible, size, handleTabChange, currentTabKey, onSubmitForm, funcBasicInfo = {},
    parentTreeData, clearModalForms, isCreate, loading, resourceList, handleResourceListChange
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
      onSubmitForm(fieldsValue);
    });
  };
  const onTabChange = (activeKey) => {
    handleTabChange(activeKey);
  };
  const tabList = [{
    key: 'basic',
    tab: '基本信息',
    disabled: false,
    content: <FuncBasicInfoForm
      ref={(el) => {
        this.basic = el;
      }}
      funcBasicInfo={funcBasicInfo}
      parentTreeData={parentTreeData}
      loading={loading} />
  }, {
    key: 'resource',
    tab: '资源信息',
    disabled: isCreate || !funcBasicInfo.enable,
    content: <ResourceInfoForm
      ref={(el) => {
        this.resource = el;
      }}
      loading={loading}
      resourceList={resourceList}
      handleResourceListChange={handleResourceListChange} />
  }];
  const footer = (
    <Fragment>
      <Button onClick={onCancel}>取消</Button>
      {currentTabKey === 'basic' && <Button type="primary" onClick={onOk} loading={loading}>保存</Button>}
    </Fragment>);
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk} footer={footer} width={660} >
      <Tabs size={size} animated={false} onChange={onTabChange} activeKey={currentTabKey}>
        {tabList.map(item =>
          <TabPane tab={item.tab} key={item.key} disabled={item.disabled}>{item.content}</TabPane>
        )}
      </Tabs>
    </Modal>
  );
});
@inject(['authFunc', 'global'])
@connect(({authFunc, global, loading}) => ({
  authFunc,
  global,
  loading: loading.models.authFunc,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Func extends PureComponent {
  state = {
    modalVisible: false,
    currentTabKey: 'basic',
    isCreate: true
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'authFunc/fetchTreeData'
    });
    this.onLoad()
  }
  renderTreeNodes = (data)=>{
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
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
        type: 'authFunc/clear'
      });
    }, 300);
  }
  handleOnSubmitForm = (data)=>{
    const me = this
    me.props.dispatch({
      type: 'authFunc/saveOrUpdateFunc',
      payload: data,
      callback(param) {
        me.setState({
          isCreate: false
        });
        param ? message.success('保存成功') : message.error('保存失败');
        me.onLoad();
        me.props.dispatch({
          type: 'authFunc/fetchTreeData'
        });
      }
    })
  }
  handleTabChange = (activeKey)=>{
    const {dispatch, authFunc: {resourceList, funcBasicInfo} } = this.props
    this.setState({
      currentTabKey: activeKey
    });
    if (activeKey === 'resource' && resourceList.length === 0) {
      dispatch({
        type: 'authFunc/fetchResourceList',
        payload: funcBasicInfo.id
      })
    }
  }
  handleResourceListChange = (type, item)=>{
    const {dispatch, authFunc: {funcBasicInfo} } = this.props
    if (type === 'post') {
      if (item.id) {
        dispatch({
          type: 'authFunc/updateResource',
          payload: item,
          callback() {
            message.success('更新成功')
          }
        })
      } else {
        dispatch({
          type: 'authFunc/saveResource',
          payload: {
            funcId: funcBasicInfo.id,
            resources: item,
          },
          callback() {
            message.success('保存成功')
          }
        })
      }
    } else {
      dispatch({
        type: 'authFunc/deleteResource',
        payload: item.id,
        callback() {
          message.success('删除成功')
        }
      })
    }
    dispatch({
      type: 'authFunc/fetchResourceList',
      payload: funcBasicInfo.id
    })
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
      enable: 'funcEnable'
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
          type: 'authFunc/deleteFunc',
          payload: {ids: items.toString()},
          callback() {
            me.oopTreeTable.table.clearSelection()
            message.success('删除成功');
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
      type: 'authFunc/fetchParentTreeData'
    })
  }
  onDelete = (record)=>{
    const me = this
    me.props.dispatch({
      type: 'authFunc/deleteUsers',
      payload: {ids: record.id},
      callback() {
        message.success('删除成功');
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
      type: 'authFunc/fetchParentTreeData',
      callback() {
        me.props.dispatch({
          type: 'authFunc/fetchById',
          payload: record.id
        });
      }
    });
  }
  render() {
    const {
      loading,
      authFunc: { treeData, funcBasicInfo, parentTreeData, resourceList },
      gridLoading,
      global: { size, oopSearchGrid }
    } = this.props;
    const column = [
      {
        title: '菜单名称', dataIndex: 'name'
      },
      {title: '标识', dataIndex: 'route'},
      {title: '菜单类别', dataIndex: 'menuType', render: (record)=>{
        if (record) {
          const { code } = record
          if (code === '0') {
            return '应用';
          } else if (code === '1') {
            return '页面';
          } else if (code === '2') {
            return '功能';
          }
        }
      }},
      {
        title: '状态', dataIndex: 'enable', render: (record)=>{
          if (record) {
            return '已启用';
          } else {
            return '已禁用';
          }
        }
      }
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
        onClick: (record)=>{ this.onEdit(record) },
        display: record=>(!record.superuser)
      }, {
        text: '删除',
        name: 'delete',
        confirm: '是否要删除此行',
        onClick: (record)=>{ this.onDelete(record) },
        display: record=>(!record.superuser)
      },
    ]
    return (
      <PageHeaderLayout content={
        <OopSearch
          placeholder="请输入"
          enterButtonText="搜索"
          moduleName="$auth$menus"
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
        />
        <ModalForm
          resourceList={resourceList}
          funcBasicInfo={funcBasicInfo}
          parentTreeData={parentTreeData}
          visible={this.state.modalVisible}
          currentTabKey={this.state.currentTabKey}
          handleTabChange={this.handleTabChange}
          onSubmitForm={this.handleOnSubmitForm}
          clearModalForms={this.handleClearModalForms}
          isCreate={this.state.isCreate}
          size={size}
          loading={!!loading}
          handleResourceListChange={this.handleResourceListChange} />
      </PageHeaderLayout>);
  }
}
