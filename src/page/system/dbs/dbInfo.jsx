import React        from 'react';
import DB         from '../../../service/DbService.jsx'
import { Form, Input, Select,Button, Card,Row, Col } from 'antd';
import LocalStorge  from '../../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const db = new DB();

class DbInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            _name:this.props.match.params.name
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state._name && ''!=this.state._name  && 'null'!=this.state._name){
            db.getDb(this.state._name).then(response => {
               // this.setState(response);
                this.props.form.setFieldsValue(response);
                
            }, errMsg => {
                this.setState({});
                localStorge.errorTips(errMsg);
            });
        }
        
    }

    //编辑字段对应值
    onSelectChange(name,value){
         let drivers=null;
         let urls=null;
         if(value=='Oracle'){
            drivers='oracle.jdbc.OracleDriver';
            urls='jdbc:oracle:thin:@ip:port:xe';
         }else if(value=='Mysql'){
            drivers='com.mysql.cj.jdbc.Driver';
            urls='jdbc:mysql://ip:port/xe';
        }else if(value=='DB2'){
            drivers='com.ibm.db2.jcc.DB2Driver';
            urls='jdbc:db2://ip:port/xe';
        }else if(value=='mongoDB'){
            drivers='';
            urls='ip:port';
        }
        // this.setState({[name]:value,driver:drivers,url:urls});  

         this.props.form.setFieldsValue({[name]:value,driver:drivers,url:urls});
    
  }
     //编辑字段对应值
     onValueChange(e){
      let name = e.target.name,
          value = e.target.value.trim();
      //this.setState({[name]:value});  
          this.props.form.setFieldsValue({[name]:value});
    
  }

   //提交
handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          values._name=this.state._name;
          db.saveDb(values).then(response => {
            alert("保存成功");
            window.location.href="#/dbs";
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

  clickTest(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        
        db.testDb([this.values,'update']).then(response => {
              alert(response.retMsg);
          }, errMsg => {
             alert("连接失败");
        });
      }
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
        <Card title={this.state._name=='null' ?'新建连接':'编辑连接'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col span={12}>
                  <FormItem {...formItemLayout} label="连接名称">
                    {getFieldDecorator('name', {
                      rules: [{required: true, message: '请输入连接名称!'}],
                    })(
                      <Input type='text' name='name'  />
                    )}
                  </FormItem>
              </Col>
              <Col span={12}>
                  <FormItem {...formItemLayout} label='数据库类型' >
                  {getFieldDecorator('dbtype', {
                          rules: [{ required: true, message: '请选择数据库类型!', whitespace: true }],
                        })(
                    <Select  name='dbtype'   style={{ width: 120 }} onChange={(value) =>this.onSelectChange('dbtype',value)}>
                        <Option value='Oracle' >Oracle</Option>
                        <Option value='Mysql' >Mysql</Option>
                        <Option value='DB2' >DB2</Option>
                        <Option value='mongoDB' >mongoDB</Option>
                      </Select>
                     )}
                  </FormItem>
              </Col>
          </Row> 
         <Row>
            <Col span={12}>
                      <FormItem {...formItemLayout} label='驱动类型' >
                        {getFieldDecorator('driver', {
                          rules: [{ required: true, message: '请输入驱动类型!', whitespace: true }],
                        })(
                          <Input  type='text' name='driver'  />
                        )}
                      </FormItem>
              </Col>
              

              <Col span={12}> 
                  <FormItem {...formItemLayout} label='地址'>
                        {getFieldDecorator('url', {
                          rules: [{ required: true, message: '请输入驱动类型!', whitespace: true }],
                        })(
                          <Input  type='text' name='url'  />
                        )}
                      </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span={12}> 
                   <FormItem {...formItemLayout} label='用户名'>
                        {getFieldDecorator('username', {
                          rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                        })(
                          <Input  type='text' name='username'  />
                        )}
                      </FormItem>
        </Col>
        <Col span={12} > 
        
                    <FormItem {...formItemLayout} label='密码'>
                        {getFieldDecorator('password', {
                          rules: [{ required: false, message: '请输入密码!', whitespace: true }],
                        })(
                          <Input  type='text' name='password'  />
                        )}
                      </FormItem>
          </Col>
          </Row>
         
          <FormItem {...tailFormItemLayout}>
          <Button type="primary"  onClick={()=>this.clickTest()}>test</Button>
            <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}}>保存</Button>
            <Button href="#/dbs"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(DbInfo);