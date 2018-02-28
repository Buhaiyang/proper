import React from 'react';
import { connect } from 'dva';
import { Input, Tooltip } from 'antd';
import {inject} from '../../common/inject';
import { throttle } from '../../utils/utils';
import styles from './index.less';
/*  光标向前直到空格之前的字符串 */
const getCursorBackToWhitespaceValue = (element) =>{
  const { value, selectionStart } = element;
  // console.log('光标开始位置：：：：' + start)
  if (selectionStart === value.length) {
    return value.split(' ').pop();
  } else {
    const end = selectionStart;
    let i = selectionStart;
    for (; i < value.length; i--) {
      if (value[i - 1] === ' ' || i === 0) {
        break;
      }
    }
    // console.log('匹配的值:::::' + value.substring(i, end))
    return value.substring(i, end)
  }
}
/* 光标向后直到空格之前的字符串 */
const getCursorForwardWhitespaceValue = (element)=>{
  const { value, selectionStart } = element;
  if (selectionStart === value.length) {
    return '';
  } else {
    const begin = selectionStart;
    let i = selectionStart;
    for (; i < value.length; i++) {
      if (value[i] === ' ' || i === value.length) {
        break;
      }
    }
    return value.substring(begin, i)
  }
}
/* 计算页面中的文本宽度 */
const calculateLetterWidth = (letter, size)=>{
  const constant = ['并且', '或者'];
  if (constant.indexOf(letter) !== -1) {
    return 40
  }
  const span = document.createElement('span');
  span.innerText = letter
  span.style.fontSize = size
  document.body.append(span)
  const length = span.offsetWidth;
  span.remove();
  return length;
}

