import React        from 'react';
import User         from '../../service/user-service.jsx'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Button, DatePicker, Card, Row, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const _user = new User();

class UserView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _id:this.props.match.params.userId,
            userName:'',
            isAdmin:'0',
            regisType:'local',
            encryptPwd:'',
            startDate:'',
            endDate:'',
            description:'',
            userId:''
            
        };
    }
    
 //初始化加载调用方法
    componentDidMount(){
     
            _user.getUserInfo(this.state._id).then(response => {
                this.setState(response.data.userInfo);
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
        
        
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
        <Card title='查看用户'>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="用户名">
                   
                      {this.state.userName}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='用户编号' >
                   
                      {this.state.userId}
                  </FormItem>
              </Col>
          </Row> 
           
          <Row>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='用户归属' >
                    <Select  name='regisType' value={this.state.regisType.toString()}  style={{ width: 120 }} disabled>
                        <Option value='erp' >ERP用户</Option>
                        <Option value='local' >本地用户</Option>
                        
                      </Select>
                  
                  </FormItem>
              </Col>

              <Col xs={24} sm={12}> 
                  <FormItem {...formItemLayout} label='用户角色'>
                        <Select  name='isAdmin' value={this.state.isAdmin.toString()}  style={{ width: 120 }} disabled>
                          <Option value='0' >普通员工</Option>
                          <Option value='1' >管理员</Option>
                        </Select>
                    
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col xs={24} sm={12}> 
          <FormItem {...formItemLayout} label='开始时间'>
              
                {this.state.startDate}
          </FormItem>
        </Col>
        <Col xs={24} sm={12} > 
        
           <FormItem {...formItemLayout} label='失效时间'>
           {this.state.endDate}
              
          </FormItem> 
          </Col>
          </Row>
          <Row>
              <Col xs={24} sm={12}>  
                <FormItem {...formItemLayout} label='备注'>
                  
                      <TextArea  type='text' name='description' value={this.state.description} disabled></TextArea>
                  
            </FormItem>
            </Col>
            <Col xs={24} sm={12}> </Col>
          </Row>
          <FormItem {...tailFormItemLayout}>
          <Button href="#/user/userList"  type="primary">返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(UserView);