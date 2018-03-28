import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Icon, Modal } from 'antd';
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
    let index = -1;
    index = this.state.answer.findIndex(item => item.questionId === questionId);
    if (index !== -1) {
      this.state.answer.splice(index, 1);
    }
    const obj = {
      questionId,
      choidId: val.target.value
    }
    this.state.answer.push(obj);
  }

  // 多选
  handlSelectMoreChange = (val, questionId) => {
    let index = -1;
    index = this.state.answer.findIndex(item => item.questionId === questionId);
    if (index !== -1) {
      this.state.answer.splice(index, 1);
    }
    const obj = {
      questionId,
      choidId: val.toString()
    }
    this.state.answer.push(obj);
  }

  // 填空和简答
  handleInputChange = (val, questionId) => {
    const { value } = val.target;
    let index = -1;
    index = this.state.answer.findIndex(item => item.questionId === questionId);
    if (index !== -1) {
      this.state.answer.splice(index, 1);
    }
    const obj = {
      questionId,
      answer: value
    }
    this.state.answer.push(obj);
  }

  // 弹出提示框
  showConfirm = () => {
    const self = this;
    Modal.confirm({
      title: '确认提交试卷吗?',
      content: '提交试卷后无法撤销更改',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        self.props.dispatch({
          type: 'baseFrame/submit',
          payload: self.state.answer,
        });
      },
    });
  }

  render() {
    const { baseFrame: {examContent, examLists } } = this.props;

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
                      component =
                        (<Input
                            onChange={value => this.handleInputChange(value, item.questionId)}
                            placeholder="填写答案，空格分隔" />
                        );
                    }
                    if (item.type === 'SUBJECTIVE_ITEM') {
                      component =
                        (<TextArea
                            onChange={value => this.handleInputChange(value, item.questionId)}
                            style={{marginBottom: '5px'}}
                            placeholder="填写答案"
                            autosize={{ minRows: 2 }} />
                        )
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
                  <Button
                    type="primary"
                    onClick={this.showConfirm}
                    style={{margin: '50px 0', width: '100%'}}>提交试卷</Button>
                </div>
              ) : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}