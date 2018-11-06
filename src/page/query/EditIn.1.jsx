import React from 'react'
import { Table, Divider, Tag, Form, Input, Select,Row,Col, Button, Card, Checkbox } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './query.scss';
const Option = Select.Option;


const level=[];
class EditIn extends React.Component {


  
  constructor(props) {
    super(props);
    this.props.onRef(this)
    this.state = { 
      data:[],
      formData:{},
      dictData:[],
      authData:[],
    };
  }
 
  getTreeNode(nodes,nodeid)
  {
    for(var node in nodes){
      level.push(node);
      if(node.value==nodeid)
      {
        break;
        return node;
      }
      if(node.key='children')
      {
        this.getTreeNode(node,key);
      }
    }
  }
  componentDidMount() {
    //加载数据
    //this.props.form.setFieldsValue(this.state.data);
     //this.setFormValue(this.state.data);
     //this.props.form.setFieldsValue(this.state.formData);
    
    // this.props.form.setFieldsValue(this.state.FormData);


    // HttpService.post("reportServer/function1/getFunctionByID/36", null)
    // .then(res => {
    //     if (res.resultCode == "1000"){
    //         this.setFormValue(res.data.in);

            
    //     }
    //     else
    //         message.error(res.message);

    // });    
    //加载数据字字典
    HttpService.post("reportServer/dict/getAllDictName", null)
    .then(res => {
        if (res.resultCode == "1000"){
            this.setState({
              dictData: res.data,
            });
          }
        else
            message.error(res.message);
    });

    //加载数据权限
    HttpService.post("reportServer/authType/getAllAuthTypeList", null)
    .then(res => {
        if (res.resultCode == "1000"){
            this.setState({
              authData: res.data
            });
          }
        else
            message.error(res.message);
    });

  }
  setFormValue(d){
  
    this.setState({data:d});
    let f={};
    for(var i=0;i<this.state.data.length;i++){
      let rowObject=this.state.data[i];
      let keys=Object.getOwnPropertyNames(rowObject);
      for(var field of keys){
        let fieldName=i+'-'+field;
        f[fieldName]=this.state.data[i][field];
        //转换checkbox"1"，"0"为true,false
        // if (field=='isformula')
        // {
        //   f[fieldName]=this.state.data[i][field]=="1"?true:false;
        // }

      }
    }
    console.log(f);
    this.setState({formData:f});
    this.props.form.setFieldsValue(this.state.formData);
    //this.props.form.setFieldsValue(this.state.formData);
  }

  getFormValue(){
    return this.state.data;
  }

  // componentWillReceiveProps(nextProps) {
  //   const { data } = this.state
  //   const newdata = nextProps.data.toString()
  //   if (data.toString() !== newdata) {
  //     this.setState({
  //       data: nextProps.data
       
  //     });
     
  //   }
   
  // }

  changeEvent(e) {
    // record.age=e.target.value; 
    console.log(e.target.id, e.target.value);
     let id = e.target.id;
     let index = id.split('-')[0];
     let  field = id.split('-')[1]
     this.state.data[index][field] = e.target.value;
  }
  SelectChangeEvent(name,value){
     let id = name;
     let index = id.split('-')[0];
     let  field = id.split('-')[1]
     this.state.data[index][field] = value;
  }
  CheckBoxChangeEvent(e){
    let id = e.target.id;
     let index = id.split('-')[0];
     let  field = id.split('-')[1]
     this.state.data[index][field] = e.target.checked?1:0;
 }

  componentDidUpdate(){
    //this.props.form.setFieldsValue(this.state.FormData);
  }
  buttonClick() {
    console.log(this.props.form.getFieldsValue());
    console.log(this.state.data);
  }
  changeColumn() {
    this.refs.table.columns = this.columns1;



    this.arr.push(<Input />);
  }

 

  columns = [{
    title: '列ID',
    dataIndex: 'in_id',
    key: 'in_id',
    width:'120px',
    className:'headerRow',
  }, {
    title: '列名',
    dataIndex: 'in_name',
    key: 'in_name',
    className:'headerRow',
    render: (text, record,index) => {
      return (
        <Form>
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index+'-'+'in_name', {
              rules: [{
                required: true,
                message: `参数名是必须的！`,
              }]
              
            })(<Input  onChange={e=>this.changeEvent(e)}/>)}
          </Form.Item>
        </Form>
      );
    }
  }];

  columns1 = [{
    title: '属性',
    dataIndex: 'in_id',
    width:'120px',
    className:'headerRow',
  }, {
    title: '值',
    dataIndex: 'in_name',
    className:'headerRow',
  }];


  render() {

    return (
        <Row gutter={10}>
          <Col span={12}><Table ref="table" columns={this.columns} dataSource={this.state.data} size="small" bordered  pagination={false}/></Col>
          <Col span={12}><Table ref="table" columns={this.columns1} dataSource={this.state.data} size="small" bordered  pagination={false}/></Col>
        </Row >
        // <Button onClick={() => this.buttonClick()} >显示结果</Button>
        // <Button onClick={() => this.changeColumn()} >字段变更</Button>
       
    )
  }
}

export default EditIn = Form.create()(EditIn);