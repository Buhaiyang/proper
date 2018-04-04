import React, { PureComponent } from 'react';
import { Row, Col, Card, Tree, Spin, Input } from 'antd';
import OopTable from '../OopTable';


const { TreeNode } = Tree
const { Search } = Input
export default class OopTreeTable extends PureComponent {
  state = {
    currentTreeNode: null,
  }
  handleOnSelect = (treeNode)=>{
    if (treeNode.length > 0) {
      this.state.currentTreeNode = treeNode[0].toString();
      this.onLoad(treeNode);
    }
    this.props.setParentNode(this.state.currentTreeNode);
  }
  renderTreeNodes = (data, treeTitle, treeKey, treeRoot)=> {
    const treeNodes = data.map((node) => {
      const item = {
        ...node,
      }
      item.title = item.title || node[treeTitle]
      item.key = item.key || node[treeKey]
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children, treeTitle, treeKey)}
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
    const v = e.target.value;
    console.log(v)
  }
  onLoad = (param)=>{
    this.props.onLoad(param)
  }
  render() {
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
                onSelect={this.handleOnSelect}
                ref={(el)=>{ this.tree = el }}
              >
                {this.renderTreeNodes(treeData, treeTitle, treeKey, treeRoot)}
              </Tree>
            </Spin>
          </Card>
        </Col>
      </Row>
    )
  }
}
