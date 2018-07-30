import React, {Fragment} from 'react';
import {connect} from 'dva';
import { Tabs,
  Card,
  Badge } from 'antd';
import classNames from 'classnames';
import { inject } from '../../../../framework/common/inject';
import PageHeaderLayout from '../../../../framework/components/PageHeaderLayout';
import { oopToast } from '../../../../framework/common/oopUtils';
import OopSearch from '../../../components/OopSearch';
import OopTable from '../../../components/OopTable';
import OopWorkflowMainModal from '../../../components/OopWorkflowMainModal';
import styles from './Manager.less';

const { TabPane } = Tabs;

function toArray(children) {
  const c = [];
  React.Children.forEach(children, (child) => {
    if (child) {
      c.push(child);
    }
  });
  return c;
}

function getActiveIndex(children, activeKey) {
  const c = toArray(children);
  for (let i = 0; i < c.length; i++) {
    if (c[i].key === activeKey) {
      return i;
    }
  }
  return -1;
}

@inject(['workflowManager', 'workflowDesigner', 'global'])
@connect(({workflowManager, workflowDesigner, global, loading}) => ({
  workflowManager,
  workflowDesigner,
  global,
  loading: loading.models.workflowManager,
  gridLoading: loading.effects['global/oopSearchResult']
}))
export default class Manager extends React.PureComponent {
  state = {
    activeKey: 'task',
    activeIndex: 0,
    task: {},
    design: {},
    process: {},
    wfVisible: false,
    isLaunch: false,
    taskOrProcDefKey: null,
    businessObj: null,
    procInstId: null
  }

  componentDidMount() {
    this.fetchTask();
  }

  fetchTask = () => {
    const self = this;
    this.props.dispatch({
      type: 'workflowManager/findTask',
      payload: {
        pageNo: 1,
        pageSize: 100
      },
      callback: () => {
        const { workflowManager } = self.props;
        this.setState({
          task: workflowManager.task
        });
      }
    });
  }

  fetchDesign = () => {
    const self = this;
    this.props.dispatch({
      type: 'workflowManager/findDesign',
      payload: {
        pageNo: 1,
        pageSize: 100,
        modelType: '0',
        sort: 'modifiedDesc'
      },
      callback: () => {
        const { workflowManager } = self.props;
        this.setState({
          design: workflowManager.design
        })
      }
    });
  }

  fetchProcess = () => {
    const self = this;
    this.props.dispatch({
      type: 'workflowManager/findProcess',
      payload: {
        pageNo: 1,
        pageSize: 100
      },
      callback: () => {
        const { workflowManager } = self.props;
        this.setState({
          process: workflowManager.process
        });
      }
    });
  }

  handleSearchTask = (inputValue, filter) => {
    const { workflowManager: { task } } = this.props;
    const filterList = inputValue ? filter(task.data, ['pepProcInstVOprocessDefinitionName', 'pepProcInstVOstartUserName', 'pepProcInstVOstateValue']) : task.data;
    this.setState({
      task: {
        ...task,
        data: filterList,
        total: filterList.length
      }
    });
  }

  handleSearchDesign = (inputValue, filter) => {
    const { workflowManager: { design } } = this.props;
    const filterList = inputValue ? filter(design.data, ['name', 'processVersion']) : design.data;
    this.setState({
      design: {
        ...design,
        data: filterList,
        total: filterList.length
      }
    });
  }

  handleSearchProcess = (inputValue, filter) => {
    const { workflowManager: { process } } = this.props;
    const filterList = inputValue ? filter(process.data, ['processDefinitionName', 'stateValue']) : process.data;
    this.setState({
      process: {
        ...process,
        data: filterList,
        total: filterList.length
      }
    });
  }

