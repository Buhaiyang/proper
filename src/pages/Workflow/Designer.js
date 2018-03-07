import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Icon, Badge, List, Tooltip, Checkbox, Dropdown, Menu, Upload, Modal, Popconfirm } from 'antd';
import cookie from 'react-cookies'
import { inject } from './../../common/inject';
import styles from './Designer.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import OSearch from '../../components/Osearch';
import Ellipsis from '../../components/Ellipsis';

@inject(['workflowDesigner', 'global'])
@connect(({ workflowDesigner, global, loading }) => ({
  workflowDesigner,
  global,
  loading: loading.models.workflowDesigner
}))
export default class Designer extends PureComponent {
  state = {
    buttonSize: 'small',
    showUploadList: false,
    deleteLists: [],
    viewVisible: false
  };

  componentDidMount() {
    cookie.remove('X-PEP-TOKEN', { path: '/' });
    cookie.save('X-PEP-TOKEN', window.localStorage.getItem('proper-auth-login-token'), { path: '/' });
    this.props.dispatch({
      type: 'workflowDesigner/fetch',
      payload: {
        filter: 'myProcesses',
        modelType: '0',
        sort: 'modifiedDesc'
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

  onSearchResult = (param)=>{
    this.props.dispatch({
      type: 'workflowDesigner/fetch',
      payload: {
        extraParams: param,
      }
    });
  }

  checkboxChange = (e, item) => {
    const isChecked = e.target.checked;
    let isInList = false;

    let index;
    for (let i = 0; i < this.state.deleteLists.length; i++) {
      if (item.id === this.state.deleteLists[i]) {
        index = i;
        isInList = true;
      }
    }
    if (!isChecked && isInList) {
      this.state.deleteLists = [
        ...this.state.deleteLists.slice(0, index),
        ...this.state.deleteLists.slice(index + 1, this.state.deleteLists.length)
      ]
    } else if (isChecked && !isInList) {
      this.state.deleteLists.push(item.id);
    }
  }

  // 删除数组中的某个元素
  arrayRemove = (arr, val) => {
    let index;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        index = i;
      }
    }
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  // 删除单个元素
  deleteItem = (id) => {
    this.props.dispatch({
      type: 'workflowDesigner/remove',
      payload: id,
      callback: () => {
        this.props.dispatch({
          type: 'workflowDesigner/fetch'
        });
        this.state.deleteLists = this.arrayRemove(this.state.deleteLists, id);
      }
    });
  }

  menuClick = ({ key }, item) => {
    switch (key) {
      case 'item_0':
        console.log(item);
        break;
      case 'item_1':
        console.log(item);
        break;
      case 'item_2':
        console.log(item);
        break;
      case 'item_3':
        console.log(item);
        break;
      default:
        break;
    }
  }

  // 删除选中的所有元素
  deleteAll = () => {
    for (let i = 0; i < this.state.deleteLists.length; i++) {
      this.deleteItem(this.state.deleteLists[i]);
    }
  }

  // 跳转到activiti
  goActivity = (item) => {
    window.location = `workflow/index.html#/editor/${item.id}`;
  }

  // 打开新建窗口
  create = (flag) => {
    this.setState({
      viewVisible: flag,
    });
  }

  // 新建确认
  createOk = (flag) => {
    this.setState({
      viewVisible: flag,
    });
  }

  // 新建取消
  createCancel = (flag) => {
    this.setState({
      viewVisible: flag,
    });
  }

  render() {
    const { workflowDesigner: { data }, global: {searchOptions, size}, loading } = this.props;
    const { buttonSize, showUploadList, viewVisible } = this.state;

    const itemMenu = [
      {key: 'item_0', type: 'lock', content: '权限'},
      {key: 'item_1', type: 'file-text', content: '复制'},
      {key: 'item_2', type: 'right-circle-o', content: '发起'},
      {key: 'item_3', type: 'swap', content: '移动'}
    ];

    return (
      <PageHeaderLayout content={
        <div>
          <OSearch
            searchOptions={searchOptions}
            placeholder="请输入"
            enterButtonText="搜索"
            size={size}
            onSuggest={this.onSuggest}
            onSearchResult={this.onSearchResult}
          />
          <Button className={styles.headerButton} icon="plus" type="primary" size={buttonSize} onClick={() => this.create(true)}>
            新建
          </Button>
          <Upload showUploadList={showUploadList}>
            <Button className={styles.headerButton} icon="select" type="primary" size={buttonSize}>
              导入
            </Button>
          </Upload>
          {<Popconfirm title="确定删除选中的数据吗?" onConfirm={() => this.deleteAll()}>
            <Button icon="delete" size={buttonSize}>批量删除</Button>
          </Popconfirm>}
        </div>
      }>
        <div>
          <div>
            <List
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={data.data}
              renderItem={item => (
                <List.Item key={item.id} className={styles.contolFontSize}>
                  <Card
                    hoverable
                    className={styles.cardContent}
                    cover={<div style={{background: `url(${item.sourceExtraUrl}) no-repeat 50% 50%`, backgroundSize: 'contain'}} />}
                    actions={
                      [
                        <Tooltip placement="bottom" title="部署">
                          <Icon type="api" />
                        </Tooltip>,
                        <Tooltip placement="bottom" title="编辑">
                          <Icon type="edit" onClick={() => this.goActivity(item)} />
                        </Tooltip>,
                        <Tooltip placement="bottom" title="导出">
                          <Icon type="download" />
                        </Tooltip>,
                        <Dropdown
                          overlay={
                            <Menu onClick={value => this.menuClick(value, item)}>
                              {
                                itemMenu.map(it => (
                                  <Menu.Item key={it.key}>
                                    <a><Icon type={it.type} /> {it.content}</a>
                                  </Menu.Item>
                                ))
                              }
                              <Menu.Item key="item_4">
                                <Popconfirm title="确定删除选中的数据吗" onConfirm={() => this.deleteItem(item.id)}>
                                  <a><Icon type="delete" /> 删除</a>
                                </Popconfirm>
                              </Menu.Item>
                            </Menu>
                          }
                          placement="topCenter">
                          <Icon type="ellipsis" />
                        </Dropdown>
                      ]
                    }
                  >
                    <Card.Meta
                      description={(
                        <div>
                          <Checkbox
                            className={styles.checkboxPosition}
                            onChange={value => this.checkboxChange(value, item)}
                          />
                          <Ellipsis className={styles.item} lines={1}>
                            <a>{item.name}</a>
                          </Ellipsis>
                          <Ellipsis className={styles.item} lines={4}>
                            <Badge
                              status={ item.status ? (item.status.code === 1 ? 'default' : (item.status.code === 2 ? 'processing' : 'error')) : 'default' }
                              text={ item.status ? item.status.content : '未部署' }
                              className={styles.status} />
                            部署时间: { item.deploymentTime }
                            /
                            最后更新: { item.lastUpdated }
                            /
                            创建时间: { item.createTime }
                        </Ellipsis>
                        </div>
                      )}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
        <Modal
          title="新建工作流"
          visible={viewVisible}
          onOk={() => this.createOk(false)}
          onCancel={() => this.createCancel(false)}
          destroyOnClose={true}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </PageHeaderLayout>
    );
  }
}