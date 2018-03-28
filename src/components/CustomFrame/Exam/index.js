import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Icon } from 'antd';
import styles from './index.less';
import { inject } from './../../../common/inject';
import SelectOne from './../SelectOne/index';
import SelectMore from './../selectMore/index';

const { TextArea } = Input;

@inject(['baseFrame', 'global'])
@connect(({ baseFrame, global, loading }) => ({
  baseFrame,
  global,
  loading: loading.models.baseFrame
}))
export default class Exam extends React.PureComponent {
  state = {
    answer: [],
    inputValue: ''
  }
  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.dispatch({
      type: 'baseFrame/fetch'
    });
  }

  // 单选
  handlSelectOneChange = (val, questionId) => {
    this.state.answer.splice(
      this.state.answer.findIndex(item => item.questionId === questionId), 1);
    const obj = {
      questionId,
      choidId: val.target.value
    }
    this.state.answer.push(obj);
  }

  // 多选
  handlSelectMoreChange = (val, questionId) => {
    this.state.answer.splice(
      this.state.answer.findIndex(item => item.questionId === questionId), 1);
    const obj = {
      questionId,
      choidId: val.toString()
    }
    this.state.answer.push(obj);
  }

  // 填空
  handleInputChange = (val) => {
    console.log(val);
  }

  render() {
    const { baseFrame: {examContent, examLists } } = this.props;
    const { inputValue } = this.state;

    return (
      <div className={styles.examWrapper}>
        <header className={styles.examName}>{examContent.name}</header>
        <Row>
          <Col span={20} offset={2}>
            {
              examLists.length > 0 ? (
                <div>
                  {examLists.map((item) => {
                    let component;
                    if (item.type === 'SELECT_ONE') {
                      component = <SelectOne key={`select_one_${item.questionId}`} item={item} handlSelectOneChange={this.handlSelectOneChange} />;
                    }
                    if (item.type === 'SELECT_MORE') {
                      component = <SelectMore key={`select_one_${item.questionId}`} item={item} handlSelectMoreChange={this.handlSelectMoreChange} />;
                    }
                    if (item.type === 'FILL_IN') {
                      component = <Input value={inputValue} onChange={this.handleInputChange(inputValue, item.questionId)} placeholder="填写答案，空格分隔" />
                    }
                    if (item.type === 'SUBJECTIVE_ITEM') {
                      component = <TextArea style={{marginBottom: '5px'}} placeholder="填写答案" autosize={{ minRows: 2 }} />
                    }
                    return (
                      <div key={`questionId_${item.questionId}`}>
                        <p style={{margin: '15px 0 10px 0', fontWeight: 'bold'}}>
                          <Icon type="edit" style={{marginRight: '5px'}} />
                          <span>
                            {item.type === 'SELECT_ONE' ? '(单选)' :
                              (item.type === 'SELECT_MORE') ? '(多选)' :
                                (item.type === 'FILL_IN') ? '(填空)' : '(简答)'}
                          </span>
                          {item.questionName}
                        </p>
                        {component}
                      </div>
                    );
                  })}
                  <Button type="primary" style={{margin: '50px 0', width: '100%'}}>提交试卷</Button>
                </div>
              ) : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}