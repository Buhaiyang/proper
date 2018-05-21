/**
 * @author denggy
 * @desc 功能管理
 */
import React, { PureComponent, Fragment } from 'react';
import {connect} from 'dva';
import { Tree, Form, Modal, Button, Input, Radio, Tabs, Spin, InputNumber, TreeSelect } from 'antd';
import {inject} from '../../../../common/inject';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import OopTreeTable from '../../../../components/OopTreeTable';
import TableForm from './TableForm';
import styles from './index.less';
import { oopToast } from './../../../../common/oopUtils';

const { TreeNode } = Tree;
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

const formatter = (data, id) => {
  return data.map((item) => {
    let { disabled } = item;
    if (item.id === id) {
      disabled = true;
    }
    const result = {
      ...item,
      disabled
    };
    if (item.children && item.children.length) {
      result.children = formatter(item.children, id);
    }
    return result;
  });
}

const FuncBasicInfoForm = Form.create()((props) => {
  const {form, funcBasicInfo, parentTreeData, loading, parentNode} = props;
  const {getFieldDecorator} = form;
  const onChange = (value)=>{
    console.log(value)
  }
  const data = formatter(parentTreeData, funcBasicInfo.id);
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
          label="前端路径"
        >
          {getFieldDecorator('route', {
            initialValue: funcBasicInfo.route,
            rules: [{
              required: true, message: '前端路径不能为空',
            }],
          })(
            <Input placeholder="请输入前端路径" />
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
            initialValue: (funcBasicInfo.parentId ? funcBasicInfo.parentId : parentNode),
            rules: [{
              required: true, message: '父节点不能为空',
            }],
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
              treeData={data}
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
    parentTreeData, clearModalForms, isCreate, loading, resourceList, handleResourceListChange,
    parentNode
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
      parentNode={parentNode}
      loading={loading} />
  }, {
    key: 'resource',
    tab: '资源信息',
    disabled: isCreate,
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
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={footer}
      width={800}
      destroyOnClose={true}
      className={styles.anthFuncStyles}>
      <Tabs size={size} animated={false} onChange={onTabChange} activeKey={currentTabKey}>
        {tabList.map(item =>
          <TabPane tab={item.tab} key={item.key} disabled={item.disabled}>{item.content}</TabPane>
        )}
      </Tabs>
    </Modal>
  );
});
@inject(['authFunc', 'global', 'baseUser'])
@connect(({authFunc, global, loading}) => ({
  authFunc,
  global,
  loading: loading.models.authFunc,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Func extends PureComponent {
  state = {
    tableTitle: '所有',
    modalVisible: false,
    currentTabKey: 'basic',
    isCreate: true,
    parentNode: null,
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
        currentTabKey: 'basic'
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
      callback(res) {
        me.setState({
          isCreate: false,
          parentId: data.parentId
        });
        oopToast(res, '保存成功', '保存失败');
        me.onLoad([me.state.parentId]);
        me.refreshMenusAndLeftTree();
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
        let enableBool = item.enable;
        if (item.enable === 'true') {
          enableBool = true;
        }
        if (item.enable === 'false') {
          enableBool = false;
        }
        const data = {
          id: item.id,
          name: item.name,
          url: item.url,
          method: item.method,
          identifier: item.identifier,
          enable: enableBool,
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
  onLoad = (param = {})=>{
    const currentSelectTreeNode = this.oopTreeTable.getCurrentSelectTreeNode();
    const parentId = (currentSelectTreeNode && currentSelectTreeNode.key);
    const {pagination} = param;
    this.oopTreeTable.oopSearch.load({
      pagination,
      parentId,
      menuEnable: 'ALL'
    })
    this.setParentNode(parentId)
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
          callback(res) {
            me.oopTreeTable.table.clearSelection()
            oopToast(res, '删除成功', '删除失败');
            me.onLoad([me.state.parentId]);
            me.refreshMenusAndLeftTree();
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
      type: 'authFunc/deleteFunc',
      payload: {ids: record.id},
      callback(res) {
        oopToast(res, '删除成功', '删除失败');
        me.onLoad([me.state.parentId]);
        me.refreshMenusAndLeftTree();
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
  setParentNode = (parentNode) => {
    this.setState({
      parentNode,
    });
  }
  handleTableTreeNodeSelect = ()=>{
    const treeNode = this.oopTreeTable.getCurrentSelectTreeNode();
    this.setState({
      tableTitle: treeNode.name || treeNode.title || '所有'
    })
  }
  refreshMenusAndLeftTree = ()=>{
    this.props.dispatch({
      type: 'authFunc/fetchTreeData'
    });
    this.props.dispatch({
      type: 'baseUser/fetchMenus'
    });
  }
  render() {
    const {
      loading,
      authFunc: { treeData, funcBasicInfo, parentTreeData, resourceList },
      gridLoading,
      global: { size, oopSearchGrid }
    } = this.props;
    const { parentNode, tableTitle } = this.state;
    const columns = [
      {
        title: '菜单名称', dataIndex: 'name'
      },
      {title: '前端路径', dataIndex: 'route'},
      {
        title: '状态', dataIndex: 'enable', render: (record)=>{
          if (record) {
            return '已启用';
          } else {
            return '已停用';
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
      <PageHeaderLayout>
        <OopTreeTable
          ref={(el)=>{ this.oopTreeTable = el }}
          table={{
            title: `${tableTitle}下级菜单`,
            grid: oopSearchGrid,
            columns,
            gridLoading,
            onLoad: this.onLoad,
            topButtons,
            rowButtons,
            oopSearch: {
              moduleName: 'authmenus',
              placeholder: '请输入',
              enterButtonText: '搜索'
            }
          }}
          tree={{
            title: '菜单列表',
            treeLoading: loading,
            treeData,
            treeTitle: 'name',
            treeKey: 'id',
            treeRoot: {
              key: '-1',
              title: '菜单'
            },
          }}
          size={size}
          onTableTreeNodeSelect={this.handleTableTreeNodeSelect}
        />
        <ModalForm
          resourceList={resourceList}
          funcBasicInfo={funcBasicInfo}
          parentTreeData={parentTreeData}
          parentNode={parentNode}
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
