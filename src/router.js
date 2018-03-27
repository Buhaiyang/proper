import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { initGlobalVars, getRouterData } from './common/frameHelper'
import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});
function RouterConfig({ history, app }) {
  initGlobalVars(app)
  const UserLayout = getRouterData()['/base'].component
  const BasicLayout = getRouterData()['/'].component
  const CustomFrameLayout = getRouterData()['/customframe'].component
  return (
      <LocaleProvider locale={zhCN}>
        <Router history={history}>
          <Switch>
            <Route path="/customframe" component={CustomFrameLayout} />
            <Route path="/base" component={UserLayout} />
            <Route path="/" component={BasicLayout} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </LocaleProvider>
  );
}
export default RouterConfig;
