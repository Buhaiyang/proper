import React from 'react';
import { List, Icon, Tabs, Badge } from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import classNames from 'classnames';
import {inject} from '../../../common/inject';
import styles from './index.less';

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
export default class Workflow extends React.PureComponent {
  state = {
    activeKey: 'task',
    activeIndex: 0,
    task: {},
    design: {},
    process: {},
  }

  componentDidMount() {
    // 通知上层window此页面为h5的主页 root会触发返回按钮为原生的back事件
    window.parent.postMessage('root', '*');
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
      activeIndex,
      task: {},
      design: {},
      process: {},
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
  handleProcessLaunch = (record)=>{
    console.log('handleProcessLaunch', record);
    const {key, startFormKey} = record;
    const param = encodeURIComponent(JSON.stringify({
      isLaunch: true,
      taskOrProcDefKey: key,
      businessObj: {
        formKey: startFormKey
      },
      name: '流程发起'
    }));
    this.props.dispatch(routerRedux.push(`/customframe/workflowMainPop?param=${param}`));
  }
  handleProcessSubmit = (record)=>{
    console.log('handleProcessSubmit', record)
    const {taskId, form, procInstId, name} = record;
    const param = encodeURIComponent(JSON.stringify({
      isLaunch: false,
      taskOrProcDefKey: taskId,
      procInstId,
      name,
      businessObj: {...form, formTitle: `${record.pepProcInstVOstartUserName}的${record.pepProcInstVOprocessDefinitionName}`},
      stateCode: undefined
    }));
    this.props.dispatch(routerRedux.push(`/customframe/workflowMainPop?param=${param}`));
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
        const param = encodeURIComponent(JSON.stringify({
          isLaunch: false,
          taskOrProcDefKey: null,
          procInstId,
          businessObj,
          name: null,
          processDefinitionId,
          stateCode
        }));
        this.props.dispatch(routerRedux.push(`/customframe/workflowMainPop?param=${param}`));
      }
    });
  }
  afterProcessSubmit = ()=>{
    this.handleTabsChange(this.state.activeKey);
  }
  render() {
    const {
      loading,
    } = this.props;
    const {
      task,
      design,
      process,
      activeKey,
      activeIndex
    } = this.state;

    return (
      <div className={styles.container}>
        <Tabs
          animated={false}
          defaultActiveKey="task"
          className={styles.tabs}
          onChange={this.handleTabsChange}
          ref={(el)=>{ this.tabs = el }}>
          <TabPane key="task" tab="待办" />
          <TabPane key="design" tab="发起" />
          <TabPane key="process" tab="发起历史" />
        </Tabs>
        <div className={classNames(styles.tabsContent, styles.tabsContentAnimated)} style={{marginLeft: `${-activeIndex * 100}%`}}>
          <div className={classNames(styles.tabsTabpane,
                            {
                              [styles.tabsTabpaneActive]: (activeKey === 'task'),
                              [styles.tabsTabpaneInactive]: (activeKey !== 'task')
                            }
                          )}>
            <List
              itemLayout="horizontal"
              dataSource={task.data}
              loading={loading}
              renderItem={item => (
                <div className={styles.listItemWrapper}>
                  <div className={styles.listLine}>
                    <a onClick={ (event)=>{ this.handleProcessSubmit(item, event) }}>
                      <List.Item actions={[<Icon type="right" />]}>
                        <List.Item.Meta
                          title={item.pepProcInstVOprocessDefinitionName}
                          description={<div><div>{item.pepProcInstVOcreateTime}</div><div><span>发起人: </span><span>{item.pepProcInstVOstartUserName}</span></div></div>}
                        />
                        <div className={styles.listContent}>
                          {item.pepProcInstVOstateValue}
                        </div>
                      </List.Item>
                    </a>
                  </div>
                </div>
              )}
            />
          </div>
          <div className={classNames(styles.tabsTabpane,
                            {
                              [styles.tabsTabpaneActive]: (activeKey === 'design'),
                              [styles.tabsTabpaneInactive]: (activeKey !== 'design')
                            }
                          )}>
            <List
              itemLayout="horizontal"
              dataSource={design.data}
              loading={loading}
              renderItem={item => (
                <div className={styles.listItemWrapper}>
                  <div className={styles.listLine}>
                    <a onClick={ (event)=>{ this.handleProcessLaunch(item, event) }}>
                      <List.Item actions={[<Icon type="right" />]}>
                        <List.Item.Meta
                          title={item.name}
                          description={item.lastUpdated}
                        />
                        <div>
                          <Badge
                            status={
                              item.status ?
                                (item.status.code === 'UN_DEPLOYED' ?
                                  'default' :
                                    (item.status.code === 'DEPLOYED' ?
                                      'success' :
                                      (item.status.code === '2' ? 'processing' : 'error')
                                    )
                                ) : 'default'
                            }
                            text={ item.status ? item.status.name : '未部署' }
                            className={styles.status} />
                        </div>
                      </List.Item>
                    </a>
                  </div>
                </div>
              )}
            />
          </div>
          <div className={classNames(styles.tabsTabpane,
                            {
                              [styles.tabsTabpaneActive]: (activeKey === 'process'),
                              [styles.tabsTabpaneInactive]: (activeKey !== 'process')
                            }
                          )}>
            <List
              itemLayout="horizontal"
              dataSource={process.data}
              loading={loading}
              renderItem={item => (
                <div className={styles.listItemWrapper}>
                  <div className={styles.listLine}>
                    <a onClick={ (event)=>{ this.handleProcessView(item, event) }}>
                      <List.Item actions={[<Icon type="right" />]}>
                        <List.Item.Meta
                          title={item.processDefinitionName}
                          description={item.createTime}
                        />
                        <div className={styles.listContent}>
                          {item.stateValue}
                        </div>
                      </List.Item>
                    </a>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
