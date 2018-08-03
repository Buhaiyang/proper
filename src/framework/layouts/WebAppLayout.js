import React from 'react';
import { Switch, Route } from 'dva/router';
import { Layout, Button, Icon } from 'antd';
import { getRouterData } from '../common/frameHelper';
import {getParamObj} from '../utils/utils';
import NotFound from '../components/Exception/404';
import styles from './WebAppLayout.less';

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
  state = {
    title: decodeURIComponent(getParamObj(this.props.location.search).title)
  }
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
      if (transParams && transParams.token) {
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
    const routerData = getRouterData();
    return (
      <div className={styles.customFrame}>
        {this.isIOS() ? <IOSHeaer text="返回" onclick={this.handleBack} title={this.state.title} /> : null}
        <Layout style={{paddingTop: this.isIOS() ? 44 : 0}}>
          <Content>
            <Switch>
              { // 路径为‘/webapp/*’的页面会被 默认认为是H5的页面 自动加载到WebAppLayout下
                Object.keys(routerData).map(it=>((it.includes('/webapp/')) ?
                  (<Route key={it} exact path={it} component={routerData[it].component} />) : null)
                )
              }
              <Route render={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}
