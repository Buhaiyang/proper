import React, { Fragment } from 'react';
import {
  Modal,
  Card,
  Row,
  Col,
  List,
  Spin,
  Tag,
  Button } from 'antd';
import classNames from 'classnames';
import OopSearch from '../OopSearch';
import OopTable from '../OopTable';

import styles from './index.less';

export default class OopTabTableModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultSelected = {
        data: [],
        text: ''
      },
      listCfg = {
        dataSource: []
      },
      tableCfg
    } = props
    this.state = {
      modalVisible: false,
      tableCfg: {
        list: [],
        total: 0,
        ...tableCfg
      },
      listCfg: {
        dataSource: listCfg.dataSource ? listCfg.dataSource : [],
      },
      selectedRecord: [...defaultSelected.data],
      activeListItem: listCfg.dataSource && listCfg.dataSource.length > 0 ? listCfg.dataSource[0] : {}
    }
  }

  handleButtonClick = (e) => {
    const {buttonCfg} = this.props;
    if (!this.btnEle) {
      this.btnEle = e.target;
    }

    this.setState({
      modalVisible: true
    }, () => {
      if (buttonCfg.onClick) {
        buttonCfg.onClick();
      }
    });
  }

  handleListClick = (record) => {
    const {listCfg: {onClick}} = this.props;
    const {activeListItem} = this.state;
    if (activeListItem.id !== record.id) {
      this.setState({
        activeListItem: record
      });
      if (onClick) {
        onClick(record.id);
      }
    }
  }

  handleListSearch = (inputValue, filter) => {
    const { listCfg: {dataSource} } = this.props;
    const { listCfg } = this.state;
    const filterList = inputValue ? filter(dataSource, ['name']) : dataSource;
    this.setState({
      listCfg: {
        ...listCfg,
        dataSource: filterList
      }
    });
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  handleModalOk = () => {
    const {onChange} = this.props;
    const {selectedRecord} = this.state;
    this.handleModalCancel();
    if (onChange) {
      onChange(selectedRecord);
    }
  }

  handleTableSearch = (inputValue, filter) => {
    const { tableCfg: {list} } = this.props;
    const { tableCfg } = this.state;
    const filterList = inputValue ? filter(list, ['name']) : list;
    this.setState({
      tableCfg: {
        ...tableCfg,
        list: filterList,
        total: list.length
      }
    });
  }

  handleTableSelect = (record, selected) => {
    const { selectedRecord } = this.state;
    if (selected) {
      this.setState({
        selectedRecord: [...selectedRecord, record]
      });
    } else {
      this.setState({
        selectedRecord: selectedRecord.filter((item) => {
          return item.id !== record.id;
        })
      });
    }
  }

  handleTableSelectAll = (selected, selectedRows, changeRows) => {
    const { selectedRecord } = this.state;
    if (selected) {
      this.setState({
        selectedRecord: [...selectedRecord, ...changeRows]
      });
    } else {
      const changeRowIds = changeRows.map((item) => {
        return item.id;
      });
      this.setState({
        selectedRecord: selectedRecord.filter((item) => {
          return changeRowIds.indexOf(item.id) === -1
        })
      });
    }
  }

  handleTagClose = (record) => {
    const { selectedRecord } = this.state;
    this.setState({
      selectedRecord: selectedRecord.filter((item) => {
        return item.id !== record.id;
      })
    });
  }

  handleModalClosed = () => {
    this.btnEle.blur();
  }

  renderSelected = () => {
    const {selectedRecord} = this.state;
    if (selectedRecord.length > 0) {
      return (
        // <div>{
        //   defaultSelected.map((item) => {
        //     return item.name;
        //   }).join(',')
        // }</div>
        <div>{
          selectedRecord.map((item, index, array) => {
            return (
              <Fragment key={item.id}>
                <span>{item.name}</span>{index < array.length - 1 && ','}
              </Fragment>
            );
          })
        }</div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      buttonCfg = {
        icon: 'user',
        text: '',
      },
      columns,
      defaultSelected,
      listCfg = {
        dataSource: []
      },
      // size,
      tableCfg = {
        list: [],
        total: 0
      },
      title = '',
    } = this.props;
    const {
      modalVisible,
      selectedRecord,
      activeListItem
    } = this.state;
    const selectedRowKeys = selectedRecord.map((item) => { return item.id });

    return (
      <Fragment>
        {
          this.renderSelected()
        }
        <Button
          icon={buttonCfg.icon}
          onClick={this.handleButtonClick}
          className={styles.btn}
          ref={(el)=>{ this.btn = el }}>{buttonCfg.text}</Button>
        <Modal
          afterClose={this.handleModalClosed}
          destroyOnClose={true}
          onCancel={this.handleModalCancel}
          onOk={this.handleModalOk}
          title={title}
          visible={modalVisible}
          width={800}
          wrapClassName={styles.assignModal}>
          <Row gutter={16} className={styles.tableInfo}>
            <Col span={4}>
              {defaultSelected.title}
            </Col>
            <Col span={20}>
              {selectedRecord.map((item) => {
                return (
                  <Tag
                    key={item.id}
                    closable
                    onClose={(e) => {
                      this.handleTagClose(item, e);
                  }}>{item.name}</Tag>
                )
              })}
            </Col>
          </Row>
          <Row gutter={16} className={styles.OopTreeTable}>
            <Col span={18} push={6}>
              <Card bordered={false} title={activeListItem.name}>
                <OopSearch
                  placeholder="请输入"
                  onInputChange={this.handleTableSearch}
                  ref={(el) => { this.tableSearch = el && el.getWrappedInstance() }}
                />
                <OopTable
                  grid={{list: tableCfg.list}}
                  columns={columns}
                  loading={tableCfg.loading}
                  _onSelect={this.handleTableSelect}
                  _onSelectAll={this.handleTableSelectAll}
                  pagination={{total: tableCfg.total}}
                  dataDefaultSelectedRowKeys={selectedRowKeys}
                  // size={size}
                  ref={(el)=>{ this.table = el }}
                />
              </Card>
            </Col>
            <Col span={6} pull={18}>
              <Card bordered={false} title={listCfg.title}>
                <OopSearch
                  placeholder="请输入"
                  onInputChange={this.handleListSearch}
                  ref={(el) => { this.listSearch = el && el.getWrappedInstance() }}
                />
                <Spin spinning={listCfg.loading}>
                  <List
                    dataSource={listCfg.dataSource}
                    renderItem={item => (
                      <List.Item
                        className={classNames(styles.listItem, {[styles.listItemActive]: item.id === activeListItem.id})}
                        >
                          <div className={styles.listItemContentWrapper} onClick={() => this.handleListClick(item)}>
                            {item.name}
                          </div>
                      </List.Item>
                    )}
                    split={false}
                  />
                </Spin>
              </Card>
            </Col>
          </Row>
        </Modal>
      </Fragment>
    );
  }
}
