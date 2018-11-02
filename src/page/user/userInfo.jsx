import React        from 'react';
import User         from '../../service/user-service.jsx'
import createHistory from 'history/createBrowserHistory';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const _user = new User();
const dateFormat = 'YYYY-MM-DD';
const RangePicker = DatePicker.RangePicker;

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            _id:this.props.match.params.userId,
            userName:'',
            isAdmin:'',
            regisType:'local',
            encryptPwd:'',
            startDate:'',
            endDate:'',
            description:'',
            userId:'',
            isw:false,
            roleList:[],
            isAdminText:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword  = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword   = this.validateToNextPassword.bind(this);
    }
    
 //初始化加载调用方法
    componentDidMount(){
      if(this.state._id=='1'){
        window.location.href="#/user/userView/"+this.state._id;
      }else{
        _user.getRoleListByUserId(this.state._id).then(response=>{
          const children=[];
            let rlist=response.roleList;
            let urlist=response.userroleList;
            for (let i = 0; i < rlist.length; i++) {
              children.push(<Option key={rlist[i].roleId}>{rlist[i].roleName}</Option>);
            }
            this.setState({roleList:children,isAdminText:urlist},function(){
              this.props.form.setFieldsValue({ isAdminText:this.state.isAdminText});
            });
          });
           if(null!=this.state._id && ''!=this.state._id  && 'null'!=this.state._id){
                _user.getUserInfo(this.state._id).then(response => {
                    this.setState(response.data.userInfo);
                   // this.props.form.setFieldsValue(response.data.userInfo);
                   //console.log(this.state.isAdminText);
                    this.props.form.setFieldsValue({
                          userName:response.data.userInfo.userName,
                          encryptPwd:response.data.userInfo.encryptPwd,
                          startDate:moment(response.data.userInfo.startDate,dateFormat),
                          endDate:moment(response.data.userInfo.endDate,dateFormat),
                          description:response.data.userInfo.description,
                          userId:response.data.userInfo.userId,
                          confirm:''
                    });
                }, errMsg => {
                    this.setState({
                    });
                    localStorge.errorTips(errMsg);
                });
            }
        }
        
      }

    
    //编辑字段对应值
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
           // this.state.userInfo = update(this.state.userInfo, {[name]: {$apply: function(x) {return value;}}});
           // this.setState(this.state.userInfo);
          
           if(name=="encryptPwd"){
                this.setState({[name]:value,isw:true});
            }else{
                this.setState({[name]:value});  
            }
           this.props.form.setFieldsValue({[name]:value});
      
    }
    //编辑字段对应值
    onSelectChange(name,value){
          if(name=="isAdminText"){
           let valuess=value.join(",");
            this.setState({[name]:valuess}); 
          }else{
            this.setState({[name]:value}); 
          }
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
        //let  users=this.props.form.getFieldsValue();
        //  console.log(this.state);
        // console.log(values);
          _user.saveUserInfo(this.state).then(response => {
            if(null!=this.state._id && ''!=this.state._id  && 'null'!=this.state._id){
              alert("修改成功");
          }else{
              alert("保存成功");
          }
            window.location.href="#user/userList";
          }, errMsg => {
              this.setState({
              });
              localStorge.errorTips(errMsg);
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
    const isss=this.state.isw;
    let nones='0';
    if(isss){
      nones='12';
    }
    return (
        <div id="page-wrapper">
        <Card title={this.state._id=='null' ?'新建用户':'编辑用户'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col span={12}>
                  <FormItem {...formItemLayout} label="用户名">
                    {getFieldDecorator('userName', {
                      rules: [{required: true, message: '请输入用户名!'}],
                    })(
                      <Input type='text' name='userName'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col span={12}>
                  <FormItem {...formItemLayout} label='用户编号' >
                    {getFieldDecorator('userId', {
                      rules: [{ required: true, message: '请输入用户编号!', whitespace: true }],
                    })(
                      <Input  type='text' name='userId' onChange={(e) => this.onValueChange(e)} />
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <Row>
              
              <Col span={12}>
                  <FormItem  {...formItemLayout}  label="密码" hideRequiredMark='true'>
                    {getFieldDecorator('encryptPwd', {
                      rules: [{
                        required: true, message: '请输入密码!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" name='encryptPwd' onChange={(e) => this.onValueChange(e)} />
                    )}
                  </FormItem>
              </Col>
         
              <Col span={nones}> 
                  <FormItem {...formItemLayout}  label="确认密码" >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: false, message: '请再次输入密码!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password"  onBlur={()=>this.handleConfirmBlur} />
                    )}
                  </FormItem> 
              </Col>
               </Row>
          <Row>
              <Col span={12}>
                  <FormItem {...formItemLayout} label='用户归属' >
                    <Select  name='regisType' value={this.state.regisType.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('regisType',value)}>
                        <Option value='erp' >ERP用户</Option>
                        <Option value='local' >本地用户</Option>
                        
                      </Select>
                  
                  </FormItem>
              </Col>

              <Col span={12}> 
                  <FormItem {...formItemLayout} label='用户角色'>
                        {/* <Select  name='isAdmin' value={this.state.isAdmin.toString()}  style={{ width: 120 }} onChange={(value) =>this.onSelectChange('isAdmin',value)}>
                          <Option value='0' >普通员工</Option>
                          <Option value='1' >管理员</Option>
                        </Select> */}
                      {getFieldDecorator('isAdminText',{
                          rules:[{required: true, message: '请选择角色!'}],
                        })(
                        <Select
                            mode="multiple"
                            style={{ width: '120px' }}
                            placeholder="请选择"
                            name='isAdminText' 
                           
                            onChange={(value) =>this.onSelectChange('isAdminText',value)}
                          >
                            {this.state.roleList}
                          </Select>
                        )}
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={12}> 
          <FormItem {...formItemLayout} label='开始时间'>
              {getFieldDecorator('startDate',{
                rules:[{required: true, message: '请选择开始时间!'}],
              })(
                 <DatePicker name='startDate' onChange={(date,dateString) => this.onValueChangeDate('startDate',date,dateString)}  locale={locale}  placeholder="请选择开始时间" />
              )}
          </FormItem>
        </Col>
        <Col span={12} > 
        
           <FormItem {...formItemLayout} label='失效时间'>
              {getFieldDecorator('endDate',{
                rules:[{required: true, message: '请选择失效时间!'}],
              })(
                 <DatePicker name='endDate' onChange={(date,dateString) => this.onValueChangeDate('endDate',date,dateString)} locale={locale}  placeholder="请选择失效时间" />
              )}
          </FormItem> 
          </Col>
          </Row>
          <Row>
              <Col span={12}>  
                <FormItem {...formItemLayout} label='备注'>
                  {getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入备注!'}],
                  })(
                      <TextArea  type='text' name='description'   onChange={(e) => this.onValueChange(e)}></TextArea>
                  )} 
            </FormItem>
            </Col>
            <Col span={12}> </Col>
          </Row>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href="#/user/userList"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(UserInfo);