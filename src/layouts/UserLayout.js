import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';
import {inject} from '../common/inject';

// TODO
// const links = [{
//   key: 'help',
//   title: '帮助',
//   href: '',
// }, {
//   key: 'privacy',
//   title: '隐私',
//   href: '',
// }, {
//   key: 'terms',
//   title: '条款',
//   href: '',
// }];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 普日软件技术有限公司</div>;
@inject('baseLogin')
class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Proper Enterprise App';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Proper Enterprise App`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Proper Enterprise App</span>
                </Link>
              </div>
              <div className={styles.desc}>Proper Enterprise App 是一体化管理平台</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/base" to="/base/login" />
            </Switch>
            {/* TODO <GlobalFooter links={links} copyright={copyright} /> */}
            <GlobalFooter copyright={copyright} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
