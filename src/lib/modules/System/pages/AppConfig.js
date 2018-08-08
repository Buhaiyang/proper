import React, { PureComponent, Fragment } from 'react';
import {connect} from 'dva';
import { Form, Modal, Input, Button, Select } from 'antd';
import {inject} from '../../../../framework/common/inject';
import PageHeaderLayout from '../../../../framework/components/PageHeaderLayout';
import OopTreeTable from '../../../components/OopTreeTable';
import { oopToast } from '../../../../framework/common/oopUtils';
import styles from './AppConfig.less';

const { Option } = Select;
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
const ModalForm = Form.create()((props) => {
  const { form, loading, visible, title, onModalCancel, onModalSubmit, entity, treeData } = props;
  const { getFieldDecorator } = form;
  const submitForm = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onModalSubmit(fieldsValue);
    });
  }
  const cancelForm = () => {
    onModalCancel();
  }
  const validateJson = (rule, value, callback)=>{
    if (value) {
      try {
        JSON.parse(value)
      } catch (e) {
        callback('应用数据应为json格式');
      }
    }
    callback();
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
      destroyOnClose={true}
    >
      <Form>
        <div>
          {getFieldDecorator('appId', {
            initialValue: entity.appId,
          })(
            <Input type="hidden" />
          )}
        </div>
        <FormItem
          {...formItemLayout}
          label="应用类别"
        >
          {getFieldDecorator('code', {
            initialValue: entity.code,
            rules: [{
              required: true, message: '应用类别必选',
            }],
          })(
            <Select placeholder="请选择应用类别">
              {treeData.map(item => (
                <Option value={item.code} key={item.code}>{item.typeName}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用名称"
        >
          {getFieldDecorator('name', {
            initialValue: entity.name,
            rules: [{
              required: true, message: '应用名称不能为空',
            }],
          })(
            <Input placeholder="请输入应用名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用图标"
        >
          {getFieldDecorator('icon', {
            initialValue: entity.icon,
            rules: [{
              required: true, message: '应用图标不能为空',
            }],
          })(
            <Input placeholder="请输入应用图标" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用页"
        >
          {getFieldDecorator('page', {
            initialValue: entity.page,
            rules: [{
              required: true, message: '应用页不能为空',
            }],
          })(
            <Input placeholder="请输入应用页" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用扩展"
        >
          {getFieldDecorator('style', {
            initialValue: entity.style,
          })(
            <Input placeholder="请输入应用扩展" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用数据"
        >
          {getFieldDecorator('data', {
            initialValue: entity.data,
            rules: [
              {required: true, message: '应用数据不能为空'},
              {validator: validateJson}
            ],
          })(
            <TextArea autosize placeholder="请输入应用数据" />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
});

@inject(['systemAppConfig', 'global'])
@connect(({systemAppConfig, global, loading}) => ({
  systemAppConfig,
  global,
  loading: loading.models.systemAppConfig,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class AppConfig extends PureComponent {
  state = {
    tableTitle: '全部',
    entity: {},
    modalVisible: false,
  }
  componentDidMount() {
    this.getTreeData();
    this.onLoad();
  }

  // 获取应用类别tree数据
  getTreeData = () => {
    this.props.dispatch({
      type: 'systemAppConfig/fetchTreeData'
    });
  }

  // 获取应用列表数据
  onLoad = (param = {})=>{
    const treeNode = this.oopTreeTable.getCurrentSelectTreeNode();
    const code = (treeNode && treeNode.key === '-1' ? undefined : treeNode.key);
    const {pagination} = param;
    this.oopTreeTable.oopSearch.load({
      pagination,
      code
    });
  }

  // tree组件select事件
  handleTableTreeNodeSelect = ()=>{
    const treeNode = this.oopTreeTable.getCurrentSelectTreeNode();
    this.setState({
      tableTitle: treeNode.typeName || '全部'
    });
  }

  // 新建或编辑应用配置
  createOrEditApp = (entity) => {
    if (entity) {
      this.setState({
        entity,
        modalVisible: true
      });
    } else {
      this.setState({
        modalVisible: true
      });
    }
  }

  // 关闭Modal层
  handleModalCancel = () => {
    this.setState({
      entity: {},
      modalVisible: false
    });
  }

  // 提交应用数据
  handleModalSubmit = (values) => {
    let { data } = values;
    data = data.replace(/\s+/g, '');
    const value = {
      ...values,
      data
    };
    this.props.dispatch({
      type: 'systemAppConfig/saveOrUpdate',
      payload: value,
      callback: (res)=>{
        oopToast(res, '保存成功', '保存失败');
        this.handleModalCancel();
        this.onLoad();
      }
    });
  }

  // 删除应用配置
  deleteApp = (record) => {
    const ids = Array.isArray(record) ? record.join(',') : record.appId;
    this.props.dispatch({
      type: 'systemAppConfig/deleteApp',
      payload: {ids},
      callback: (res) => {
        oopToast(res, '删除成功', '删除失败');
        this.onLoad();
      }
    });
  }
  render() {
    const {loading, systemAppConfig: { treeData },
      gridLoading, global: { size, oopSearchGrid } } = this.props;
    const { list = [] } = oopSearchGrid;
    list.forEach((item) => {
      const { data } = item;
      if (typeof data === 'object') {
        item.data = JSON.stringify(item.data, null, 2);
      }
    });
    const { tableTitle, entity, modalVisible } = this.state;
    const columns = [
      {title: '应用名称', dataIndex: 'name'},
      {title: '应用图标', dataIndex: 'icon'},
      {title: '应用页', dataIndex: 'page'},
      {title: '应用数据', dataIndex: 'data', width: 300}
    ];
    const topButtons = [
      {
        text: '新建',
        name: 'create',
        type: 'primary',
        icon: 'plus',
        onClick: ()=>{ this.createOrEditApp() }
      },
      {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        onClick: (items)=>{ this.deleteApp(items) },
        display: items=>(items.length),
      }
    ];
    const rowButtons = [
      {
        text: '编辑',
        name: 'edit',
        icon: 'edit',
        onClick: (record)=>{ this.createOrEditApp(record) },
      }, {
        text: '删除',
        name: 'delete',
        icon: 'delete',
        confirm: '是否要删除此行',
        onClick: (record)=>{ this.deleteApp(record) },
      },
    ];

    return (
      <PageHeaderLayout wrapperClassName={styles.wrapper}>
        <OopTreeTable
          ref={(el)=>{ this.oopTreeTable = el }}
          table={{
            title: `${tableTitle}应用配置`,
            grid: oopSearchGrid,
            rowKey: 'appId',
            columns,
            gridLoading,
            onLoad: this.onLoad,
            topButtons,
            rowButtons,
            oopSearch: {
              moduleName: 'systemappconfig',
              placeholder: '请输入',
              enterButtonText: '搜索'
            }
          }}
          tree={{
            showLine: true,
            title: '应用类别',
            treeLoading: loading,
            treeData,
            treeRoot: {
              key: '-1',
              title: '全部',
            },
          }}
          size={size}
          onTableTreeNodeSelect={this.handleTableTreeNodeSelect}
        />
        <ModalForm
          visible={modalVisible}
          title={entity.appId ? '编辑应用配置' : '新建应用配置'}
          onModalCancel={this.handleModalCancel}
          onModalSubmit={this.handleModalSubmit}
          entity={entity}
          loading={!!loading}
          treeData={treeData}
        />
      </PageHeaderLayout>
    )
  }
}
