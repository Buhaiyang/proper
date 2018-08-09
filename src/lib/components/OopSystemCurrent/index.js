import React, { PureComponent } from 'react';
import {Spin, Input } from 'antd';
import {connect} from 'dva/index';
import DescriptionList from '../../../framework/components/DescriptionList';
import {inject} from '../../../framework/common/inject';
import styles from './index.less';

const {Description} = DescriptionList;

@inject(['OopSystemCurrent$model', 'global'])
@connect(({ OopSystemCurrent$model, global, loading }) => ({
  OopSystemCurrent$model,
  loading: loading.effects['OopSystemCurrent$model/fetch'],
  global,
}))
export default class OopSystemCurrent extends PureComponent {
  state = {
    value: this.props.value || null
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if (nextProps.url && nextProps.OopSystemCurrent$model[nextProps.url]) {
      const value = nextProps.OopSystemCurrent$model[nextProps.url];
      this.setState({value: value.id});
    }
  }
  componentDidMount() {
    const { url } = this.props;
    if (url) {
      this.props.dispatch({
        type: 'OopSystemCurrent$model/fetch',
        payload: url,
        callback: (resp)=>{
          this.triggerChange(resp.result.id);
        }
      })
    }
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    if (this.props.onChange) {
      this.props.onChange(changedValue);
    }
  }
  renderResult = ()=>{
    const {OopSystemCurrent$model, showPropName, url} = this.props;
    const entity = OopSystemCurrent$model[url];
    if (entity) {
      if (typeof showPropName === 'undefined') {
        return entity.data;
      } else {
        return entity.data[showPropName];
      }
    }
  }
  render() {
    const {OopSystemCurrent$model, global: {size}, label, url, name, loading} = this.props;
    return (
      <div className={styles.container} style={{marginTop: 0}}>
        <Spin spinning={!!loading}>
          <DescriptionList col="1" size={size}>
            <div>
              {OopSystemCurrent$model[url] ? (<Input type="hidden" name={name} value={this.state.value} />) : null}
              <Description term={label}>{this.renderResult()}</Description>
            </div>
          </DescriptionList>
        </Spin>
      </div>);
  }
}
