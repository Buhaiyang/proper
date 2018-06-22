import React from 'react';

export default class examDetails extends React.PureComponent {
  componentDidMount() {
    window.parent.postMessage(window.location.hash, '*');
  }
  render() {
    return (
      <div>
        <a href="#/customframe/exam" >去list页</a>
      <div>this is details</div>
      </div>
    )
  }
}
