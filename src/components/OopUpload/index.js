import React from 'react';
import { Upload, Button, Icon, message} from 'antd';
import { devMode } from '../../config';


const getUploadUrl = (modelName = '')=>{
  if (!modelName) {
    console.error('OopUpload: upload file required a variable called \'modelName \'');
  }
  let url = '/file/'.concat(modelName);
  const prefix = window.localStorage.getItem('pea_dynamic_request_prefix');
  if (devMode === 'development' && prefix) {
    url = prefix + url;
  }
  return url;
}
export default class OopUpload extends React.PureComponent {
  uploadUrl = getUploadUrl(this.props.modelName);
  getInitProps = ()=>{
    const props = {
      name: 'file',
      buttonText: '点击上传',
      disabled: !this.props.modelName,
      ...this.props
    };
    const extra = (<Button disabled={!props.modelName}><Icon type="upload" /> {props.buttonText}</Button>);
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
    props.extra = extra;
    const callbackOnChange = props.onChange;
    props.onChange = (info)=> {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
      } else if (info.file.status === 'error') {
        if (info.file.error && info.file.error.status === 401) {
          // TODO 处理401
        }
        message.error(`${info.file.name} 上传失败！.${info.file.response}`);
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
