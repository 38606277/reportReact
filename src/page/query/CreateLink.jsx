import React from 'react'
import { Table, Divider, Tag, Form, Input, Select, Row, Col, Button, Card, message } from 'antd';

import HttpService from '../../util/HttpService.jsx';
import './query.scss';
const Option = Select.Option;
const FormItem = Form.Item;


class CreateLink extends React.Component {

  constructor(props) {
    super(props);
    // alert(props.action);
    this.state = {
      data: [],
      action: 'create',
      formData: {},
      qry_id: "",
      out_id: "",
      link_qry_id: "",
      link_qry_class_id: "",
      queryClass: [],
      queryNames: [],
      inParam: [],
      outParam: props.outParam,
      dictData: [],
      authData: [],
      editable: true,
    };
  }

  componentDidMount() {
    //查询查询类别定义

    if (this.props.action == 'update') {
      //查询函数定义
      let param = {};
      HttpService.post("reportServer/query/getQueryOutLink/" + this.state.qry_id + "/" + this.state.out_id, null)
        .then(res => {
          if (res.resultCode == "1000") {
            this.setState({
              link_qry_id: res.data[0].link_qry_id,
              data: res.data,
            });

          }
          else
            message.error(res.message);

        });

    } else if (this.props.action == 'create') {

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



  getQryLinkById() {
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
          let newdata = [];
          res.data.in.forEach(item => {
            newdata.push({
              key: item["in_id"],
              link_in_id: item["in_id"],
              link_in_name: item["in_name"],
              link_in_id_value_type: "in",
              link_in_id_value: "",
            });
          });
          this.setState({ data: newdata, link_qry_id: value });

          // console.log(this.state.inParam);
        }
        else
          message.error(res.message);
      });
  }
  //保存超链接
  SaveClick() {

    let linkFormValue = {
      qry_id: this.props.qry_id,
      out_id: this.props.out_id,
      link_qry_id: this.state.link_qry_id,
      param: this.state.data,
      param: [
        {
          link_in_id: "",
          link_in_id_value_type: "",
          link_in_id_value: "",
        },
        {
          link_in_id: "",
          link_in_id_value_type: "",
          link_in_id_value: "",
        }
      ]
    };
    alert(linkFormValue);
    if (this.state.action == 'create') {
      HttpService.post("reportServer/query/createQueryOutLink", JSON.stringify(linkFormValue))
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

  columns = [
  {
    title: '取值类型',
    dataIndex: 'link_in_id_value_type',
    className: 'headerRow',
    render: (text, record, index) => {
      return (
        <Select style={{ width: '100px' }}
          onChange={value => this.handleValueTypeChange(value, index)}
        >
          <Option key='in' value='in'>输入参数</Option>
          <Option key='out' value='out'>输出参数</Option>
          <Option key='input' value='input'>手动输入</Option>
        </Select>
      );
    }
  },
  {
    title: '取值',
    dataIndex: 'link_in_id_value',
    key: 'link_in_id_value',
    className: 'headerRow',
    render: (text, record, index) => {
      if (record.link_in_id_value_type == 'in') {
        return (
          <Select style={{ width: '180px' }}
            value={text}
            onChange={value => this.handleFieldChange(value, 'link_in_id_value', index)} >
            {this.state.outParam.map(item =>
              <Option key={item.out_id} value={item.out_id}>{item.out_name}</Option>
            )}
          </Select>
        );
      } else if (record.link_in_id_value_type == 'out') {
        return (
          <Select style={{ width: '180px' }}
            value={text}
            onChange={value => this.handleFieldChange(value, 'link_in_id_value', index)} >
            {this.state.outParam.map(item =>
              <Option key={item.out_id} value={item.out_id}>{item.out_name}</Option>
            )}
          </Select>
        )
      } else if (record.link_in_id_value_type == 'input') {
        return (<Input style={{ width: '180px' }} />)
      }
    }
  },{
    title: '列ID',
    dataIndex: 'link_in_id',
    key: 'link_in_id',
    width:'180px',
    className: 'headerRow',
  }, {
    title: '列名',
    dataIndex: 'link_in_name',
    key: 'link_in_name',
    width:'180px',
    className: 'headerRow',
  },
  ];

  handleFieldChange(value, fieldName, index) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData[index][fieldName] = value;
    this.setState({ data: newData });
  }

  handleValueTypeChange(value, index) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData[index]['link_in_id_value_type'] = value;
    this.setState({ data: newData });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <Row>
          <Col span={12}>
            <FormItem label="函数名称" {...formItemLayout}>
              {
                getFieldDecorator('qry_name', {})(
                  <Input/>
                )
              }
            </FormItem>
            <FormItem label="链接输出名称" {...formItemLayout}>
              {
                getFieldDecorator('out_name', {})(
                  <Input/>
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="报表类别" {...formItemLayout}>
              {
                getFieldDecorator('class_id', {})(
                  <Select  onChange={(value) => this.onSelectChange(value)} >
                    {this.state.queryClass.map(item =>
                      <Option key={item.class_id} value={item.class_id}>{item.class_name}</Option>
                    )}
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="报表名称" {...formItemLayout}>
              {
                getFieldDecorator('qry_id', {})(
                  <Select onChange={(value) => this.onQryNameSelectChange(value)} placeholder="请选择" name='reportName'>
                    {this.state.queryNames.map(item =>
                      <Option key={item.qry_id} value={item.qry_id}>{item.qry_name}</Option>
                    )}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>




        <Row>
          <Col>
            <Table ref="table"
              columns={this.columns}
              dataSource={this.state.data}
              rowKey='link_in_id'
              size="small" bordered pagination={false} />
          </Col>
        </Row>
        <Divider />

        <Button>清空</Button>
        <Button key="submit" type="primary" style={{ marginLeft: 10 }} onClick={() => this.SaveClick()}>
          保存
            </Button>
        <Button key="back" style={{ marginLeft: 10 }} onClick={this.handleCancel}>取消</Button>

      </Form >
    )
  }
}

export default CreateLink = Form.create()(CreateLink);