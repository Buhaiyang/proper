import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export default class SelectOne extends React.PureComponent {
  render() {
    const { item, handlSelectOneChange } = this.props;

    const radioStyle = {
      display: 'block',
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      whiteSpace: 'normal',
      margin: '0 0 5px 0'
    };

    return (
      <div>
        {
          item ? (
            <div>
              {
                <RadioGroup
                  key={item.questionId}
                  onChange={value => handlSelectOneChange(value, item.questionId)}>
                  {
                    item.choice.map(citem => (
                      <Radio key={citem.choiceId} style={radioStyle} value={citem.choiceId}>
                        {citem.choiceName}
                      </Radio>
                    ))
                  }
                </RadioGroup>
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}