import React, { PureComponent } from 'react';
import { Row, Col, Card, Tree, Spin, Input } from 'antd';
import OopTable from '../OopTable';


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
    currentTreeNode: null,
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true
  }
  handleOnSelect = (treeNode)=>{
    this.setState({
      currentTreeNode: treeNode
    }, ()=>{
      this.onLoad();
      this.table.clearSelection()
    })
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
          <span style={{ color: '#1DA57A' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      item.title = title;
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children, treeTitle, treeKey, null, searchValue)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    })
    return treeRoot ?
      (<TreeNode title={treeRoot.title} key={treeRoot.key}>{treeNodes}</TreeNode>)
      : treeNodes
  }
  handleOnChange = (e)=>{
    const me = this
    const { value } = e.target;
    generateList(this.props.treeData, this.props)
    const expandedKeys = dataList.map((item) => {
      if (item.parentId === null) {
        return item.key
      }
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, me.props.treeData, this.props);
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
    const p = {
      ...param,
      currentTreeNode: this.state.currentTreeNode
    }
    this.props.onLoad(p)
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  getCurrentTreeNode = ()=>{
    return {currentTreeNode: this.state.currentTreeNode}
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const { treeData, treeTitle, treeKey, treeRoot, gridLoading, grid,
      columns, treeLoading, topButtons = [], rowButtons = [], size } = this.props
    return (
      <Row gutter={16}>
        <Col span={18} push={6}>
          <Card bordered={false}>
            <OopTable
              grid={grid}
              columns={columns}
              loading={gridLoading}
              onLoad={this.onLoad}
              size={size}
              topButtons={topButtons}
              rowButtons={rowButtons}
              ref={(el)=>{ this.table = el }}
            />
          </Card>
        </Col>
        <Col span={6} pull={18}>
          <Card bordered={false}>
            <Spin spinning={treeLoading}>
              <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.handleOnChange} />
              <Tree
                defaultExpandAll={true}
                defaultSelectedKeys={treeRoot ? [treeRoot.key] : []}
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={this.handleOnSelect}
                ref={(el)=>{ this.tree = el }}
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
