import React        from 'react';
import DB         from '../../../service/DbService.jsx'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Button, Card, Row, Col } from 'antd';
import LocalStorge  from '../../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const db = new DB();

class DbView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.match.params.name
            
        };
    }
    
 //初始化加载调用方法
    componentDidMount(){
     
        db.getDb(this.state.name).then(response => {
                this.setState(response);
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
        <Card title='查看连接'>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="连接名称">
                   
                      {this.state.name}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='连接类型' >
                   
                      {this.state.dbtype}
                  </FormItem>
              </Col>
          </Row> 
          <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="驱动类型">
                   
                      {this.state.driver}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='地址' >
                   
                      {this.state.url}
                  </FormItem>
              </Col>
          </Row>
          <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="用户名">
                   
                      {this.state.username}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label='密码' >
                   
                      {this.state.password}
                  </FormItem>
              </Col>
          </Row>
         
          <FormItem {...tailFormItemLayout}>
          <Button href="#/dbs"  type="primary">返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(DbView);