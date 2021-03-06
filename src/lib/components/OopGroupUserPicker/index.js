import React from 'react';
import {connect} from 'dva';
import OopTabTableModal from '../OopTabTableModal';
import {inject} from '../../../framework/common/inject';


@inject(['OopGroupUserPicker$model', 'global'])
@connect(({ workflowManager, global, loading }) => ({
  workflowManager,
  tableLoading: loading.effects['OopGroupUserPicker$model/findUser'],
  listLoading: loading.effects['OopGroupUserPicker$model/findGroup'],
  global,
}))
export default class OopGroupUserPicker extends React.PureComponent {
  handleButtonClick = () => {
    const self = this;
    this.props.dispatch({
      type: 'OopGroupUserPicker$model/findGroup',
      payload: {
        moduleName: 'authusergroups',
        userGroupEnable: 'ALL'
      },
      callback: () => {
        const { workflowManager: {group} } = self.props;
        if (group.length > 0) {
          this.findUser(group[0].id);
        }
      }
    });
  }

  findUser = (groupId) => {
    this.props.dispatch({
      type: 'OopGroupUserPicker$model/findUser',
      payload: groupId,
    });
  }

  handleChange = (data) => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(data);
    }
  }

  render() {
    const {
      value = [],
      workflowManager: {group = [], user = []},
      listLoading,
      tableLoading
    } = this.props

    const columns = [
      {title: '用户名', dataIndex: 'username'},
      {title: '显示名', dataIndex: 'name'},
      {title: '电子邮箱', dataIndex: 'email'},
      {title: '手机号码', dataIndex: 'phone'},
    ]

    const filterColums = [
      'username', 'name', 'email', 'phone'
    ]

    const treeCfg = {
      dataSource: group,
      loading: listLoading,
      title: '用户组列表'
    };

    const tableCfg = {
      data: user,
      loading: tableLoading,
      onLoad: this.findUser,
      total: user.length
    };

    if (group.length > 0) {
      treeCfg.defaultSelectedKeys = [group[0].id];
      tableCfg.title = group[0].name;
    }

    return (
      <OopTabTableModal
        buttonCfg={{
          icon: 'user',
          onClick: this.handleButtonClick,
          text: '指定处理人'
        }}
        columns={columns}
        defaultSelected={{ data: value, title: ' 已选处理人:' }}
        filterColums={filterColums}
        modalTitle="指定处理人"
        onChange={this.handleChange}
        tableCfg={tableCfg}
        treeCfg={treeCfg}
      />
    );
  }
}

