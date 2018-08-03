import React, {Fragment} from 'react';
import { List, Icon, Tabs, Badge, Spin } from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import {inject} from '../../../../framework/common/inject';
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
    task: {data: [], pagination: {}},
    design: {data: [], pagination: {}},
    process: {data: [], pagination: {}},
  }

  componentDidMount() {
    // 通知上层window此页面为h5的主页 root会触发返回按钮为原生的back事件
    window.parent.postMessage('root', '*');
    this.fetchData();
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

  fetchData = (page) => {
    const self = this;
    const { activeKey } = this.state;
    const {[activeKey]: {pagination} } = this.state
    this.props.dispatch({
      type: 'global/oopSearchResult',
      payload: {
        moduleName: `workflow_${activeKey}`,
        pageNo: page || 1,
        pageSize: pagination.pageSize || 10,
      },
      callback: () => {
        const { global } = self.props;
        const { [activeKey]: listState } = this.state;
        this.setState({
          [activeKey]: {
            data: [...((!page || page === '1') ? [] : listState.data), ...global.oopSearchGrid.list],
            pagination: global.oopSearchGrid.pagination
          }
        });
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
      task: {data: [], pagination: {}},
      design: {data: [], pagination: {}},
      process: {data: [], pagination: {}},
    }, () => {
      if (key === 'task') {
        self.fetchData();
      } else if (key === 'design') {
        self.fetchDesign();
      } else if (key === 'process') {
        self.fetchData();
      }
    });
  }
  handleProcessLaunch = (record)=>{
    console.log('handleProcessLaunch', record);
    const {key, startFormKey} = record;
    const param = (encodeURIComponent(JSON.stringify({
      isLaunch: true,
      taskOrProcDefKey: key,
      businessObj: {
        formKey: startFormKey
      },
      name: '流程发起'
    })));
    this.props.dispatch(routerRedux.push(`/webapp/workflowMainPop?param=${param}`));
  }
  handleProcessSubmit = (record)=>{
    console.log('handleProcessSubmit', record)
    const {taskId, procInstId, name} = record;
    const param = (encodeURIComponent(JSON.stringify({
      isLaunch: false,
      taskOrProcDefKey: taskId,
      procInstId,
      name,
      businessObj: {formTitle: `${record.pepProcInst.startUserName}的${record.pepProcInst.processDefinitionName}`},
      stateCode: undefined
    })));
    this.props.dispatch(routerRedux.push(`/webapp/workflowMainPop?param=${param}`));
  }
  handleProcessView = (record)=>{
    console.log('handleProcessView', record);
    const {procInstId, processDefinitionId, stateCode} = record;
    this.props.dispatch({
      type: 'workflowManager/findBusinessObjByProcInstId',
      payload: procInstId,
      callback: (res) => {
        console.log(res);
        const businessObj = res.length ? res[0] : null;
        const param = (encodeURIComponent(JSON.stringify({
          isLaunch: false,
          taskOrProcDefKey: null,
          procInstId,
          businessObj,
          name: null,
          processDefinitionId,
          stateCode
        })));
        this.props.dispatch(routerRedux.push(`/webapp/workflowMainPop?param=${param}`));
      }
    });
  }
  afterProcessSubmit = ()=>{
    this.handleTabsChange(this.state.activeKey);
  }

  render() {
    const {
      loading,
      gridLoading
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
            {activeKey === 'task' ? (
              <Fragment>
              <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={this.fetchData}
                hasMore={!gridLoading && task.data.length < task.pagination.count}
                useWindow={false}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={task.data}
                  loading={gridLoading}
                  renderItem={item => (
                    <div className={styles.listItemWrapper}>
                      <div className={styles.listLine}>
                        <a onClick={ (event)=>{ this.handleProcessSubmit(item, event) }}>
                          <List.Item actions={[<Icon type="right" />]}>
                            <List.Item.Meta
                              title={item.pepProcInst.processDefinitionName}
                              description={<div><div>{item.pepProcInst.createTime}</div><div><span>发起人: </span><span>{item.pepProcInst.startUserName}</span></div></div>}
                            />
                            <div className={styles.listContent}>
                              {item.pepProcInst.stateValue}
                            </div>
                          </List.Item>
                        </a>
                      </div>
                    </div>
                  )}
                />
              </InfiniteScroll>
              {gridLoading && task.data.length < task.pagination.count && (
                <div className={styles.loadingContainer}>
                  <Spin />
                </div>
              )}
            </Fragment>) : null}
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
                    <a onClick={ (event)=>{ item.status.code === 'DEPLOYED' ? this.handleProcessLaunch(item, event) : null }}>
                      <List.Item actions={[item.status.code === 'DEPLOYED' ? <Icon type="right" /> : null]}>
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
            {activeKey === 'process' ? (
              <Fragment>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={1}
                  loadMore={this.fetchData}
                  hasMore={!gridLoading && process.data.length < process.pagination.count}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={process.data}
                    loading={gridLoading}
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
                </InfiniteScroll>
                {gridLoading && process.data.length < process.pagination.count && (
                  <div className={styles.loadingContainer}>
                    <Spin />
                  </div>
                )}
              </Fragment>) : null}
          </div>
        </div>
      </div>
    );
  }
}
