import React from 'react';
import { List, Icon } from 'antd';
import {connect} from 'dva';
import {inject} from '../../../common/inject';
import styles from './index.less';

@inject(['baseFrame', 'global'])
@connect(({ baseFrame, global, loading }) => ({
  baseFrame,
  global,
  loading: loading.models.baseFrame
}))
export default class Workflow extends React.PureComponent {
  componentDidMount() {
    console.log('componentDidMount')
    // 通知上层window此页面为h5的主页 root会触发返回按钮为原生的back事件
    window.parent.postMessage('root', '*');
    this.props.dispatch({
      type: 'baseFrame/fetchExamList',
      payload: {
        status: 'PUBLISHING'
      }
    })
  }
  render() {
    const {loading, baseFrame: {examList}} = this.props;
    return (
      <div className={styles.examList}>
        <List
          itemLayout="horizontal"
          dataSource={examList}
          loading={loading}
          renderItem={item => (
            <a href={`#/customframe/exam?examId=${item.id}`}>
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={item.publishDateTime}
                />
                <div><Icon type="right" /></div>
              </List.Item>
            </a>
          )}
        /></div>);
  }
}
