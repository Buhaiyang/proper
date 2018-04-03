import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export default class SelectOne extends React.PureComponent {
  render() {
    const { item, handlSelectOneChange, hasAnswer } = this.props;

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
                  defaultValue={item.answer ? item.answer[0] : null}
                  onChange={value => handlSelectOneChange(value, item.questionId)}>
                  {
                    item.choice.map(citem => (
                      <Radio
                        disabled={hasAnswer}
                        key={citem.choiceId}
                        style={radioStyle}
                        value={citem.choiceId}>
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