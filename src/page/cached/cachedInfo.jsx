import React        from 'react';
import { Form, Input, Table,Button, Modal,Card,Row, Col,Icon ,Pagination,message} from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CachedService.jsx';
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Search = Input.Search;
class CachedInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            cube_id:this.props.match.params.cached_id,
            qry_id:'',
            cube_name:'',
            cube_desc:'',
            visible:false,
            dictionaryList:[],
            qry_name:'',
            cube_sql:'',
        };
        
      
    }
    
 //初始化加载调用方法
    componentDidMount(){
       if(null!=this.state.cube_id && ''!=this.state.cube_id  && 'null'!=this.state.cube_id){
        _cubeService.getCubeInfo(this.state.cube_id).then(response => {
                this.setState(response.data);
                
            }, errMsg => {
                this.setState({
                });
                localStorge.errorTips(errMsg);
            });
        }
        
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
        <Card title='详情'>
        <Form >
        <Row>
             <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="名称">
                    {getFieldDecorator('cube_name', {
                      rules: [{required: true, message: '请输入名称!'}],
                    })(
                      <Input type='text' name='cube_name'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('cube_desc', {
                      rules: [{required: true, message: '请输入描述!'}],
                    })(
                      <Input type='text' name='cube_desc'  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <Row>
          <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="Qry_ID">
                    {getFieldDecorator('qry_id', {
                      rules: [{required: true, message: '请输入描述!'}],
                    })(
                      <Input readOnly onChange={e=>this.onValueChange(e)} 
                      addonAfter={<Icon type="ellipsis" theme="outlined" onClick={e=>this.openModelClick()}/>} />
                    )}
                  </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="class_name">
                    {getFieldDecorator('class_name', {
                     // rules: [{required: true, message: '请输入描述!'}],
                    })(
                      <Input readOnly />
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <Row>
            <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="SQL">
                    {getFieldDecorator('cube_sql', {
                      rules: [{required: true, message: '请输入SQL!'}],
                    })(
                      <Input  onChange={(e) => this.onValueChange(e)}/>
                    )}
                  </FormItem>
              </Col>
          </Row> 
          <FormItem {...tailFormItemLayout}>
            <Button href="#/cached/cachedList"  type="primary" style={{marginLeft:'30px'}}>返回</Button>
          </FormItem>
      </Form>
      </Card>
      
      </div>
    );
  }
}
export default Form.create()(CachedInfo);