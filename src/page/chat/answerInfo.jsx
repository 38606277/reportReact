import React        from 'react';
import Questionserver                 from '../../service/QuestionsService.jsx';
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const _ques = new Questionserver();
const Option = Select.Option;

class AnswerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            answer_id:this.props.match.params.aId,
            question_id:this.props.match.params.qId,
            current:'',
            answer:'',
            creat_by:localStorge.getStorage('userInfo').userId
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.answer_id && ''!=this.state.answer_id  && 'null'!=this.state.answer_id){
            _ques.getAnswerId(this.state.answer_id).then(response => {
                this.setState(response.data);
                this.props.form.setFieldsValue({
                    answer_id:response.data.answer_id,
                    question_id:response.data.question_id,
                    current:response.data.current,
                    answer:response.data.answer,
                    creat_by:response.data.creat_by,
                    confirm:''
                });
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
        }
        
    }

    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
            this.setState({[name]:value});  
           this.props.form.setFieldsValue({[name]:value});
      
    }
    //编辑字段对应值
    onSelectChange(name,value){
         this.setState({[name]:value});  
         this.props.form.setFieldsValue({[name]:value});
    }
   //提交
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          _ques.saveAnswerInfo(this.state).then(response => {
            if(null!=this.state.answer_id && ''!=this.state.answer_id  && 'null'!=this.state.answer_id){
                alert("修改成功");
            }else{
                alert("保存成功");
            }
            window.location.href="#chat/answerList/"+this.state.question_id;
          }, errMsg => {
              this.setState({
              });
              localStorge.errorTips(errMsg);
          });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
   
    return (
        <div id="page-wrapper">
        <Card title={this.state._id=='null' ?'新建回答':'编辑回答'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="回答">
                    {getFieldDecorator('answer', {
                      rules: [{required: true, message: '请输入回答!'}],
                    })(
                      <Input type='text' name='answer'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label='是否默认' >
                    <Select  name='current' value={this.state.current.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('current',value)}>
                        <Option value='1' >是</Option>
                        <Option value='0' >否</Option>
                        
                      </Select>
                  
                  </FormItem>
              </Col>
          </Row> 
          
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href={"#/chat/answerList/"+this.state.question_id}  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(AnswerInfo);