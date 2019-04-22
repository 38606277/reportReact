import React from 'react'
import { Table, Divider, Tag, Form, Input, Select, Button, Card, Checkbox } from 'antd';
import HttpService from '../../util/HttpService.jsx';
import './query.scss';
const Option = Select.Option;
const FormItem = Form.Item;


const level = [];
class EditIn extends React.Component {

  constructor(props) {
    super(props);
    this.props.onRef(this)
    this.state = {
      data: [],//
      formData: {},
      dictData: [],
      authData: [],
      selectedRowKeys: [],
      rowCount:0,
    };
  }

  getTreeNode(nodes, nodeid) {
    for (var node in nodes) {
      level.push(node);
      if (node.value == nodeid) {
        break;
        return node;
      }
      if (node.key = 'children') {
        this.getTreeNode(node, key);
      }
    }
  }
  componentDidMount() {
    //加载数据字字典
    HttpService.post("reportServer/dict/getAllDictName", null)
      .then(res => {
        if (res.resultCode == "1000") {
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
        if (res.resultCode == "1000") {
          this.setState({
            authData: res.data
          });
        }
        else
          message.error(res.message);
      });

  }
  setFormValue(d) {

    this.setState({ data: d });
    let formValue = this.ArrayToFormValue(this.state.data);
    this.props.form.setFieldsValue(formValue);
  }
 
  getFormValue() {
    //转换formValue到数组
    // let arrayValue=this.FormValueToArray(this.props.form.getFieldsValue());
    // this.setState({data:arrayValue});
    var that=this;
    var p = new Promise(function(resolve, reject){
      that.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
           resolve(that.state.data);
        } else {
          reject(err);
        }
      })
    });
    return p;   
  }

  
  ArrayToFormValue(dataArray) {
    let formValue = {};
    for (var i = 0; i < dataArray.length; i++) {
      let rowObject = dataArray[i];
      let keys = Object.getOwnPropertyNames(rowObject);
      for (var field of keys) {
        let fieldName = i + '-' + field;
        formValue[fieldName] = dataArray[i][field];
      }
    }
    return formValue;
  }
  FormValueToArray(formValue) {
    let keys = formValue.getOwnPropertyNames(rowObject);
    for (var field of keys) {
      let fieldName = i + '-' + field;
      formValue[fieldName] = dataArray[i][field];
    }
  }



  handleFieldChange(value, fieldName, index) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData[index][fieldName] = value;
    this.setState({ data: newData });
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
    //console.log(e.target.id, e.target.value);
    let id = e.target.id;
    let index = id.split('-')[0];
    let field = id.split('-')[1]
    this.state.data[index][field] = e.target.value;
  }
  SelectChangeEvent(name, value) {
    let id = name;
    let index = id.split('-')[0];
    let field = id.split('-')[1]
    this.state.data[index][field] = value;
  }
  CheckBoxChangeEvent(e) {
    let id = e.target.id;
    let index = id.split('-')[0];
    let field = id.split('-')[1]
    this.state.data[index][field] = e.target.checked ? 1 : 0;
  }

  componentDidUpdate() {
    //this.props.form.setFieldsValue(this.state.FormData);
  }
  buttonClick() {
   // console.log(this.props.form.getFieldsValue());
   // console.log(this.state.data);
  }
  changeColumn() {
    this.refs.table.columns = this.columns1;



    this.arr.push(<Input />);
  }


  //数据字典选中事件
  onSelectChangeTab = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  deleteRowsTwo(key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const index = newData.findIndex(item => key === item.key);
    //const item = newData[index];
    newData.splice(index, 1);
    this.setState({ data: newData });
  }
  deleteRows() {
    const { data,selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0 && selectedRowKeys!=null){
        const newData = data.map(item => ({ ...item }));
        for(let i = selectedRowKeys.length - 1; i >= 0; i--) {
          const index = newData.findIndex(item => selectedRowKeys[i] === item.key);
          newData.splice(index, 1);
        }
        this.setState({ data: newData ,selectedRowKeys:[]},function(){
          let formValue = this.ArrayToFormValue(this.state.data);
          this.props.form.setFieldsValue(formValue);
        });
       
    }
  }
  addRows(){
    const { data,rowCount } = this.state;
    const newData = data.map(item => ({ ...item }));
    let aIn = {
          key: rowCount,
          "qry_id": "",
          "in_id": "",
          "in_name": undefined,
          "datatype": undefined,
          "dict_id": undefined,
          "dict_name": undefined,
          "authtype_id": undefined,
          "authtype_desc": undefined,
          "validate": ""
        };
    newData.push(aIn);
    this.setState({ data: newData, rowCount: rowCount + 1 },function(){
        let formValue = this.ArrayToFormValue(this.state.data);
        this.props.form.setFieldsValue(formValue);
    });

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let columns = [{
      title: '列ID',
      dataIndex: 'in_id',
      key: 'in_id',
      width: '100px',
      className: 'headerRow',
      align: 'left',
      render: (text, record, index) => {
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(index + '-' + 'in_id', {
              rules: [{
                required: true,
                message: `列ID是必须的！`,
              }],
            })(<Input onChange={e => this.handleFieldChange(e.target.value, 'in_id', index)} className='resultColumnsDiv'  style={{minWidth:'100px'}}/>)}
          </FormItem>
        );
      }
    }, {
      title: '列名',
      dataIndex: 'in_name',
      key: 'in_name',
      className: 'headerRow',
      width: '100px',
      render: (text, record, index) => {
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(index + '-' + 'in_name', {
              rules: [{
                required: true,
                message: `列名是必须的！`,
              }],
            })(<Input onChange={e => this.handleFieldChange(e.target.value, 'in_name', index)}  className='resultColumnsDiv'  style={{minWidth:'100px'}}/>)}
          </FormItem>
        );

      }
    }, {
      title: '数据类型',
      dataIndex: 'datatype',
      key: 'datatype',
      className: 'headerRow',
      render: (text, record, index) => {
        return (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(index + '-' + 'datatype', {
              rules: [{
                required: true,
                message: `数据类型是必须的！`,
              }],
            })(
              <Select  allowClear className='resultColumnsDiv' style={{minWidth:'100px'}}
                onChange={value => this.handleFieldChange(value, 'datatype', index)} >
                <Option value="varchar">字符串</Option>
                <Option value="number">数字</Option>
                <Option value="date">日期</Option>
              </Select>
            )}
          </Form.Item>
        );
      }
    }, {
      title: '数据字典',
      dataIndex: 'dict_id',
      key: 'dict_id',
      className: 'headerRow',
      render: (text, record, index) => {
        return (
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'dict_id', {
            })(
              <Select allowClear  className='resultColumnsDiv' style={{minWidth:'100px'}}
                onChange={value => this.handleFieldChange(value, 'dict_id', index)} >
                {this.state.dictData.map(item => <Option value={item.dict_id}>{item.dict_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        );
      }

    }, {
      title: '输入组件',
      dataIndex: 'render',
      key: 'render',
      className: 'headerRow',
      render: (text, record, index) => {
        return (
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'render', {
            })(
              <Select allowClear className='resultColumnsDiv' style={{minWidth:'100px'}}
                onChange={value => this.handleFieldChange(value, 'render', index)} >
                <Option value="Input">输入框</Option>
                <Option value="Datepicker">日期选择</Option>
                <Option value="Checkbox">复选框</Option>
                <Option value="InputButton">弹出选择</Option>
                <Option value="Select">下拉选择</Option>
                <Option value="TagSelect">标签选择</Option>
              </Select>
            )}
          </Form.Item>
        );
      }

    }, {
      title: '验证规则',
      dataIndex: 'validate',
      key: 'validate',
      className: 'headerRow',
      render: (text, record, index) => {
        return (
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'validate', {
            })(
              <Select allowClear className='resultColumnsDiv' style={{minWidth:'100px'}}
                onChange={value => this.handleFieldChange(value, 'validate', index)} >
                <Option value="required">必须输入</Option>
                <Option value="number">数字</Option>
                <Option value="date">日期</Option>
                <Option value="model">模式匹配</Option>
              </Select>
            )}
          </Form.Item>
        );
      }

    }, {
      title: '数据权限',
      key: 'authtype_id',
      width: '16%',
      dataIndex: 'authtype_id',
      render: (text, record, index) => {
        return (
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'authtype_id', {})(
              <Select  className='resultColumnsDiv' style={{minWidth:'100px'}}
                onChange={value => this.handleFieldChange(value, 'authtype_id', index)} >
                {this.state.authData.map(item =>
                  <Option key={item.value} value={item.value}>{item.name}
                  </Option>)}
              </Select>
            )}
          </Form.Item>
        );
      }
    }
    // ,{
    //   title: 'Action', dataIndex: '', key: 'x', render:(text, record) => ( <a  onClick={()=>this.deleteRows(record.key)} href="javascript:;">Delete</a>
    //   )}
    ];
    
    const { selectedRowKeys } = this.state;
    const rowSelections = {
      selectedRowKeys,
      onChange:this.onSelectChangeTab,
    };
    return (
      // <Button onClick={() => this.buttonClick()} >显示结果</Button>
      // <Button onClick={() => this.changeColumn()} >字段变更</Button>
      <Form>
        <Table ref="table"
          columns={columns}
          dataSource={this.state.data}
          size="small"
          bordered
          rowSelection={this.props.editable==true?rowSelections:null}
          pagination={false} scroll={{x:true}}/>
      </Form>
    )
  }
}

export default EditIn = Form.create()(EditIn);