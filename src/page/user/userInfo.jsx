import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import './../../App.css';
import PageTitle    from 'component/page-title/index.jsx';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { Form, Input, Select,Button, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

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
            _id:this.props.params.userId,
            userName:'',
            isAdmin:'0',
            regisType:'local',
            encryptPwd:'',
            startDate:'',
            endDate:'',
            description:'',
            userId:''
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword  = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword   = this.validateToNextPassword.bind(this);
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state._id && ''!=this.state._id  && 'null'!=this.state._id){
            _user.getUserInfo(this.state._id).then(res => {
                this.setState(res.userInfo);
                this.props.form.setFieldsValue({
                      userName:res.userInfo.userName,
                      encryptPwd:res.userInfo.encryptPwd,
                      startDate:moment(res.userInfo.startDate,dateFormat),
                      endDate:moment(res.userInfo.endDate,dateFormat),
                      description:res.userInfo.description,
                      userId:res.userInfo.userId,
                      confirm:''
                });
            }, errMsg => {
                this.setState({
                });
                _mm.errorTips(errMsg);
            });
        }
        
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

   //提交
handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(this.state);
        console.log(values);
          _user.saveUserInfo(this.state).then(res => {
            console.log("success");
          }, errMsg => {
              this.setState({
              });
              _mm.errorTips(errMsg);
          });
        //console.log('Received values of form: ', this.state);
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
        <PageTitle title={this.state._id=='null' ?'新建用户':'编辑用户'} />
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入用户名!'}],
            })(
              <Input type='text' name='userName'  onChange={(e) => this.onValueChange(e)}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='用户编号' >
            {getFieldDecorator('userId', {
              rules: [{ required: true, message: '请输入用户编号!', whitespace: true }],
            })(
              <Input  type='text' name='userId' onChange={(e) => this.onValueChange(e)} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='用户归属' >
             <Select  name='regisType' value={this.state.regisType.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('regisType',value)}>
                <Option value='erp' >ERP用户</Option>
                <Option value='local' >本地用户</Option>
                
              </Select>
          
          </FormItem>

           <FormItem  {...formItemLayout}  label="密码" hideRequiredMark='true'>
            {getFieldDecorator('encryptPwd', {
              rules: [{
                required: false, message: '请输入密码!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" name='encryptPwd'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout}  label="确认密码" >
            {getFieldDecorator('confirm', {
              rules: [{
                required: false, message: '请再次输入密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem> 
         
         <FormItem {...formItemLayout} label='用户角色'>
              <Select  name='isAdmin' value={this.state.isAdmin.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('isAdmin',value)}>
                <Option value='0' >普通员工</Option>
                <Option value='1' >管理员</Option>
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
          <FormItem {...formItemLayout} label='备注'>
            {getFieldDecorator('description', {
                   rules: [{ required: true, message: '请输入备注!'}],
            })(
                <TextArea  type='text' name='description'   onChange={(e) => this.onValueChange(e)}></TextArea>
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
const WrappedUserInfo = Form.create()(UserInfo);

export default WrappedUserInfo;