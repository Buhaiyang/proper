import React from 'react';
import { Icon, Button, Input, Menu, Dropdown } from 'antd';
import styles from './index.less';
import {inject} from "../../common/inject";
import { connect } from 'dva';

const menu = (
  <Menu defaultOpenKeys={['1']}>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="javascript:;">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="javascript:;">2nd menu item</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a target="_blank" rel="noopener noreferrer" href="javascript:;">3rd menu item</a>
    </Menu.Item>
  </Menu>
);
const Search = Input.Search;
@inject('global')
@connect(({global})=>({global: global}))
class Complete extends React.Component {

  handleSearch = (value) => {
    if(value){
      this.search(value)
    }
  }
  handleChange = (value)=>{

  }
  search = (query)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'global/queryData',
      payload :query
    })
  }
  handlInputClick = (event)=>{
    event.preventDefault()
    event.stopPropagation()
    //阻止传播 和 默认行为
  }
  handlButtonClick = (event)=>{
    event.preventDefault()
    event.stopPropagation()
    //阻止传播 和 默认行为
  }
  handleOptionSelect = (value,option)=>{
    console.log(value,option)
  }
  render() {
    const { dataSource } = this.props.global;
    return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <Search placeholder="input search text" enterButton="Search" size="large" />
        </Dropdown>
      </div>
    );
  }
}
export default Complete
