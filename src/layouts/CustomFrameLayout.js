import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout } from 'antd';
import styles from './CustomFrameLayout.less';
import { getRouterData } from '../common/frameHelper';

const { Content } = Layout;

export default class CustomFrameLayout extends React.PureComponent {
  componentWillMount() {
    if (this.props.location.search != null) {
      const transParams = this.props.location.search.split('&');
      window.localStorage.setItem('proper-auth-login-token', transParams[0].replace('?token=', ''));
      window.localStorage.setItem('questionnaireNo', transParams[1].replace('questionnaireNo=', ''));
    }
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
