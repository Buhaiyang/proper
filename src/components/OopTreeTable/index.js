import React, { PureComponent } from 'react';
import { Row, Col, Card, Tree, Spin, Input, Icon } from 'antd';
import OopTable from '../OopTable';
import OopSearch from '../OopSearch';
import styles from './index.less';


const { TreeNode } = Tree
const { Search } = Input
const dataList = []
const getParentKey = (key, tree, props) => {
  let parentKey;
  const id = props.treeKey || 'key'
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item[id] === key)) {
        parentKey = node[id];
      } else if (getParentKey(key, node.children, props)) {
        parentKey = getParentKey(key, node.children, props);
      }
    }
  }
  return parentKey;
};
const generateList = (data, props) => {
  const key = props.treeKey || 'key';
  const title = props.treeTitle || 'title';
  const parentId = props.treeParentKey || 'parentId';
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    dataList.push({ key: node[key], title: node[title], parentId: node[parentId]});
    if (node.children) {
      generateList(node.children, props);
    }
  }
};
export default class OopTreeTable extends PureComponent {
  state = {
    currentSelectTreeNode: null,
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    selectedKeys: []
  }
  handleOnSelect = (treeNode, event)=>{
    if (event.selected) {
      this.setState({
        selectedKeys: [event.node.props.id]
      });
      const currentSelectTreeNode = treeNode.length ? {...event.node.props.dataRef} : null;
      this.setState({
        currentSelectTreeNode
      }, ()=>{
        const { onTableTreeNodeSelect } = this.props;
        if (onTableTreeNodeSelect) {
          // 传递了树节点点击的函数 并且 执行结果为 false 那么不继续执行
          if (onTableTreeNodeSelect(treeNode, event) === false) {
            return
          }
        }
        this.onLoad({
          pagination: {
            pageNo: 1,
            pageSize: 10
          }
        });
        this.table.clearSelection()
      });
    }
  }
  renderTreeNodes = (data, treeTitle, treeKey, treeRoot, searchValue)=> {
    const treeNodes = data.map((node) => {
      const item = {
        ...node,
      }
      item.title = item.title || node[treeTitle]
      item.key = item.key || node[treeKey]
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className={styles.primaryColor}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      item.title = title;
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            icon={ item.icon ? <Icon type={item.icon} /> : null }
            dataRef={item}
          >
            {this.renderTreeNodes(item.children, treeTitle, treeKey, null, searchValue)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
        {...item}
         dataRef={item}
         icon={ item.icon ? <Icon type={item.icon} /> : null } />);
    })
    return treeRoot ?
      (
        <TreeNode
          title={treeRoot.title}
          key={treeRoot.key}
          icon={ treeRoot.icon ? <Icon type={treeRoot.icon} /> : null }
          dataRef={{...treeRoot}}>
        {treeNodes}
        </TreeNode>)
      : treeNodes
  }
  handleOnChange = (e)=>{
    const { value } = e.target;
    const { tree } = this.props;
    const { treeData } = tree;
    generateList(treeData, tree)
    const expandedKeys = dataList.map((item) => {
      if (item.parentId === null) {
        return item.key
      }
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, treeData, tree);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      autoExpandParent: true,
      searchValue: value
    });
  }
  onLoad = (param)=>{
    this.props.table.onLoad(param)
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  getCurrentSelectTreeNode = ()=>{
    return {...this.state.currentSelectTreeNode}
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent, selectedKeys } = this.state;
    const treeConfig = this.props.tree;
    const tableConfig = this.props.table;
    const { treeData, treeTitle, treeKey, treeRoot, treeLoading} = treeConfig;
    const { gridLoading, grid, columns, topButtons = [], rowButtons = [], oopSearch } = tableConfig;
    const {size} = this.props;
    return (
      <Row gutter={16} className={styles.OopTreeTable}>
        <Col span={18} push={6}>
          <Card bordered={false} title={tableConfig.title}>
            <OopSearch
              {...oopSearch}
              ref={(el)=>{ this.oopSearch = el && el.getWrappedInstance() }}
            />
            <OopTable
              grid={grid}
              columns={columns}
              loading={gridLoading}
              onLoad={this.onLoad}
              size={size}
              topButtons={topButtons}
              rowButtons={rowButtons}
              {...tableConfig}
              ref={(el)=>{ this.table = el }}
            />
          </Card>
        </Col>
        <Col span={6} pull={18}>
          <Card bordered={false} title={treeConfig.title}>
            <Spin spinning={treeLoading}>
              <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.handleOnChange} />
              <Tree
                showIcon
                defaultExpandAll={true}
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={this.handleOnSelect}
                {...treeConfig}
                ref={(el)=>{ this.tree = el }}
                selectedKeys={selectedKeys}
              >
                {this.renderTreeNodes(treeData, treeTitle, treeKey, treeRoot, searchValue)}
              </Tree>
            </Spin>
          </Card>
        </Col>
      </Row>
    )
  }
}
