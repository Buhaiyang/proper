import React, { Component } from 'react';
import { Form } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import DrageItem from './DrageItem';

@DragDropContext(HTML5Backend)
export default class FormContainer extends Component {
  moveCard = (dragIndex, hoverIndex) => {
    const { onMove } = this.props;
    onMove(dragIndex, hoverIndex);
  }
  render() {
    const { formItemList } = this.props;
    return (
      <div className={this.props.className}>
        <Form layout={this.props.formLayout}>
          {formItemList.map((item, index) => (
            <DrageItem
              key={item.key}
              index={index}
              component={item}
              moveCard={this.moveCard}
            />)) }
        </Form>
      </div>
    )
  }
}
