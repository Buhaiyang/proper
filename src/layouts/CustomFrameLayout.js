import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout, Icon } from 'antd';
import './CustomFrameLayout.less';
import { getRouterData } from '../common/frameHelper';

const { Footer, Content } = Layout;
const copyright = <div>Copyright <Icon type="copyright" /> 2018 普日软件技术有限公司</div>;

export default class CustomFrameLayout extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route exact path="/customframe/exam" component={getRouterData()['/customframe/exam'].component} />
          </Switch>
        </Content>
        <Footer>
          {copyright}
        </Footer>
      </Layout>
    );
  }
}