const getSize = (size)=>{
  const arr = ['default', 'small', 'middle', 'large'];
  const index = arr.indexOf(size);
  if (index === -1) {
    return 'default'
  } else if (index === 2) {
    return 'default'
  } else {
    return arr[index]
  }
}
const { Search } = Input;
@inject('global')
@connect(({global})=>({global}))
export default class OSearch extends React.Component {
  state={
    showDropMenu: false,
    inputValueArr: [],
    searchOptionsDesc: [],
    inputValue: '',
    defaultValue: ''
  }
  // 获取下拉菜单
  getSearchOptions = (query)=>{
    const { dispatch, onSuggest } = this.props;
    const element = this.inputOSearch.input.input;
    const matchStr = getCursorBackToWhitespaceValue(element)
    // input如果有值
    if (query) {
      if (matchStr) {
        onSuggest && onSuggest(query, matchStr)
      } else {
        dispatch({
          type: 'global/saveLogicData'
        })
      }
    } else {
      dispatch({
        type: 'global/showHistory'
      })
    }
  }
  // 根据input框触发最终查询
  handleButtonClick = ()=>{
    // console.log(value,'search grid')
    const param = [];
    this.state.searchOptionsDesc.forEach((sod) => {
      param.push({
        key: sod.id,
        value: sod.label,
        operate: sod.operate,
        table: sod.table
      });
    });
    // 默认不 显示 列表
    console.log(param);
    if (param.length === 0) {
      return
    }
    const { onSearchResult } = this.props;
    onSearchResult && onSearchResult(param)
  }
  // 下拉框点击事件
  handleOptionSelect = (event, option)=>{
    // 阻止传播 和 默认行为
    event.preventDefault()
    event.stopPropagation()
    if (!option) {
      return
    }
    // 隐藏下拉菜单
    this.setState({
      showDropMenu: false
    })
    const optionLabel = option.label;
    const { desc } = option;
    const element = this.inputOSearch.input.input;
    const str = getCursorBackToWhitespaceValue(element) + getCursorForwardWhitespaceValue(element);
    console.log('=====================:光标当前值：', str);
    const { inputValueArr, searchOptionsDesc } = this.state;
    let i = inputValueArr.length;
    inputValueArr.forEach((value, index) => {
      if (value === str) {
        i = index
      }
    });
    inputValueArr[i] = optionLabel;
    // 处理tips
    if (inputValueArr.length === searchOptionsDesc.length) {
      searchOptionsDesc[i] = {
        id: option.id,
        label: optionLabel,
        text: desc || '',
        width: `${calculateLetterWidth(optionLabel, '16px')}px`,
        operate: option.operate || 'like',
        isTips: desc
      }
    } else {
      searchOptionsDesc.push({
        id: option.id,
        label: optionLabel,
        text: desc || '',
        width: `${calculateLetterWidth(optionLabel, '16px')}px`,
        table: option.table,
        operate: option.operate || 'like',
        isTips: desc
      })
    }
    this.setState({
      inputValueArr,
      inputValue: inputValueArr.join(' '),
      searchOptionsDesc: searchOptionsDesc || []
    })
    // 清空下拉
    this.clearSearchOption()
  }
  // input框点击 事件
  inputClick = (event)=>{
    const { value } = event.currentTarget;
    // const matchStr = getCursorBackToWhitespaceValue(element);
    this.inputChangeOrClick(value);
  }
  // input框改变 事件
  inputChange = (event)=>{
    const { value } = event.currentTarget;
    this.setState({
      inputValue: value || '',
      inputValueArr: value ? value.split(' ') : [],
    })
    const { searchOptionsDesc } = this.state;
    if (value && searchOptionsDesc.length - this.state.inputValueArr.length === 1) {
      searchOptionsDesc.pop();
      this.setState({
        searchOptionsDesc
      })
    }
    if (!value) {
      this.setState({
        searchOptionsDesc: []
      })
    }
    throttle(this.inputChangeOrClick, this, 500, value, 3000);
  }
  inputChangeOrClick = (inputValue)=>{
    this.setState({
      showDropMenu: true
    })
    this.getSearchOptions(inputValue)
  }
  // 监听按键
  inputKeyDown = (event)=>{
    const isOpen = this.state.showDropMenu;
    if (isOpen) {
      const { keyCode } = event;
      switch (keyCode) {
        case 13:
          event.preventDefault();
          event.stopPropagation();
          this.handleOptionSelect(event,
            this.props.global.searchOptions[this.getCurrentPreActive()]);
          break
        case 38:
          event.preventDefault();
          this.setPreActive(false)
          break
        case 40:
          event.preventDefault();
          this.setPreActive(true)
          break
        case 37:
          setTimeout(()=> {
            throttle(this.inputChangeOrClick, this, 50, this.state.inputValue, 3000);
          })
          break
        case 39:
          setTimeout(()=> {
            throttle(this.inputChangeOrClick, this, 50, this.state.inputValue, 3000);
          })
          break
        default: 100;
      }
    }
  }
  getCurrentPreActive = ()=>{
    let i = 0;
    const { searchOptions } = this.props.global;
    searchOptions.forEach((value, index) =>{
      if (value.preActive === true) {
        i = index
        return false
      }
    })
    return i
  }
  // 下拉菜单的上一个(false)和下一个(true)
  setPreActive = (flag)=>{
    const { searchOptions } = this.props.global;
    if (searchOptions.length === 0) {
      return
    }
    let currentIndex = this.getCurrentPreActive();
    let current = null;
    searchOptions[currentIndex].preActive = false;
    if (flag) {
      currentIndex++;
      if (currentIndex === searchOptions.length) {
        [current] = searchOptions;
      }
    } else {
      currentIndex--;
      if (currentIndex < 0) {
        current = searchOptions[searchOptions.length - 1]
      }
    }
    if (current === null) {
      current = searchOptions[currentIndex];
    }
    current.preActive = true;
    this.forceUpdate()
  }
  handleMaskClick = ()=>{
    this.setState({
      showDropMenu: false
    })
  }
  clearSearchOption = ()=>{
    this.props.dispatch({
      type: 'global/clearSearchData'
    })
  }
  onMouseOver = (event)=>{
    console.log(event.currentTarget)
  }
  render() {
    const {searchOptions, placeholder, enterButtonText, size} = this.props;
    return (
      <div className={styles.globalSearchWrapper}>
        <div className={styles.searchContainer}>
          <div className={styles.searchTips}>
            <ul>
              { this.state.searchOptionsDesc.map(tips=>
                (
                  <li key={tips.id}>
                  <Tooltip placement="bottom" title={tips.text}>
                    <span
                      className={tips.isTips ? styles.tips : ''}
                       style={{height: '12px', display: 'inline-block', whiteSpace: 'nowrap', width: tips.width}}
                            />
                  </Tooltip>
                </li>
                )
              )}
            </ul>
          </div>
          <Search
                  placeholder={placeholder}
                  enterButton={enterButtonText}
                  size={getSize(size)}
                  ref={(el)=>{ this.inputOSearch = el }}
                  defaultValue={this.state.defaultValue}
                  value={this.state.inputValue}
                  onSearch={this.handleButtonClick}
                  onClick={this.inputClick}
                  onChange={this.inputChange}
                  onKeyDown={this.inputKeyDown}
                  onBlur={this.inputBlur} />
          {this.state.showDropMenu && (
            <div className={styles.dropDown}>
            <ul className="ant-menu ant-menu-light ant-menu-root ant-menu-vertical">
              {!searchOptions.length ? '' : searchOptions.map(option =>
                (
                  <li
                    className={`ant-select-dropdown-menu-item ${(option.preActive ? styles.preActive : '')}`}
                    key={option.id}
                    onClick={event=>this.handleOptionSelect(event, option)}>
                  <a>
                    <span className={styles.name}>
                      <span className={styles.match}>{ option.matchLabel }</span>
                      <span>{ option.unMatchLabel}</span>
                    </span>
                    <span className={styles.desc}>{ option.desc}</span>
                  </a>
                </li>
                )
              )}
            </ul>
          </div>)}
        </div>
      {this.state.showDropMenu &&
        (
          <div className={styles.mask} onClick={this.handleMaskClick} />
        )
      }
      </div>
    );
  }
}

