import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout, Button, Icon } from 'antd';
import styles from './CustomFrameLayout.less';
import { getRouterData } from '../common/frameHelper';
import {getParamObj} from '../utils/utils';


const { Content } = Layout;

const IOSHeaer = (props)=>{
  return (
    <div className={styles.header}>
      <Button type="primary" ghost className={styles.backBtn} onClick={props.onclick}>
        <Icon type="left" style={{fontWeight: 'bold'}} />{props.text}
      </Button>
      <h3 className={styles.title}>{props.title}</h3>
    </div>)
}

export default class CustomFrameLayout extends React.PureComponent {
  isAndroid = ()=>{
    const {userAgent} = navigator;
    return userAgent.includes('Android') || userAgent.includes('Adr');
  }
  isIOS = ()=>{
    const {userAgent} = navigator;
    return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
  componentWillMount() {
    window.localStorage.setItem('If_Can_Back', '');
    // window.localStorage.setItem('pea_dynamic_request_prefix', 'http://192.168.1.111/pep/develop');
    if (this.props.location.search) {
      const transParams = getParamObj(this.props.location.search);
      if (transParams) {
        window.localStorage.setItem('proper-auth-login-token', transParams.token);
      }
    }
  }
  handleBack = ()=>{
    // 通知上层window此页面为h5的主页 root会触发返回按钮为原生的back事件
    // window.parent.postMessage('back', '*');
    window.localStorage.setItem('If_Can_Back', 'back');
  }
  render() {
    const transParams = getParamObj(this.props.location.search);
    return (
      <div className={styles.customFrame}>
        {this.isIOS() ? <IOSHeaer text="返回" onclick={this.handleBack} title={decodeURIComponent(transParams.title)} /> : null}
        <Layout style={{paddingTop: this.isIOS() ? 44 : 0}}>
          <Content>
            <Switch>
              <Route exact path="/customframe/workflow" component={getRouterData()['/customframe/workflow'].component} />
              <Route exact path="/customframe/workflowMainPop" component={getRouterData()['/customframe/workflowMainPop'].component} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}
