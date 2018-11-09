import React from 'react'
import { Table, Divider, Tag, Form, Input, Select, Row, Col, Button, Card, message } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './query.scss';
const Option = Select.Option;


class CreateLink extends React.Component {

  constructor(props) {
    super(props);
    // alert(props.action);
    this.state = {
      data: [],
      action: 'create',
      formData: {},
      qry_id:"",
      out_id:"",
      link_qry_id:"",
      link_qry_class_id:"",
      queryClass: [],
      queryNames: [],
      inParam: [],
      outParam: props.outParam,
      dictData: [],
      authData: [],
      editable:true,
    };
  }
  
  componentDidMount() {
     //查询查询类别定义
     
     if (this.props.action == 'update') {
      //查询函数定义
      let param = {};
      HttpService.post("reportServer/query/getQueryOutLink/" + this.state.qry_id, null)
          .then(res => {
              if (res.resultCode == "1000") {
                  this.setState({
                      inData: res.data.in,
                      outData: res.data.out
                  });
                  
              }
              else
                  message.error(res.message);

          });

       }else if(this.props.action=='create')
       {

       }
    // alert('componentDidMount'+'action:'+this.props.action+'qry_id:'+this.props.qry_id+'out_id:'+this.props.out_id);
    HttpService.post("reportServer/query/getAllQueryClass", '')
      .then(res => {
        console.log(JSON.stringify(res));
        if (res.resultCode == '1000') {
          this.setState({ queryClass: res.data });
        }
        else
          message.error(res.message);
      });

  }



  getQryLinkById()
  {
    // //查询报表名称
    // HttpService.post("reportServer/query/getQueryByClassID/" + value, '')
    //   .then(res => {

    //     if (res.resultCode == '1000') {
    //       this.setState({ queryNames: res.data });
    //       console.log(this.state.queryNames);
    //     }
    //     else
          message.error("dddd");
      // });
  }



  //下拉事件
  onSelectChange(value) {

    //查询报表名称
    HttpService.post("reportServer/query/getQueryByClassID/" + value, '')
      .then(res => {

        if (res.resultCode == '1000') {
          this.setState({ queryNames: res.data });
          console.log(this.state.queryNames);
        }
        else
          message.error(res.message);
      });
  }

  //下拉事件
  onQryNameSelectChange(value) {

    //查询报表名称
    HttpService.post("reportServer/query/getQueryParamByFuncID/" + value, '')
      .then(res => {

        if (res.resultCode == '1000') {
       //   this.setState({ data: res.data.in });
          let newdata=[];
          res.data.in.forEach(item => {
             newdata.push({
              link_in_id:item["in_id"],
              link_in_name:item["in_name"],
              link_in_id_value_type:"",
              link_in_id_value:"",
            });
          });
          this.setState({data:newdata});
          // console.log(this.state.inParam);
        }
        else
          message.error(res.message);
      });
  }
  //保存超链接
  saveQryOutLink() {

    let linFormValue={
      qry_id:this.props.qry_id,
      out_id:this.props.out_id,
      link_qry_id:this.props.form.getFieldsValue('link_qry_id'),
      param:[
        {
          link_in_id:"",
          link_in_id_value_type:"",
          link_in_id_value:"",
        },
        {
          link_in_id:"",
          link_in_id_value_type:"",
          link_in_id_value:"",
        }
      ]
    };

    if (this.state.action == 'create') {
      HttpService.post("reportServer/query/createQueryOutLink", JSON.stringify(linFormValue))
        .then(res => {
          if (res.resultCode == "1000") {
            message.success('创建成功！');

          }
          else
            message.error(res.message);

        });

    } else if (this.state.action == 'update') {
      HttpService.post("reportServer/query/updateQuery", JSON.stringify(formInfo))
        .then(res => {
          if (res.resultCode == "1000") {
            message.success(`更新成功！`)
          }
          else
            message.error(res.message);

        });


    }
  }

  columns = [{
    title: '列ID',
    dataIndex: 'link_in_id',
    width: '120px',
    className: 'headerRow',
  }, {
    title: '列名',
    dataIndex: 'link_in_name',
    width: '120px',
    className: 'headerRow',
   }, 
  //  {
  //   title: '取值',
  //   dataIndex: 'link_in_id_value',
  //   className: 'headerRow',
  //   render: (text, record, index) => {
  //     return (

  //       <Select tyle={{ width: '100px' }}  >
  //         {this.state.outParam.map(item =>
  //           <Option key={item.out_id} value={item.out_id}>{item.out_name}</Option>
  //         )}
  //       </Select>
  //     );
  //   }
  // }, 
  {
    title: '取值',
    dataIndex: 'link_in_id_value',
    className: 'headerRow',
    render: (text, record, index) => {
        if (this.state.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'link_in_id_value', record.key)}
              placeholder="所属部门"
            />
          );
        }
        return text;
    }
  }
  ];
  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  render() {

    return (
      <div>
        <Row style={{ marginTop: '10px' }}><Col>
          报表类别：
          <Select style={{ width: '70%' }} onChange={(value) => this.onSelectChange(value)} >
            {this.state.queryClass.map(item =>
              <Option key={item.class_id} value={item.class_id}>{item.class_name}</Option>
            )}
          </Select>
        </Col></Row>
        <Row><Col>
          报表名称：
            <Select style={{ width: '70%', marginTop: '20px' }} onChange={(value) => this.onQryNameSelectChange(value)} placeholder="请选择" name='reportName'>
            {this.state.queryNames.map(item =>
              <Option key={item.qry_id} value={item.qry_id}>{item.qry_name}</Option>
            )}
          </Select>
        </Col></Row>
        <Row>
          <Col>
            <Table ref="table"
              columns={this.columns}
              dataSource={this.state.data}
              size="small" bordered pagination={false} />
          </Col>
        </Row>
        <Divider/>
       
          <Button>清空</Button>
          <Button key="submit" type="primary" style={{ marginLeft: 10 }} onClick={this.handleOk}>
            保存
            </Button>
          <Button key="back" style={{ marginLeft: 10 }} onClick={this.handleCancel}>取消</Button>

      </div>
    )
  }
}

export default CreateLink= Form.create()(CreateLink);