import React from 'react'
import { Table, Divider, Tag, Form, Input, Select, Row, Col, Button, Card, message } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './query.scss';
const Option = Select.Option;


class CreateLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      action: 'create',
      formData: {},
      qry_id:"",
      out_id:"",
      queryClass: [],
      queryNames: [],
      inParam: [],
      outParam: props.outParam,
      dictData: [],
      authData: [],
    };
  }
  componentDidMount() {
    //查询查询类别定义
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
          this.setState({ inParam: res.data.in });
          console.log(this.state.inParam);
        }
        else
          message.error(res.message);
      });
  }
  //保存超链接
  saveQryOutLink() {

    if (this.state.action == 'create') {
      HttpService.post("reportServer/query/createQueryOutLink", JSON.stringify(formInfo))
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
    dataIndex: 'in_id',
    key: 'in_id',
    width: '120px',
    className: 'headerRow',
  }, {
    title: '列名',
    dataIndex: 'in_name',
    key: 'in_name',
    width: '120px',
    className: 'headerRow',
  }, {
    title: '取值',
    dataIndex: 'in_name',
    key: 'in_name',
    className: 'headerRow',
    render: (text, record, index) => {
      return (

        <Select tyle={{ width: '100px' }}  >
          {this.state.outParam.map(item =>
            <Option key={item.out_id} value={item.out_id}>{item.out_name}</Option>
          )}
        </Select>
      );
    }
  }];



  render() {

    return (
      <div>
        <Row>
          {/* <Col>
            <Button type='primary' onClick={() => this.execSelect()}>保存</Button>
          </Col> */}
        </Row>
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
              dataSource={this.state.inParam}
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

export default CreateLink = Form.create()(CreateLink);