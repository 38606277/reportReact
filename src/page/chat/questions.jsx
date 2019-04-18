import React        from 'react';
import Questionserver                 from '../../service/QuestionsService.jsx';
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const _ques = new Questionserver();
const Option = Select.Option;

class Questions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            ai_question_id:this.props.match.params.qId,
            ai_question:'',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.ai_question_id && ''!=this.state.ai_question_id  && 'null'!=this.state.ai_question_id){
            _ques.getQuestionInfo(this.state.ai_question_id).then(response => {
                this.setState(response.data);
                this.props.form.setFieldsValue({
                      ai_question:response.data.ai_question,
                      roai_question_idleId:response.data.ai_question_id,
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
          _ques.saveQuestionInfo(this.state).then(response => {
            if(null!=this.state.ai_question_id && ''!=this.state.ai_question_id  && 'null'!=this.state.ai_question_id){
                alert("修改成功");
            }else{
                alert("保存成功");
            }
            window.location.href="#chat/questionsList";
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
        <Card title={this.state._id=='null' ?'新建问题':'编辑问题'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="问题名称">
                    {getFieldDecorator('ai_question', {
                      rules: [{required: true, message: '请输入问题名称!'}],
                    })(
                      <Input type='text' name='ai_question'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              {/* <Col xs={24} sm={12}>
              <FormItem {...formItemLayout} label='是否启用' >
                    <Select  name='enabled' value={this.state.enabled.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('enabled',value)}>
                        <Option value='1' >启用</Option>
                        <Option value='0' >禁用</Option>
                        
                      </Select>
                  
                  </FormItem>
              </Col> */}
          </Row> 
          
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href="#/chat/questionsList"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(Questions);