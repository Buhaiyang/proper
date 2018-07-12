import React from 'react';
import {connect} from 'dva';
import OopTabTableModal from '../OopTabTableModal';
import {inject} from '../../common/inject';

@inject(['workflowManager', 'global'])
@connect(({ workflowManager, global, loading }) => ({
  workflowManager,
  tableLoading: loading.effects['workflowManager/findUser'],
  listLoading: loading.effects['workflowManager/findGroup'],
  global,
}))
export default class OopGroupUserPicker extends React.PureComponent {
  handleButtonClick = () => {
    const self = this;
    this.props.dispatch({
      type: 'workflowManager/findGroup',
      payload: {
        moduleName: 'authusergroups',
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
      type: 'workflowManager/findUser',
      payload: groupId,
    });
  }

  render() {
    const {
      value,
      workflowManager: {group, user},
      listLoading,
      tableLoading
    } = this.props

    const columns = [
      {title: '用户名', dataIndex: 'username'},
      {title: '显示名', dataIndex: 'name'},
      {title: '电子邮箱', dataIndex: 'email'},
      {title: '手机号码', dataIndex: 'phone'},
    ]

    return (
      <OopTabTableModal
        buttonCfg={{
          icon: 'user',
          onClick: this.handleButtonClick,
          text: '指定处理人'
        }}
        columns={columns}
        defaultSelected={{ data: value, title: ' 已选处理人:' }}
        listCfg={{
          dataSource: group,
          loading: listLoading,
          onClick: this.findUser,
          title: '用户组列表'
        }}
        tableCfg={{list: user, loading: tableLoading, total: user.length}}
        title="指定处理人"
      />
    );
  }
}

