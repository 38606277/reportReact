import React        from 'react';
import DictService         from '../../service/DictService.jsx'
import { Form, Input, Select,Button, DatePicker,Card,Row, Col } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const _dict = new DictService();
const Option = Select.Option;

class DictValueInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            dict_id:this.props.match.params.dictId,
            oldvalue_code:this.props.match.params.value_code,
            value_code:'',
            value_name:'',
            abbr_name1:'',
            abbr_name2:'',
            enabled:'1',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur  = this.handleConfirmBlur.bind(this);
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.oldvalue_code && ''!=this.state.oldvalue_code  && 'null'!=this.state.oldvalue_code){
        _dict.getDictValue(this.state.dict_id,this.state.oldvalue_code).then(response => {
                this.setState(response.data);
                this.props.form.setFieldsValue({
                      dict_id:this.state.dict_id,
                      value_code:this.state.oldvalue_code,
                      value_name:response.data.value_name,
                      abbr_name1:response.data.abbr_name1,
                      abbr_name2:response.data.abbr_name2,
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
        
        _dict.saveDict(this.state).then(response => {
            if(null!=this.state.oldvalue_code && ''!=this.state.oldvalue_code  && 'null'!=this.state.oldvalue_code){
                alert("修改成功");
            }else{
                alert("保存成功");
            }
            window.location.href="#dict/DictValueList/"+this.state.dict_id;
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
        <Card title={this.state.oldvalue_code=='null' ?'新建字典':'编辑字典'}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="字典编码">
                    {getFieldDecorator('value_code', {
                      rules: [{required: true, message: '请输入字典编码!'}],
                    })(
                      <Input type='text' name='value_code'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="字典名称">
                    {getFieldDecorator('value_name', {
                      rules: [{required: true, message: '请输入字典名称!'}],
                    })(
                      <Input type='text' name='value_name'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="简称1">
                    {getFieldDecorator('abbr_name1', {
                      rules: [{required: false, message: '请输入简称1!'}],
                    })(
                      <Input type='text' name='abbr_name1'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="简称2">
                    {getFieldDecorator('abbr_name2', {
                      rules: [{required: false, message: '请输入简称2!'}],
                    })(
                      <Input type='text' name='abbr_name2'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button href={"#/dict/dictValueList/"+this.state.dict_id}   type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      </div>
    );
  }
}
export default Form.create()(DictValueInfo);