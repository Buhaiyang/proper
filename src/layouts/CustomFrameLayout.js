import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout } from 'antd';
import styles from './CustomFrameLayout.less';
import { getRouterData } from '../common/frameHelper';
import {getParamObj} from '../utils/utils';


const { Content } = Layout;

export default class CustomFrameLayout extends React.PureComponent {
  componentWillMount() {
    const token = window.localStorage.getItem('proper-auth-login-token');
    if (!token) {
      if (this.props.location.search != null) {
        const transParams = getParamObj(this.props.location.search);
        if (transParams) {
          window.localStorage.setItem('proper-auth-login-token', transParams.token);
        }
      }
    }
  }
  render() {
    return (
      <div className={styles.customFrame}>
        <Layout>
          <Content>
            <Switch>
              <Route exact path="/customframe/exam" component={getRouterData()['/customframe/exam'].component} />
              <Route exact path="/customframe/exam-details" component={getRouterData()['/customframe/exam-details'].component} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}
