import React from 'react';
import { connect } from 'dva';
import { Card, Input, Button, Row, Col, Divider, Form, Spin } from 'antd';
import { inject } from './../../../common/inject';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { oopToast } from './../../../common/oopUtils';

const FormItem = Form.Item;
const { TextArea } = Input;
const CreateForm = Form.create()((props) => {
  const { loading, conInfo, submitForm, form, decryptCode, encryptCode, type } = props;
  const handleClick = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      submitForm(form, fieldsValue, type);
    });
  }
  return (
    <Spin spinning={loading}>
      <Form>
        <FormItem>
          {form.getFieldDecorator('aes')(
            <Card bordered={false}>
              <Divider orientation="left" style={{ marginTop: 0 }}>{conInfo.title}</Divider>
              <Row>
                <Col lg={4} />
                <Col lg={6} span={24} style={{ marginBottom: 20 }}>
                  <Input placeholder={conInfo.leftDef} /></Col>
                <Col lg={4} span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Button type="primary" onClick={handleClick}>{conInfo.buttonText}</Button></Col>
                <Col lg={6} span={24} >
                  <TextArea
                    placeholder={conInfo.rightDef}
                    value={type === 'ENCRYPT' ? encryptCode : decryptCode}
                  />
                </Col>
                <Col lg={4} />
              </Row>
            </Card>
          )}
        </FormItem>
      </Form>
    </Spin>
  )
})

@inject(['devtoolsAes', 'global'])
  @connect(({ devtoolsAes, global, loading }) => ({
    devtoolsAes,
    global,
    loading: loading.models.devtoolsAes,
    decryptLoading: loading.effects['devtoolsAes/decrypt'],
    encryptLoading: loading.effects['devtoolsAes/encrypt']
  }))
export default class Aes extends React.Component {
  state = {
    decryptCode: '',
    encryptCode: ''
  }
  submitForm = (form, fields, type) => {
    const me = this;
    const params = fields.aes;
    if (type === 'ENCRYPT') { me.encrypt(params, me) }
    if (type === 'DECRYPT') { me.decrypt(params, me); }
  }
  // 解密
  decrypt = (params, me) => {
    me.props.dispatch({
      type: 'devtoolsAes/decrypt',
      payload: params,
      callback: (res) => {
        me.setState({
          decryptCode: res.result
        })
        oopToast(res, 'AES 解密成功', 'AES 解密失败');
      }
    })
  }
  // 加密
  encrypt = (params, me) => {
    me.props.dispatch({
      type: 'devtoolsAes/encrypt',
      payload: params,
      callback: (res) => {
        me.setState({
          encryptCode: res.result
        })
        oopToast(res, 'AES 加密成功', 'AES 加密失败');
      }
    })
  }
  render() {
    const { decryptLoading, encryptLoading } = this.props;
    const first = { title: 'AES 加密', leftDef: '请输入', rightDef: '', buttonText: 'ENCRYPT', type: 'ENCRYPT' };
    const second = { title: 'AES 解密', leftDef: '请输入', rightDef: '', buttonText: 'DECRYPT', type: 'DECRYPT' };
    const { encryptCode, decryptCode } = this.state;
    return (
      <PageHeaderLayout>
        <CreateForm
          loading={!!encryptLoading}
          conInfo={first}
          type={first.type}
          submitForm={this.submitForm}
          encryptCode={encryptCode}
        />
        <CreateForm
          loading={!!decryptLoading}
          conInfo={second}
          type={second.type}
          submitForm={this.submitForm}
          decryptCode={decryptCode}
        />
      </PageHeaderLayout>
    );
  }
}
