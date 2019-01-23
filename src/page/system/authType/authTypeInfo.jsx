import React        from 'react';
import AuthType     from '../../../service/AuthTypeService.jsx'
import { Form, Input, Select,Button, Card,Row, Col } from 'antd';
import LocalStorge  from '../../../util/LogcalStorge.jsx';
import TextArea from 'antd/lib/input/TextArea';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const db = new AuthType();

class AuthTypeInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            authtype_id:this.props.match.params.name,
            dbList:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
    }
    
 //初始化加载调用方法
    componentDidMount(){
      db.getDbList().then(response => {
        const children=[];
        for (let i = 0; i < response.length; i++) {
          children.push(<Option key={response[i].name}>{response[i].name}</Option>);
        }
        this.setState({dbList:children});
     });
       if(null!=this.state.authtype_id && ''!=this.state.authtype_id  && 'null'!=this.state.authtype_id){
            db.getAuthType(this.state.authtype_id).then(response => {
                this.setState({authtype_id:response.data.authtype_id});
                this.props.form.setFieldsValue(response.data);
                
            }, errMsg => {
                this.setState({});
                localStorge.errorTips(errMsg);
            });
        }
       
    }

    //编辑字段对应值
    onSelectChange(name,value){
         this.props.form.setFieldsValue({[name]:value});
    
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
          values.authtype_id=this.state.authtype_id;
          db.saveAuthType(values).then(response => {
            alert("保存成功");
            window.location.href="#/authType";
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

  //编辑字段对应值
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
       this.props.form.setFieldsValue({[name]:value});
  
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
        <Card title={this.state.authtype_id=='null' ?'新增权限类型':'编辑权限类型'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="权限类型名称">
                    {getFieldDecorator('authtype_name', {
                      rules: [{required: true, message: '请输入权限类型名称!'}],
                    })(
                      <Input type='text' name='authtype_name'  />
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='权限类型描述' >
                       {getFieldDecorator('authtype_desc', {
                          rules: [{ required: true, message: '请输入权限类型描述!', whitespace: true }],
                        })(
                          <Input  type='text' name='authtype_desc'  />
                        )}
                  </FormItem>
              </Col>
          </Row> 
         <Row>
            <Col xs={24} sm={12}>
                      <FormItem {...formItemLayout} label='权限类型分类' >
                        {getFieldDecorator('authtype_class', {
                          rules: [{ required: true, message: '请输入权限类型分类!', whitespace: true }],
                        })(
                          <Input  type='text' name='authtype_class'  />
                        )}
                      </FormItem>
              </Col>
              

              <Col xs={24} sm={12}> 
                  <FormItem {...formItemLayout} label='用户实体'>
                        {getFieldDecorator('use_object', {
                          rules: [{ required: true, message: '请输入用户实体!', whitespace: true }],
                        })(
                          <Input  type='text' name='use_object'  />
                        )}
                      </FormItem>
              </Col>
          </Row>
          <Row>
              <Col xs={24} sm={12}> 
                   <FormItem {...formItemLayout} label='数据库'>
                   {getFieldDecorator('auth_db', {
                          rules: [{ required: true, message: '请输入数据库!', whitespace: true }],
                        })(
                          <Select  style={{ width: '120px' }}
                                    placeholder="请选择"
                                    name='auth_db' 
                                   
                                    onChange={(value) =>this.onSelectChange('auth_db',value)}
                                  >
                                    {this.state.dbList}
                            </Select>
                     )}
                       
                      </FormItem>
        </Col>
        <Col xs={24} sm={12} > 
        
        <FormItem {...formItemLayout} label='权限名称'>
              {getFieldDecorator('auth_name', {
                rules: [{ required: true, message: '请输入权限名称!', whitespace: true }],
              })(
                <Input  type='text' name='auth_name'  />
              )}
            </FormItem>
          </Col>
          </Row>
         <Row>
           <Col  xs={24} sm={12}>
         <FormItem {...formItemLayout} label='Sql'>
                        {getFieldDecorator('auth_sql', {
                          rules: [{ required: true, message: '请输入Sql!', whitespace: true }],
                        })(
                          <TextArea  type='text' name='auth_sql'  onChange={(e) => this.onValueChange(e)}></TextArea>
                        )}
                      </FormItem>
        
         
                      </Col>
         </Row>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}}>保存</Button>
            <Button href="#/authType"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(AuthTypeInfo);