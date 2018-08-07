import React from 'react';
import { Switch, Route } from 'dva/router';
import {connect} from 'dva';
import { Layout, Button, Icon } from 'antd';
import { getRouterData } from '../common/frameHelper';
import {getParamObj} from '../utils/utils';
import NotFound from '../components/Exception/404';
import routers from '../../config/sysRouters';
import styles from './WebAppLayout.less';

const { Content } = Layout;
const webappRouters = Object.keys(routers).map(it=>routers[it].main && it).filter(i=>i !== undefined);
const Header = (props)=>{
  return (
    <div className={styles.header}>
      <Button type="primary" ghost className={styles.backBtn} onClick={props.onBackClick}>
        <Icon type="left" style={{fontWeight: 'bold'}} />{props.text}
      </Button>
      <h3 className={styles.title}>{props.title}</h3>
      <Button type="primary" ghost className={styles.homeBtn} onClick={props.onHomeClick}>
        <Icon type="home" style={{fontSize: '24px'}} />
      </Button>
    </div>)
}

@connect()
export default class WebAppLayout extends React.PureComponent {
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
  isApp = ()=>{
    return this.isIOS() || this.isAndroid()
  }
  componentWillMount() {
    window.localStorage.setItem('If_Can_Back', '');
    window.localStorage.setItem('pea_dynamic_request_prefix', 'https://icmp2.propersoft.cn/icmp/server-dev');
    if (this.props.location.search) {
      const transParams = getParamObj(this.props.location.search);
      if (transParams && transParams.token) {
        window.localStorage.setItem('proper-auth-login-token', transParams.token);
      }
    }
  }
  handleBack = ()=>{
    const {pathname} = this.props.location;
    // 如果webappRouters中包含当前的页面说明是主页 点击返回等于点击 handleHome
    if (webappRouters.includes(pathname)) {
      this.handleHome();
      return;
    }
    history.go(-1);
  }
  handleHome = ()=>{
    // 通知上层window此页面为h5的主页 root会触发返回按钮为原生的back事件
    // window.parent.postMessage('back', '*');
    window.localStorage.setItem('If_Can_Back', 'back');
  }
  render() {
    const routerData = getRouterData();
    return (
      <div className={styles.webAppContainer}>
        {this.isApp() ? <Header text="返回" onBackClick={this.handleBack} onHomeClick={this.handleHome} title={this.state.title} /> : null}
        <Layout style={{paddingTop: this.isApp() ? 44 : 0}}>
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
