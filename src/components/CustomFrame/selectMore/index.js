import React from 'react';
import { Checkbox } from 'antd';

export default class SelectMore extends React.PureComponent {
  render() {
    const { item, handlSelectMoreChange } = this.props;

    const options = item.choice;

    item.choice.map((it, index) => {
      options[index].label = it.choiceName;
      options[index].value = it.choiceId;
      return null;
    });

    const checkStyle = {
      display: 'block',
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
      margin: '0 0 5px 0'
    };

    return (
      <div>
        {
          item && item.choice ? (
            <div>
              {
                <Checkbox.Group
                  style={checkStyle}
                  options={options}
                  onChange={value => handlSelectMoreChange(value, item.questionId)} />
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}