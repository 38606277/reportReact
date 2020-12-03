import React from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Divider, Tag, Input, Select, Button, Card, Checkbox } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './function.scss';
const Option = Select.Option;


const level=[];
class EditIn extends React.Component {


  // data1 = [{
  //   key: '1',
  //   in_id:"vender_name",
  //   in_name: '供应商名称',
  //   datatype: '字符串',
  //   dict: '1',
  //   isformula:true,
  //   auth:'公司',
  // }, {
  //   key: '2',
  //   in_id:2,
  //   in_name: '项目名称',
  //   datatype: '字符串',
  //   dict: '2',
  //   isformula:true,
  //   auth:'公司',
  // },{
  //   key: '3',
  //   in_id:3,
  //   in_name: '开始日期',
  //   datatype: '日期',
  //   dict: '3',
  //   isformula:true,
  //   auth:'部门',
  // }];
  
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
  }, {
    title: '数据类型',
    dataIndex: 'datatype',
    key: 'datatype',
    className:'headerRow',
    render: (text, record,index) => {
      return (
        <Form>

          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index+'-'+'datatype', {
              rules: [{
                required: true,
                message: `数据类型是必须的！`,
              }],
            })(
              <Select tyle={{ minWidth: '80px' }} onChange={value=>this.SelectChangeEvent(index+'-'+'datatype',value)} >
                <Option value="string">字符串</Option>
                <Option value="number">数字</Option>
                <Option value="date">日期</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      );
    }
  }, {
    title: '数据字典',
    dataIndex: 'dict_id',
    key: 'dict_id',
    className:'headerRow',
    render: (text, record,index) => {
      return (
        <Form>

          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index+'-'+'dict_id', {
            })(
              <Select allowClear style={{ minWidth: '100px' }} onChange={value=>this.SelectChangeEvent(index+'-'+'dict_id',value)}>
                  {this.state.dictData.map(item=><Option  value={item.dict_id}>{item.dict_name}</Option>)} 
                  {/* <Option value="1">公司</Option>
                  <Option value="2">部门</Option>  */}
              </Select>
            )}
          </Form.Item>
        </Form>
      );
    }

  }, {
    title: '表达式',
    key: 'isformula',
    dataIndex: 'isformula',
    width:'10%',
    className:'headerRow',
    render: (text, record,index) => {
      return (
        <Form>

          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index+'-'+'isformula', {
            valuePropName: 'checked'}
            )(
              <Checkbox onChange={e=>this.CheckBoxChangeEvent(e)}/>
            )}
          </Form.Item>
        </Form>
      );
    }
  }, {
    title: '数据权限',
    key: 'authtype_id',
    width:'16%',
    dataIndex: 'authtype_id',
    render: (text, record,index) => {
      return (
        <Form>

          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index+'-'+'authtype_id', {
              rules: [{
                required: true,
                message: `Please Input `,
              }],
            })(
              <Select allowClear style={{ minWidth: '100px' }} onChange={value=>this.SelectChangeEvent(index+'-'+'authtype_id',value)}>
                {this.state.authData.map(item=><Option key={item.value} value={item.value}>{item.name}</Option>)}
                {/* <Option value="1">公司</Option>
                <Option value="2">部门</Option> */}
              </Select>
            )}
          </Form.Item>
        </Form>
      );
    }
  }];



  render() {

    return (
        // <Button onClick={() => this.buttonClick()} >显示结果</Button>
        // <Button onClick={() => this.changeColumn()} >字段变更</Button>
        <Table ref="table" columns={this.columns} dataSource={this.state.data} size="small" bordered  pagination={false}/>
    )
  }
}

export default EditIn = Form.create()(EditIn);