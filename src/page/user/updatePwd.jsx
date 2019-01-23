import React        from 'react';
import User         from '../../service/user-service.jsx'
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
const FormItem = Form.Item;
const _user = new User();

class UpdatePwd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            _id:this.props.match.params.userId,
            encryptPwd:'',
            oldPwd:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword  = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword   = this.validateToNextPassword.bind(this);
    }
    
 //初始化加载调用方法
    componentDidMount(){
    }

    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
        value = e.target.value.trim();
        this.setState({[name]:value}); 
        this.props.form.setFieldsValue({[name]:value});
    }
  
   //提交
handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values._id=this.state._id;
        _user.UpdatePwd(values).then(response => {
            if(response=='success'){
                alert("修改成功!");
                window.location.href="#/";
            }else if(response=='faile'){
                alert("修改失败，原密码不正确！");
            }else{
                alert("修改失败，请重新登录进行修改！");
            }
          }, errMsg => {
              this.setState({});
              localStorge.errorTips(errMsg);
          });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('encryptPwd')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
        <Card title='修改密码'>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="请输入原密码">
                    {getFieldDecorator('oldPwd', {
                      rules: [{required: true, message: '请输入原密码!'}],
                    })(
                      <Input type='password' name='oldPwd'/>
                    )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              
              <Col xs={24} sm={12}>
                  <FormItem  {...formItemLayout}  label="新密码" hideRequiredMark='true'>
                    {getFieldDecorator('encryptPwd', {
                      rules: [{
                        required: true, message: '请输入新密码!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" name='encryptPwd' onChange={(e) => this.onValueChange(e)} />
                    )}
                  </FormItem>
              </Col>
         </Row>
         <Row>
              <Col xs={24} sm={12}> 
                  <FormItem {...formItemLayout}  label="确认新密码" >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: '请再次输入新密码!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password"  onBlur={()=>this.handleConfirmBlur} />
                    )}
                  </FormItem> 
              </Col>
               </Row>
         
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href="#/"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(UpdatePwd);