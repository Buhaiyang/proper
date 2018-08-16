import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Card, Tree, Spin, Input, Icon, Menu, Dropdown, Modal } from 'antd';
import OopTable from '../OopTable';
import OopSearch from '../OopSearch';
import styles from './index.less';

const {confirm} = Modal;
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
function setPosition(x, y, target) {
  setTimeout(
    () => {
      const popoverDom = document.querySelector('.ant-dropdown')
      target.appendChild(popoverDom)
      target.style.position = 'relative'
      popoverDom.style.top = `${target.offsetHeight}px`;
      popoverDom.children[0].style.paddingLeft = '0px';
      popoverDom.style.left = `${x + 5}px`;
    }, 0, y, x, target
  )
}
export default class OopTreeTable extends PureComponent {
  constructor(props) {
    super(props);
    const {tree: {_defaultSelectedKeys = []}} = props
    this.state = {
      currentSelectTreeNode: null,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      selectedKeys: [..._defaultSelectedKeys],
      popoverConfig: {
        treeMenuState: 'button',
        popoverY: null,
        popoverX: null,
        popoverInfo: null,
        popoverParentDom: null,
      }
    }
  }
  handleOnSelect = (treeNode, event)=>{
    if (event.selected) {
      const id = event.node.props.dataRef.id || event.node.props.dataRef.key;
      this.setState({
        selectedKeys: [id]
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
  handleOnRightClick = ({event, node}) => {
    if (!(this.props.tree.onRightClickConfig)) {
      return
    }
    const y = event.pageY;
    const x = event.target.offsetWidth
    setPosition.call(this, x, y, event.target)
    this.props.tree.onRightClickConfig.rightClick(node.props.dataRef)
    this.props.tree.onRightClickConfig.menuVisible(true)
    const data = {
      popoverY: y,
      popoverX: x,
      popoverInfo: node,
      treeMenuState: 'button',
      popoverParentDom: event.target
    }
    this.setState({
      popoverConfig: data
    });
  }
  confirm = (item) => {
    this.props.tree.onRightClickConfig.menuVisible(false)
    const {props} = this.state.popoverConfig.popoverInfo;
    const { onClick } = item;
    confirm({
      title: item.confirm,
      onOk() {
        onClick(props)
      },
      onCancel() {
      },
    });
  }
  handleVisibleChange = () => {
    this.props.tree.onRightClickConfig.menuVisible(false)
  }
  handelPopover = (type) =>{
    const x = this.state.popoverConfig.popoverX;
    const y = this.state.popoverConfig.popoverY;
    const dom = this.state.popoverConfig.popoverParentDom;
    setPosition.call(this, x, y, dom)
    this.setState({
      popoverConfig: {
        ...this.state.popoverConfig,
        treeMenuState: type.key
      },
    });
  }
  renderTreeNodes = (data = [], treeTitle, treeKey, treeRoot, searchValue)=> {
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
    let menuList = null;
    if ((this.props.tree.onRightClickConfig)) {
      const {menuList: temp} = this.props.tree.onRightClickConfig
      menuList = temp
    }
    const { searchValue, expandedKeys, autoExpandParent, selectedKeys } = this.state;
    const treeConfig = this.props.tree;
    const tableConfig = this.props.table;
    const { treeData, treeTitle, treeKey, treeRoot, treeLoading, _defaultSelectedKeys, } = treeConfig;
    const { gridLoading, grid, columns, topButtons = [], rowButtons = [], oopSearch } = tableConfig;
    const {size} = this.props;
    if (selectedKeys.length === 0 && _defaultSelectedKeys) {
      _defaultSelectedKeys.forEach((item) => {
        selectedKeys.push(item);
      });
    }
    let menuHTML = null;
    menuList && (this.state.popoverConfig.treeMenuState === 'button' ? menuHTML = (
          <Menu style={{width: 140}}>
            {
              menuList.map((item)=>{
                const {name} = item;
                if (!item.confirm) {
                  return (
                    <Menu.Item key={name} onClick={(nameParam)=>{ this.handelPopover(nameParam) }}>
                    <div style={{paddingLeft: 5}}>
                      <Icon type={item.icon} style={{fontSize: 16}} />
                          <span style={{paddingLeft: 8}}>{item.text}</span>
                          </div>
                    </Menu.Item>
                  )
                } else {
                  return (
                    <Menu.Item key={name}>
                      <div onClick={()=>{ this.confirm(item) }} style={{paddingLeft: 5}}>
                        <Icon type={item.icon} style={{ fontSize: 16}} />
                          <span style={{paddingLeft: 8}}>{item.text}</span>
                      </div>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>) : menuHTML = (
            <li key="other" >
              {menuList.map((item) => {
                if (item.name === this.state.popoverConfig.treeMenuState) {
                  return (
                  <Fragment key={item.name}>{item.render}</Fragment>
                );
                }
                return null
              })
            }
          </li>)
    )
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
              <Search style={{ marginBottom: 8}} placeholder="搜索" onChange={this.handleOnChange} />
              {menuList && (
              <Dropdown
                style={{zIndex: 1000}}
                overlay={menuHTML}
                trigger={['click']}
                visible={this.props.tree.onRightClickConfig.treeMenuVisible }
                onVisibleChange={this.handleVisibleChange}
                ref={(el)=>{ this.popover = el }}
              >
              <div />
              </Dropdown>)
            }
                <Tree
                  showIcon
                  defaultExpandAll={true}
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onSelect={this.handleOnSelect}
                  selectedKeys={selectedKeys}
                  {...treeConfig}
                  ref={(el)=>{ this.tree = el }}
                  onRightClick={this.handleOnRightClick}
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