  handleTabsChange = (key) => {
    const self = this;
    const { children } = this.tabs.props
    let activeIndex = getActiveIndex(children, key);
    if (activeIndex === -1) {
      activeIndex = 0;
    }
    this.setState({
      activeKey: key,
      activeIndex
    }, () => {
      if (key === 'task') {
        self.fetchTask();
      } else if (key === 'design') {
        self.fetchDesign();
      } else if (key === 'process') {
        self.fetchProcess();
      }
    });
  }
  handleProcessDeployed = (record)=>{
    console.log('handleProcessDeployed', record);
    this.props.dispatch({
      type: 'workflowDesigner/repository',
      payload: record.id,
      callback: (res) => {
        oopToast(res, '部署成功', '部署失败');
        this.fetchDesign();
      }
    });
  }
  handleProcessLaunch = (record)=>{
    console.log('handleProcessLaunch', record);
    const {key, startFormKey} = record;
    this.setState({
      wfVisible: true,
      isLaunch: true,
      taskOrProcDefKey: key,
      businessObj: {
        formKey: startFormKey
      },
      name: '流程发起'
    })
  }
  handleProcessSubmit = (record)=>{
    console.log('handleProcessSubmit', record)
    const {taskId, form, procInstId, name} = record;
    this.setState({
      wfVisible: true,
      isLaunch: false,
      taskOrProcDefKey: taskId,
      procInstId,
      businessObj: {...form, formTitle: `${record.pepProcInstVOstartUserName}的${record.pepProcInstVOprocessDefinitionName}`},
      name,
      stateCode: undefined
    })
  }
  handleProcessView = (record)=>{
    console.log('handleProcessView', record);
    const {procInstId, processDefinitionId, stateCode} = record;
    this.props.dispatch({
      type: 'workflowManager/findBusinessObj',
      payload: procInstId,
      callback: (res) => {
        console.log(res);
        const businessObj = res.length ? res[0] : null;
        this.setState({
          wfVisible: true,
          isLaunch: false,
          taskOrProcDefKey: null,
          procInstId,
          businessObj,
          name: null,
          processDefinitionId,
          stateCode
        })
      }
    });
  }
  closeProcessModal = ()=>{
    this.setState({
      wfVisible: false
    })
  }
  afterProcessSubmit = ()=>{
    this.handleTabsChange(this.state.activeKey);
  }
  render() {
    const {
      loading,
      global: { size },
    } = this.props;
    const {
      task,
      design,
      process,
      activeKey,
      activeIndex
    } = this.state;
    const column = {
      task: [
        {title: '名称', dataIndex: 'pepProcInstVOprocessDefinitionName'},
        {title: '发起时间', dataIndex: 'pepProcInstVOcreateTime'},
        {title: '发起人', dataIndex: 'pepProcInstVOstartUserName'},
        {title: '当前处理情况', dataIndex: 'pepProcInstVOstateValue', render: (val, record) => {
          return (
            <Fragment><div>{val}</div><div>到达时间:{record.createTime}</div></Fragment>
          );
        }},
      ],
      design: [
        {title: '名称', dataIndex: 'name'},
        // {title: '标识', dataIndex: 'pepProcInstVOstateValue'},
        {title: '创建时间', dataIndex: 'created'},
        {title: '更新时间', dataIndex: 'lastUpdated'},
        {title: '部署时间', dataIndex: 'deploymentTime'},
        {title: '版本号', dataIndex: 'processVersion'},
        {title: '部署状态', dataIndex: 'status', render: (val) => {
          return (
            <Badge
              status={ val ? (val.code === 'UN_DEPLOYED' ? 'default' : (val.code === 'DEPLOYED' ? 'success' : (val.code === '2' ? 'processing' : 'error'))) : 'default' }
              text={ val ? val.name : '未部署' }
              className={styles.status} />
          );
        }},
      ],
      process: [
        {title: '名称', dataIndex: 'processDefinitionName'},
        {title: '发起时间', dataIndex: 'createTime'},
        {title: '流程状态', dataIndex: 'stateValue'},
      ]
    }

    const actionLaunchColumn = [
      {
        text: '流程部署',
        name: 'deployed',
        icon: 'api',
        confirm: '确定部署吗？',
        onClick: (record)=>{ this.handleProcessDeployed(record) },
        display: record=> record.status.code === 'UN_DEPLOYED'
      },
      {
        text: '流程发起',
        name: 'view',
        icon: 'select',
        onClick: (record)=>{ this.handleProcessLaunch(record) },
        display: record=> record.status.code === 'DEPLOYED'
      }
    ];
    const actionSubmitColumn = [
      {
        text: '流程办理',
        name: 'view',
        icon: 'select',
        onClick: (record)=>{ this.handleProcessSubmit(record) }
      }
    ];
    const actionViewColumn = [
      {
        text: '流程查看',
        name: 'view',
        icon: 'select',
        onClick: (record)=>{ this.handleProcessView(record) }
      }
    ];

    return (
      <PageHeaderLayout content={
        <Tabs animated={false} defaultActiveKey="task" onChange={this.handleTabsChange} ref={(el)=>{ this.tabs = el }}>
          <TabPane key="task" tab="待办" />
          <TabPane key="design" tab="发起" />
          <TabPane key="process" tab="发起历史" />
          <TabPane key="4" disabled tab="已处理流程" />
          <TabPane key="5" disabled tab="流程草稿箱" />
        </Tabs>
      }>
        <Card bordered={false}>
          <div className={classNames(styles.tabsContent, styles.tabsContentAnimated)} style={{marginLeft: `${-activeIndex * 100}%`}}>
            <div className={classNames(styles.tabsTabpane,
                              {
                                [styles.tabsTabpaneActive]: (activeKey === 'task'),
                                [styles.tabsTabpaneInactive]: (activeKey !== 'task')
                              }
                            )}>
              <OopSearch
                placeholder="请输入"
                enterButtonText="搜索"
                onInputChange={this.handleSearchTask}
                ref={(el) => { this.taskSearch = el && el.getWrappedInstance() }}
              />
              <OopTable
                rowKey="taskId"
                grid={{list: task.data}}
                columns={column[activeKey]}
                loading={loading}
                size={size}
                rowButtons={actionSubmitColumn}
                checkable={false}
                pagination={{total: task.total}}
              />
            </div>
            <div className={classNames(styles.tabsTabpane,
                              {
                                [styles.tabsTabpaneActive]: (activeKey === 'design'),
                                [styles.tabsTabpaneInactive]: (activeKey !== 'design')
                              }
                            )}>
              <OopSearch
                placeholder="请输入"
                enterButtonText="搜索"
                onInputChange={this.handleSearchDesign}
                ref={(el) => { this.designSearch = el && el.getWrappedInstance() }}
              />
              <OopTable
                grid={{list: design.data}}
                columns={column[activeKey]}
                loading={loading}
                size={size}
                rowButtons={actionLaunchColumn}
                checkable={false}
                pagination={{total: design.total}}
              />
            </div>
            <div className={classNames(styles.tabsTabpane,
                              {
                                [styles.tabsTabpaneActive]: (activeKey === 'process'),
                                [styles.tabsTabpaneInactive]: (activeKey !== 'process')
                              }
                            )}>
              <OopSearch
                placeholder="请输入"
                enterButtonText="搜索"
                onInputChange={this.handleSearchProcess}
                ref={(el) => { this.taskSearch = el && el.getWrappedInstance() }}
              />
              <OopTable
                rowKey="procInstId"
                grid={{list: process.data}}
                columns={column[activeKey]}
                loading={loading}
                size={size}
                rowButtons={actionViewColumn}
                checkable={false}
                pagination={{total: process.total}}
              />
            </div>
          </div>
        </Card>

        <OopWorkflowMainModal
          name={this.state.name}
          isLaunch={this.state.isLaunch}
          visible={this.state.wfVisible}
          closeModal={this.closeProcessModal}
          afterProcessSubmit={this.afterProcessSubmit}
          businessObj={this.state.businessObj}
          taskOrProcDefKey={this.state.taskOrProcDefKey}
          procInstId={this.state.procInstId}
          processDefinitionId={this.state.processDefinitionId}
          stateCode={this.state.stateCode}
        />
      </PageHeaderLayout>
    );
  }
}
