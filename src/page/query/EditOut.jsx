import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Tag, Form, Input, Select, Modal, Button, Card, Checkbox } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './query.scss';
import CreateLink from './CreateLink.jsx';
const Option = Select.Option;



class EditOut extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRef(this)
    this.state = {
      linkFormVisible:false,
      linkFormAction:'',
      linkFormQryID:'',
      linFormOutID:'',
      data: [],
      formData: {},
      dictData: [],
      authData: [],
      rowCount:0,
    };
  }
  componentDidMount() {

  }
  setFormValue(d) {

    //let arr=d.slice(0);
    this.setState({ data: d });
    let f = {};
    for (var i = 0; i < this.state.data.length; i++) {
      let rowObject = this.state.data[i];
      let keys = Object.getOwnPropertyNames(rowObject);
      for (var field of keys) {
        let fieldName = i + '-' + field;
        f[fieldName] = this.state.data[i][field];
      }
    }
    console.log(f);
    this.setState({ formData: f });
    this.props.form.setFieldsValue(this.state.formData);
    //this.props.form.setFieldsValue(this.state.formData);
  }

  getFormValue() {
    return this.state.data;
  }
  onSelectChangeTab = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  deleteRows() {
    const { data,selectedRowKeys } = this.state;
    if(selectedRowKeys.length>0 && selectedRowKeys!=null){
        const newData = data.map(item => ({ ...item }));
        for(let i =0; i<selectedRowKeys.length; i ++) {
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
          "out_id": "",
          "out_name": undefined,
          "datatype": undefined,
          "width": undefined,
          "render": undefined,
          "link": undefined
        };
    newData.push(aIn);
    this.setState({ data: newData, rowCount: rowCount + 1 },function(){
      let formValue = this.ArrayToFormValue(this.state.data);
      this.props.form.setFieldsValue(formValue);
    });

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
  changeEvent(e) {
    // record.age=e.target.value; 
    console.log(e.target.id, e.target.value);
    let id = e.target.id;
    let index = id.split('-')[0];
    let field = id.split('-')[1]
    this.state.data[index][field] = e.target.value;
  }
  showModal(outItem) {
   
    this.setState({
      linkFormVisible: true,
      linkFormAction:"update",
      linkFormQryID:"70",
      linFormOutID:"50",
    });
   
    //  this.refs.linkForm.hello();
  }

  handleOk = (e) => {
    console.log(e);
    //保存到服务端


    this.setState({
      linkFormVisible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
   
    this.setState({
      linkFormVisible: false,
    });
  }


  buttonClick() {
    console.log(this.props.form.getFieldsValue());
    console.log(this.state.data);
  }
  changeColumn() {
    this.refs.table.columns = this.columns1;



    this.arr.push(<Input />);
  }


  state = { linkFormVisible: false }






  columns = [{
    title: '列ID',
    dataIndex: 'out_id',
    key: 'out_id',
    width: '150px',
  }, {
    title: '列名',
    dataIndex: 'out_name',
    key: 'out_name',
    className: 'headerRow',
    render: (text, record, index) => {
      return (
        <Form>
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'out_name', {
              rules: [{
                required: true,
                message: `参数名是必须的！`,
              }]

            })(<Input onChange={e => this.changeEvent(e)} />)}
          </Form.Item>
        </Form>
      );
    }
  }, {
    title: '数据类型',
    dataIndex: 'datatype',
    key: 'datatype',
    className: 'headerRow',
    render: (text, record, index) => {
      return (
        <Form>

          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'datatype', {
              rules: [{
                required: true,
                message: `数据类型是必须的！`,
              }],
            })(
              <Select tyle={{ minWidth: '80px' }} >
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
    title: '列宽',
    dataIndex: 'width',
    key: 'width',
    className: 'headerRow',
    render: (text, record, index) => {
      return (
        <Form>
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'width', {
              rules: [{
                required: true,
                message: `参数名是必须的！`,
              }]

            })(<Input onChange={e => this.changeEvent(e)} />)}
          </Form.Item>
        </Form>
      );
    }
  }, {
    title: '渲染组件',
    dataIndex: 'render',
    key: 'render',
    className: 'headerRow',
    render: (text, record, index) => {
      return (
        <Form>
          <Form.Item style={{ margin: 0 }}>
            {this.props.form.getFieldDecorator(index + '-' + 'render', {
              rules: [{
                required: true,
                message: `参数名是必须的！`,
              }]

            })(<Input onChange={e => this.changeEvent(e)} />)}
          </Form.Item>
        </Form>
      );
    }
  }, {
    title: '数据链接',
    dataIndex: 'link',
    key: 'link',
    className: 'headerRow',
    width:'90px',
    render: (text, record, index) => {
      return (
        record.link!=null?
        <Fragment>
        <a  disabled={this.props.action=='create'?true:false} onClick={() => {
          this.setState({
            linkFormVisible: true,
            linkFormAction:record.link==null?"create":"update",
            linkFormQryID:record.qry_id,
            linkFormOutID:record.out_id,
          });
        } }>
        修改
        </a>
        <Divider type="vertical" />
        <a>删除</a>
        </Fragment>:
        <Fragment>
        <a  disabled={this.props.action=='create'?true:false} onClick={() => {
          this.setState({
            linkFormVisible: true,
            linkFormAction:record.link==null?"create":"update",
            linkFormQryID:record.qry_id,
            linkFormOutID:record.out_id,
          });
        //  alert(JSON.stringify(record));
        } }>
        创建
        </a>
        </Fragment>
      );
    }
  }];



  render() {
    const { selectedRowKeys } = this.state;
    const rowSelections = {
      selectedRowKeys,
      onChange:this.onSelectChangeTab,
    };
    return (
      // <Button onClick={() => this.buttonClick()} >显示结果</Button>
      <div>

        <Table ref="table" columns={this.columns} rowSelection={this.props.editable==true?rowSelections:null}
          dataSource={this.state.data} size="small" bordered scroll={{ x: '600px' }} pagination={false} />
      
        <Modal
          title="创建数据链接"
          // maskStyle={{opacity:'0.2'}}
          width='800px'
          visible={this.state.linkFormVisible}
          onOk={this.handleOk}
          onCancel={(e)=>this.handleCancel(e)}
          okText='保存'
          cancelText='取消'
          destroyOnClose

        >
             <CreateLink outParam={this.state.data} 
             action={this.state.linkFormAction}
             qry_id={this.state.linkFormQryID}
             out_id={this.state.linkFormOutID}
             ref='linkForm'
             />
        </Modal>
      </div>
    )
  }
}

export default EditOut = Form.create()(EditOut);