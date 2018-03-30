import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout } from 'antd';
import styles from './CustomFrameLayout.less';
import { getRouterData } from '../common/frameHelper';

const { Content } = Layout;

export default class CustomFrameLayout extends React.PureComponent {
  componentWillMount() {
    window.localStorage.setItem('proper-auth-login-token', this.props.location.search.replace('?token=', ''));
  }

  render() {
    return (
      <div className={styles.customFrame}>
        <Layout>
          <Content>
            <Switch>
              <Route exact path="/customframe/exam" component={getRouterData()['/customframe/exam'].component} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}
