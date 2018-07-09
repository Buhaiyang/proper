import React, {Fragment} from 'react';
import {connect} from 'dva';
import { Tabs,
  message,
  Card,
  Badge } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import OopSearch from '../../../components/OopSearch';
import OopTable from '../../../components/OopTable';
import { inject } from './../../../common/inject';
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

@inject(['workflowManager', 'global'])
@connect(({workflowManager, global, loading}) => ({
  workflowManager,
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
    process: {}
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
        pageSize: 10
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
        pageSize: 10
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
            <Fragment><div>{val}</div><div>到达时间:{record.pepProcInstVOendTime}</div></Fragment>
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

    const actionColumn = [
      {
        text: '查看',
        name: 'view',
        icon: 'select',
        onClick: (record)=>{ message.info('点击查看'); console.log(record) }
      }
    ];

    return (
      <PageHeaderLayout content={
        <Tabs defaultActiveKey="task" onChange={this.handleTabsChange} ref={(el)=>{ this.tabs = el }}>
          <TabPane key="task" tab="待处理流程" />
          <TabPane key="design" tab="可发起流程" />
          <TabPane key="process" tab="已发起流程" />
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
                rowButtons={actionColumn}
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
                rowButtons={actionColumn}
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
                rowButtons={actionColumn}
                checkable={false}
                pagination={{total: process.total}}
              />
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
