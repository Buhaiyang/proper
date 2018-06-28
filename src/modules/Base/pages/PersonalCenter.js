import React from 'react';
import { Prompt } from 'dva/router';
import { Breadcrumb, Tabs, Form, Input, Button, Spin, Icon, message } from 'antd';
import {connect} from 'dva';
import {inject} from '../../../common/inject';
import OopUpload from '../../../components/OopUpload/index';
import { oopToast } from './../../../common/oopUtils';
import { getDownloadUrl } from '../../../utils/utils';
import styles from './PersonalCenter.less'

const { TabPane } = Tabs;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};
const PersonalInfoForm = Form.create()((props) => {
  const { form, entity, loading, avatarLoading, imageUrl, handleSubmit, nameChange,
    emailChange, phoneChange, avatarChange, beforeUpload, handleChange } = props;
  const { validateFields, resetFields } = form;
  const defaultFileList = [{ id: entity.avatar }];
  const uploadButton = (
    <div style={{ color: '#08c' }}>
      <Icon type={avatarLoading ? 'loading' : 'plus'} style={{ fontSize: 24, marginBottom: 10 }} />
      <div style={{ fontSize: 12 }}>点击上传</div>
    </div>
  );
  const extra = (imageUrl ? <img src={imageUrl} alt="头像" /> : uploadButton);
  const submit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      const id = values.avatar
        && values.avatar.file
        && values.avatar.file.response;
      if (id) {
        values.avatar = id;
      }
      if (!err) {
        handleSubmit(values, resetFields);
      }
    })
  };
  const validateName = (rule, value, callback) => {
    nameChange(value);
    callback();
  };
  const validateEmail = (rule, value, callback) => {
    emailChange(value);
    callback();
  };
  const validatePhone = (rule, value, callback) => {
    phoneChange(value);
    callback();
  };
  const validateAvatar = (rule, value, callback) => {
    avatarChange(value);
    callback();
  };
  return (
    <Spin spinning={loading}>
      <Form className={styles.marginTop} onSubmit={submit}>
        <div>
          {form.getFieldDecorator('id', {
            initialValue: entity.id,
          })(
            <Input type="hidden" />
          )}
        </div>
        <div>
          {form.getFieldDecorator('password', {
            initialValue: entity.password,
          })(
            <Input type="hidden" />
          )}
        </div>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {form.getFieldDecorator('username', {
            initialValue: entity.username,
          })(
            <Input disabled={true} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="显示名"
        >
          {form.getFieldDecorator('name', {
            initialValue: entity.name,
            rules: [
              {
                required: true, pattern: /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/, message: '显示名不能为空,只能是字母、数字、汉字、下划线组合',
              },
              {
                validator: validateName
              }
            ],
          })(
            <Input placeholder="请输入显示名" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电子邮箱"
        >
          {form.getFieldDecorator('email', {
            initialValue: entity.email,
            rules: [
              {
                required: true, type: 'email', message: '邮箱不能为空,必须为邮箱格式',
              },
              {
                validator: validateEmail
              }
            ],
          })(
            <Input placeholder="请输入电子邮箱" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {form.getFieldDecorator('phone', {
            initialValue: entity.phone,
            rules: [
              {
                required: true, pattern: /^1\d{10}$/, message: '手机号码不能为空且11位数字，如：1xxxxxxxxxx',
              },
              {
                validator: validatePhone
              }
            ],
          })(
            <Input placeholder="请输入手机号码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传头像"
        >
          {form.getFieldDecorator('avatar', {
            initialValue: entity.avatar,
            rules: [
              {
                validator: validateAvatar
              }
            ],
          })(
            <OopUpload
              modelName="basePersonalCenter"
              listType="picture-card"
              extra={extra}
              showUploadList={false}
              defaultFileList={defaultFileList}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayoutWithOutLabel}
        >
          <Button type="primary" htmlType="submit">更新</Button>
        </FormItem>
      </Form>
    </Spin>
  )
});
const ChangePasswordForm = Form.create()((props) => {
  const { form, loading, handleSubmit, oldPasswordChange,
    prePasswordChange, passwordChange } = props;
  const { validateFields, getFieldValue, resetFields } = form;
  const submit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleSubmit(values, resetFields);
      }
    })
  };
  const validateOldPassword = (rule, value, callback) => {
    oldPasswordChange(value);
    if (value && getFieldValue('prePassword')) {
      validateFields(['prePassword'], {force: true});
      callback();
    } else {
      callback();
    }
  };
  const validatePrePassword = (rule, value, callback) => {
    prePasswordChange(value);
    if (value && value === getFieldValue('oldPassword')) {
      callback('新密码与旧密码一致!');
    } else {
      if (getFieldValue('curPassword')) {
        validateFields(['curPassword'], {force: true});
      }
      callback();
    }
  };
  const validatePassword = (rule, value, callback) => {
    passwordChange(value);
    if (value && value !== getFieldValue('prePassword')) {
      callback('两次新密码输入不一致!');
    } else {
      callback();
    }
  };
  return (
    <Spin spinning={loading}>
      <Form className={styles.marginTop} onSubmit={submit}>
        <FormItem
          {...formItemLayout}
          label="请输入旧密码"
        >
          {form.getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true, pattern: /^[0-9a-zA-Z_]+$/, message: '旧密码不能为空,只能是字母、数字、下划线组合',
              },
              {
                validator: validateOldPassword
              }
            ]
          })(
            <Input type="password" placeholder="请输入旧密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请输入新密码"
        >
          {form.getFieldDecorator('prePassword', {
            rules: [
              {
                required: true, pattern: /^[0-9a-zA-Z_]+$/, message: '密码不能为空,只能是字母、数字、下划线组合',
              },
              {
                validator: validatePrePassword
              }
            ]
          })(
            <Input type="password" placeholder="请输入新密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请确认新密码"
        >
          {form.getFieldDecorator('curPassword', {
            rules: [
              {
                required: true, pattern: /^[0-9a-zA-Z_]+$/, message: '密码不能为空,只能是字母、数字、下划线组合',
              },
              {
                validator: validatePassword
              }
            ]
          })(
            <Input type="password" placeholder="请确认新密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayoutWithOutLabel}
        >
          <Button type="primary" htmlType="submit">保存修改</Button>
        </FormItem>
      </Form>
    </Spin>
  )
});
const TabsForm = (props) => {
  const { entity, loading, avatarLoading, imageUrl, submitPersonalInfo, submitPassword,
    nameChange, emailChange, phoneChange, avatarChange, oldPasswordChange,
    prePasswordChange, passwordChange, beforeUpload, handleChange } = props;
  const tabList = [
    {
      key: 'info',
      tab: '个人信息',
      content: <PersonalInfoForm
        entity={entity}
        loading={loading}
        avatarLoading={avatarLoading}
        imageUrl={imageUrl}
        handleSubmit={submitPersonalInfo}
        nameChange={nameChange}
        emailChange={emailChange}
        phoneChange={phoneChange}
        avatarChange={avatarChange}
        beforeUpload={beforeUpload}
        handleChange={handleChange}
      />
    },
    {
      key: 'password',
      tab: '修改密码',
      content: <ChangePasswordForm
        loading={loading}
        handleSubmit={submitPassword}
        oldPasswordChange={oldPasswordChange}
        prePasswordChange={prePasswordChange}
        passwordChange={passwordChange}
      />
    }
  ];
  return (
    <Tabs defaultActiveKey={tabList[0].key}>
      {
        tabList.map(item => (
          <TabPane tab={item.tab} key={item.key}>{item.content}</TabPane>
        ))
      }
    </Tabs>
  )
};

@inject(['basePersonalCenter'])
@connect(({ basePersonalCenter, loading }) => ({
  basePersonalCenter,
  loading: loading.models.basePersonalCenter,
}))
export default class PersonalCenter extends React.PureComponent {
  state = {
    imageUrl: '',
    avatarLoading: false,
    whenName: false,
    whenEmail: false,
    whenPhone: false,
    whenAvatar: false,
    whenOldPassword: false,
    whenPrePassword: false,
    whenPassword: false
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  // 取得当前登录用户信息
  getCurrentUser = () => {
    this.props.dispatch({
      type: 'basePersonalCenter/fetch',
      callback: (res) => {
        this.getUserInfo(res.result.userId);
      }
    });
  }

  // 取得用户所有信息
  getUserInfo = (id) => {
    this.props.dispatch({
      type: 'basePersonalCenter/fetchById',
      payload: id,
      callback: (res) => {
        this.setState({
          imageUrl: getDownloadUrl(res.result.avatar)
        });
      }
    });
  }

  // 返回上一页
  preLocation = () => {
    this.props.history.goBack();
  }

  // 更新个人信息
  submitPersonalInfo = (values, cb) => {
    this.props.dispatch({
      type: 'basePersonalCenter/update',
      payload: values,
      callback: (res) => {
        oopToast(res, '更新个人信息成功', '更新失败，请填写正确的信息');
        cb();
        this.setState({
          imageUrl: getDownloadUrl(res.result.avatar),
          whenName: false,
          whenEmail: false,
          whenPhone: false,
          whenAvatar: false
        });
      }
    });
  }

  // 修改密码
  submitPassword = (values, cb) => {
    const param = {...values};
    param.password = param.curPassword;
    delete param.prePassword;
    delete param.curPassword;
    this.props.dispatch({
      type: 'basePersonalCenter/changePassword',
      payload: param,
      callback: (res) => {
        oopToast(res, '修改个人密码成功', '修改个人密码失败');
        cb();
        this.setState({
          whenOldPassword: false,
          whenPrePassword: false,
          whenPassword: false
        });
      }
    });
  }

  // 个人信息显示名改变
  nameChange = (value) => {
    const {basePersonalCenter: {entity: {name}}} = this.props;
    if (value !== name) {
      this.setState({
        whenName: true
      });
    } else {
      this.setState({
        whenName: false
      });
    }
  }

  // 个人信息电子邮箱改变
  emailChange = (value) => {
    const {basePersonalCenter: {entity: {email}}} = this.props;
    if (value !== email) {
      this.setState({
        whenEmail: true
      });
    } else {
      this.setState({
        whenEmail: false
      });
    }
  }

  // 个人信息手机号码改变
  phoneChange = (value) => {
    const {basePersonalCenter: {entity: {phone}}} = this.props;
    if (value !== phone) {
      this.setState({
        whenPhone: true
      });
    } else {
      this.setState({
        whenPhone: false
      });
    }
  }

  // 个人信息头像改变
  avatarChange = (value) => {
    const {basePersonalCenter: {entity: {avatar}}} = this.props;
    if (value !== avatar) {
      this.setState({
        whenAvatar: true
      });
    } else {
      this.setState({
        whenAvatar: false
      });
    }
  }

  // 旧密码改变
  oldPasswordChange = (value) => {
    if (value) {
      this.setState({
        whenOldPassword: true
      });
    } else {
      this.setState({
        whenOldPassword: false
      });
    }
  }

  // 新密码改变
  prePasswordChange = (value) => {
    if (value) {
      this.setState({
        whenPrePassword: true
      });
    } else {
      this.setState({
        whenPrePassword: false
      });
    }
  }

  // 确认新密码改变
  passwordChange = (value) => {
    if (value) {
      this.setState({
        whenPassword: true
      });
    } else {
      this.setState({
        whenPassword: false
      });
    }
  }

  // 上传头像钩子
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPG) {
      message.error('图片只能是.jpg或.png格式!');
      return isJPG;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB!');
      return isLt2M;
    }
    return true;
  }

  // 图片转Base64编码
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 图片上传onChange事件
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        avatarLoading: false,
      }));
    }
  }

  render() {
    const { basePersonalCenter: { entity }, loading } = this.props;
    const { avatarLoading, imageUrl, whenName, whenEmail, whenPhone,
      whenAvatar, whenOldPassword, whenPrePassword, whenPassword } = this.state;
    const when = (whenName || whenEmail || whenPhone || whenAvatar
      || whenOldPassword || whenPrePassword || whenPassword);
    return (
      <div className={styles.wrapper}>
        <Prompt when={when} message="该页面信息有改动，是否确定离开？" />
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={this.preLocation}>返回上级页面</a></Breadcrumb.Item>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
        </Breadcrumb>
        <TabsForm
          entity={entity}
          loading={loading}
          imageUrl={imageUrl}
          avatarLoading={avatarLoading}
          submitPersonalInfo={this.submitPersonalInfo}
          submitPassword={this.submitPassword}
          nameChange={this.nameChange}
          emailChange={this.emailChange}
          phoneChange={this.phoneChange}
          avatarChange={this.avatarChange}
          oldPasswordChange={this.oldPasswordChange}
          prePasswordChange={this.prePasswordChange}
          passwordChange={this.passwordChange}
          beforeUpload={this.beforeUpload}
          handleChange={this.handleChange} />
      </div>)
  }
}
