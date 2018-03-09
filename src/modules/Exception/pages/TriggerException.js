import React, { PureComponent } from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import {inject} from '../../../common/inject';

@inject('exception')
@connect(state => ({
  isloading: state.exception.isloading,
}))
export default class TriggerException extends PureComponent {
  state={
    isloading: false,
  }
  trigger401 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'exception/query401',
    });
  };
  trigger403 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'exception/query403',
    });
  };
  trigger500 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'exception/query500',
    });
  };
  trigger404 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'exception/query404',
    });
  };
  render() {
    return (
      <Card>
        <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={this.trigger401}>
            触发401
          </Button>
          <Button type="danger" onClick={this.trigger403}>
            触发403
          </Button>
          <Button type="danger" onClick={this.trigger500}>
            触发500
          </Button>
          <Button type="danger" onClick={this.trigger404}>
            触发404
          </Button>
        </Spin>
      </Card>
    );
  }
}
