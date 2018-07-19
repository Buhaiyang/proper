import React from 'react';
import { Upload, Button, Icon, message} from 'antd';
import { getApplicationContextUrl } from '../../utils/utils';

export default class OopUpload extends React.PureComponent {
  beforeUpload = (file) => {
    const { type, size } = this.props;
    const isType = type.some(item => file.type.indexOf(item.slice(1)) > 0);
    if (!isType) {
      message.error(`文件只能是${type.join('、')}格式!`);
      return isType;
    }
    const fileSize = file.size / 1024 / 1024;
    const isLt = size ? fileSize < size : fileSize < 2;
    if (!isLt) {
      message.error(`文件必须小于${size ? (size > 1 ? size : size * 1024) : 2}${(size && size < 1) ? 'KB' : 'M'}!`);
      return isLt;
    }
    return true;
  }

  defaultExtra = (<Button disabled={!this.props.modelName}>
    <Icon type="upload" />
    {this.props.buttonText ? this.props.buttonText : '点击上传'}
  </Button>);

  getInitProps = ()=>{
    const props = {
      name: 'file',
      action: `${getApplicationContextUrl()}/file`,
      disabled: !this.props.modelName,
      beforeUpload: this.beforeUpload,
      extra: this.defaultExtra,
      ...this.props
    };
    const token = window.localStorage.getItem('proper-auth-login-token');
    props.headers = {
      'X-PEP-TOKEN': token
    }
    props.defaultFileList && props.defaultFileList.forEach((item, index)=>{
      const {id} = item;
      item.uid = -(++index);
      item.url = (id.indexOf('http') === 0 || id.indexOf('data:image/') === 0) ?
        id : `${getApplicationContextUrl()}${id}`;
      item.thumbUrl = item.url;
    });
    const callbackOnChange = props.onChange;
    props.onChange = (info)=> {
      if (info.file.status === 'done') {
        message.success('上传成功!');
      } else if (info.file.status === 'error') {
        if (info.file.error && info.file.error.status === 401) {
          // TODO 处理401
        }
        message.error('上传失败!');
      }
      callbackOnChange && callbackOnChange(info);
    }
    return props;
  }
  render() {
    const props = this.getInitProps();
    return (
      <Upload {...props} >
        {props.extra}
      </Upload>
    );
  }
}
