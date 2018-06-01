import React from 'react';
import {formGenerator} from './utils';

export default class OopForm extends React.PureComponent {
  state = {
  }
  componentDidMount() {

  }
  render() {
    return formGenerator(this.props)
  }
}
