import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import './../../App.css';
import PageTitle    from 'component/page-title/index.jsx';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { Form, Input, Select,  Checkbox, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const _mm   = new MUtil();
const _user = new User();
const dateFormat = 'YYYY-MM-DD';
const RangePicker = DatePicker.RangePicker;

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            userId:this.props.match.params.userId,
            userName:'',
            isAdmin:'',
            regisType:'',
            encryptPwd:'',
            startDate:'',
            endDate:'',
            description:''
            
        };
        this.selectOption = this.selectOption.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword  = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword   = this.validateToNextPassword.bind(this);
    }
    
   selectOption(e){
        let name = e.target.name,
            value = e.target.value.trim();
        //this.state.userInfo.regisType= value;
       // this.state.userInfo = update(this.state.userInfo, {[name]: {$apply: function(x) {return value;}}});
        //this.setState(this.state.userInfo)    
        this.setState({[name]:value});       
    };
//初始化加载调用方法
    componentDidMount(){
       
        _user.getUserInfo(this.state.userId).then(res => {
            this.setState(res.userInfo);
            this.props.form.setFieldsValue({
                  userName:res.userInfo.userName,
                  regisType:res.userInfo.regisType,
                  isAdmin:res.userInfo.isAdmin,
                  encryptPwd:res.userInfo.encryptPwd,
                  startDate:moment(res.userInfo.startDate,dateFormat),
                  endDate:moment(res.userInfo.endDate,dateFormat),
                  description:res.userInfo.description,
                  userId:res.userInfo.userId
            });
        }, errMsg => {
            this.setState({
            });
            _mm.errorTips(errMsg);
        });
       
        
    }

    //保存数据
    onSubmit(){
        console.log(this.state);
    }
    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
           // this.state.userInfo = update(this.state.userInfo, {[name]: {$apply: function(x) {return value;}}});
           // this.setState(this.state.userInfo);
           this.setState({[name]:value});  
           this.props.form.setFieldsValue({[name]:value});
      
    }
    //编辑字段对应值
    onSelectChange(name,value){
         this.setState({[name]:value});  
         this.props.form.setFieldsValue({[name]:value});
    
  }
    onValueChangeDate(name,date,dateString){
       this.setState({[name]:dateString});
       this.props.form.setFieldsValue({[name]:dateString});
    }

   
handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', this.state);
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
        <PageTitle title='编辑用户' />
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入用户名!'}],
            })(
              <Input type='text' name='userName' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='用户归属' >
            {getFieldDecorator('regisType', {
              rules: [{ required: true, message: 'Please input your nickname!'}],
            })(
              <Input  type='text' name='regisType'/>
            )}
          </FormItem>

          {/* <FormItem  {...formItemLayout}  label="密码" >
            {getFieldDecorator('password', {
              rules: [{
                required: false, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="text" name='password'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout}  label="确认密码" >
            {getFieldDecorator('confirm', {
              rules: [{
                required: false, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem> */}
          <FormItem {...formItemLayout} label='用户编号' >
            {getFieldDecorator('userId', {
              rules: [{ required: true, message: '请输入用户编号!', whitespace: true }],
            })(
              <Input  type='text' name='userId' value={this.state.userId}/>
            )}
          </FormItem>
         <FormItem {...formItemLayout} label='用户角色'>
              <Select   key={1} name="isAdmin"  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('isAdmin',value)}>
                <Option key='0' value='0' >本地用户</Option>
                <Option key='1' value='1' >管理员</Option>
              </Select>
           
         </FormItem>
          <FormItem {...formItemLayout} label='开始时间'>
              {getFieldDecorator('startDate',{
                rules:[{required: true, message: '请选择开始时间!'}],
              })(
                 <DatePicker name='startDate' onChange={(date,dateString) => this.onValueChangeDate('startDate',date,dateString)}  locale={locale}  placeholder="请选择开始时间" />
              )}
          </FormItem>

        
           <FormItem {...formItemLayout} label='失效时间'>
              {getFieldDecorator('endDate',{
                rules:[{required: true, message: '请选择失效时间!'}],
              })(
                 <DatePicker name='endDate' onChange={(date,dateString) => this.onValueChangeDate('endDate',date,dateString)} locale={locale}  placeholder="请选择失效时间" />
              )}
          </FormItem> 
          
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>
      </Form>
      </div>
    );
  }
}



//export default UserInfo;
const WrappedUserInfo = Form.create()(UserInfo);

export default WrappedUserInfo;