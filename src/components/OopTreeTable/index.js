import React, { PureComponent } from 'react';
import { Row, Col, Card, Tree, Spin } from 'antd';
import OopTable from '../OopTable';


const { TreeNode } = Tree
export default class OopTreeTable extends PureComponent {
  state = {
    // currentTreeNode: '',
  }
  handleOnSelect = (treeNode)=>{
    this.onLoad(treeNode)
  }
  renderTreeNodes = (data)=>{
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  onLoad = (param)=>{
    this.props.onLoad(param)
  }
  render() {
    const { treeData, gridLoading, grid,
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
              <Tree
                defaultSelectedKeys={['-1']}
                defaultExpandedKeys={['-1']}
                onSelect={this.handleOnSelect}
                ref={(el)=>{ this.tree = el }}
              >
                <TreeNode title="菜单" key="-1">
                  {this.renderTreeNodes(treeData)}
                </TreeNode>
              </Tree>
            </Spin>
          </Card>
        </Col>
      </Row>
    )
  }
}
