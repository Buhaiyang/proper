import React, { Fragment } from 'react';
import {
  Modal,
  Row,
  Col,
  Tag,
  Button } from 'antd';
import OopTreeTable from '../OopTreeTable';

import styles from './index.less';

export default class OopTabTableModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultSelected = {
        data: [],
      },
    } = props;
    this.state = {
      modalVisible: false,
      tableCfg: {
        data: [],
        title: '',
        total: 0,
      },
      selectedRecord: [...defaultSelected.data],
    };
  }

  componentWillReceiveProps(nextProps) {
    const {tableCfg: tableCfgState} = this.state;
    const {tableCfg, defaultSelected} = nextProps;
    this.setState({
      selectedRecord: [...defaultSelected.data],
      tableCfg: {
        data: tableCfg.data,
        total: tableCfg.total,
        title: tableCfgState.title
      }
    });
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

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
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
    const { tableCfg: {data}, filterColums } = this.props;
    const { tableCfg } = this.state;
    const filterList = inputValue ? filter(data, filterColums) : data;
    this.setState({
      tableCfg: {
        ...tableCfg,
        data: filterList,
        total: filterList.length
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

  handleTableLoad = ()=>{
    const {tableCfg} = this.props;
    if (tableCfg.onLoad) {
      const currentSelectTreeNode = this.oopTreeTable.getCurrentSelectTreeNode();
      if (currentSelectTreeNode) {
        if (currentSelectTreeNode.key) {
          tableCfg.onLoad(currentSelectTreeNode.key);
        }
        if (currentSelectTreeNode.title) {
          this.setState({
            tableCfg: {
              ...tableCfg,
              title: currentSelectTreeNode.title
            }
          });
        }
      }
    }
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
      filterColums,
      treeCfg = {
        dataSource: [],
        defaultSelectedKeys: []
      },
      // size,
      tableCfg = {
        data: [],
        title: '',
        total: 0,
      },
      modalTitle = '',
    } = this.props;
    const {
      modalVisible,
      tableCfg: tableCfgState,
      selectedRecord,
    } = this.state;
    const selectedRowKeys = selectedRecord.map((item) => { return item.id });

    const tableTitle = tableCfgState.title ? tableCfgState.title : tableCfg.title;

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
          title={modalTitle}
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

          <OopTreeTable
            ref={(el)=>{ this.oopTreeTable = el }}
            table={{
              columns,
              dataDefaultSelectedRowKeys: selectedRowKeys,
              filterColums,
              grid: {list: tableCfgState.data},
              gridLoading: tableCfg.loading,
              onLoad: this.handleTableLoad,
              oopSearch: {
                placeholder: '请输入',
                enterButtonText: '搜索',
                onInputChange: this.handleTableSearch
              },
              _onSelect: this.handleTableSelect,
              _onSelectAll: this.handleTableSelectAll,
              pagination: {total: tableCfgState.total},
              title: tableTitle
            }}
            tree={{
              className: styles.tree,
              _defaultSelectedKeys: treeCfg.defaultSelectedKeys,
              title: treeCfg.title,
              treeLoading: treeCfg.loading,
              treeData: treeCfg.dataSource,
              treeTitle: 'name',
              treeKey: 'id',
            }}
            // size={size}
          />
        </Modal>
      </Fragment>
    );
  }
}
