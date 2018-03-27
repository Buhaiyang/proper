import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './index.less';
import { inject } from './../../../common/inject';

@inject(['baseFrame', 'global'])
@connect(({ baseFrame, global, loading }) => ({
  baseFrame,
  global,
  loading: loading.models.baseFrame
}))
export default class Exam extends React.PureComponent {
  componentWillMount() {
    this.loadData();
  }

  loadData() {
    this.props.dispatch({
      type: 'baseFrame/fetch'
    });
  }

  render() {
    const { baseFrame: {examContent} } = this.props;

    return (
      <div className={styles.examWrapper}>
        <header className={styles.examName}>{examContent.name}</header>
        <Row>
          <Col style={{background: 'yellow'}} span={20} offset={2}>col-12 col-offset-6</Col>
        </Row>
      </div>
    );
  }
}