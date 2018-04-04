import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert, Modal, Form, Input, message } from 'antd';
// TODO import { Link } from 'dva/router';
// TODO import { Checkbox, Alert, Icon, Modal, Form, Input, message } from 'antd';
import Login from '../../../components/Login';
import styles from './Login.less';
import {inject} from '../../../common/inject';

// TODO const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const { Tab, UserName, Password, Submit } = Login;
const FormItem = Form.Item;
const AddressForm = Form.create()((props)=>{
  const { form, address } = props;
  const {getFieldDecorator} = form;
  return (
    <Form>
      <FormItem
        label="请求地址"
      >
        {getFieldDecorator('address', {
          initialValue: address,
          rules: [{
            pattern: /^http:\/\/|https:\/\/[A-Za-z0-9]+.[A-Za-z0-9]+[=?%\-&_~`@[\]':+!]*([^<>""])*$/, message: 'url地址格式不正确',
          }]
        })(
          <Input placeholder="请输入请求地址" />
        )}
      </FormItem>
    </Form>
  )
})

@inject('baseLogin')
@connect(({ baseLogin, loading }) => ({
  baseLogin,
  submitting: loading.effects['baseLogin/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    // TODO autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch({
        type: 'baseLogin/login',
        payload: {
          ...values,
        },
      });
    }
  }

  // TODO
  // changeAutoLogin = (e) => {
  //   this.setState({
  //     autoLogin: e.target.checked,
  //   });
  // }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  toggleModalShow = (flag)=>{
    this.props.dispatch({
      type: 'baseLogin/toggleShowModal',
      payload: flag
    })
  }
  handleOnOk = ()=>{
    const me = this
    const {validateFields} = me.addressForm;
    validateFields((err, fieldsValue) => {
      if (err) return;
      me.props.dispatch({
        type: 'baseLogin/setAddress',
        payload: fieldsValue.address,
        callback() {
          message.success('后台地址切换成功!')
        }
      })
    });
  }
  render() {
    const { baseLogin, submitting } = this.props;
    console.log(baseLogin.address)
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              baseLogin.showError && this.renderMessage('账户或密码错误(admin/123456)')
            }
            <UserName name="username" placeholder="admin" />
            <Password name="pwd" placeholder="123456" />
          </Tab>
          {/* TODO <Tab key="mobile" tab="手机号登录">
            {
              baseLogin.status === 'error' &&
              baseLogin.type === 'mobile' &&
              !baseLogin.submitting &&
              this.renderMessage('验证码错误')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab> */}
          {/* TODO <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div> */}
          <Submit loading={submitting}>登录</Submit>
          {/* TODO <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/base/register">注册账户</Link>
          </div> */}
        </Login>
        <Modal
          visible={ baseLogin.modalVisible }
           onCancel={()=>{ this.toggleModalShow(false) }}
           onOk={this.handleOnOk}
           destroyOnClose={true}>
          <AddressForm address={baseLogin.address } ref={(el)=>{ this.addressForm = el }} />
        </Modal>
      </div>
    );
  }
}
