import React from 'react';
import { Upload, Button, Icon, message} from 'antd';
import { getApplicationContextUrl } from '../../utils/utils';


export default class OopUpload extends React.PureComponent {
  uploadUrl = `${getApplicationContextUrl()}/file`;
  getInitProps = ()=>{
    const props = {
      name: 'file',
      disabled: !this.props.modelName,
      extra: (<Button disabled={!this.props.modelName}><Icon type="upload" />{this.props.buttonText ? this.props.buttonText : '点击上传'}</Button>),
      ...this.props
    };
    const token = window.localStorage.getItem('proper-auth-login-token');
    props.action = this.uploadUrl;
    props.headers = {
      'X-PEP-TOKEN': token
    }
    props.defaultFileList.forEach((item)=>{
      const {id} = item;
      item.uid = id;
      const downloadUrl = this.uploadUrl.substr(0, this.uploadUrl.lastIndexOf('/')).concat('/download/').concat(id)
      item.url = downloadUrl;
    })
    const callbackOnChange = props.onChange;
    props.onChange = (info)=> {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
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
    return props
  }
  render() {
    const props = this.getInitProps()
    return (
      <Upload {...props} >
        {props.extra}
      </Upload>
    )
  }
}
