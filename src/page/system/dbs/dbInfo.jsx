import React from 'react';
import DB from '../../../service/DbService.jsx'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Button, Card, Row, Col, message,Avatar ,Modal ,List ,Pagination  } from 'antd';
import LocalStorge from '../../../util/LogcalStorge.jsx';
import HttpService from '../../../util/HttpService.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;
const db = new DB();

const url = window.getServerUrl();
class DbInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      _name: this.props.match.params.name,
      loading: false,
      visible: false, icon: null,
      pageNumd: 1, perPaged: 10, totald: 0, imgList: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  //初始化加载调用方法
  componentDidMount() {
    if (null != this.state._name && '' != this.state._name && 'null' != this.state._name) {
      db.getDb(this.state._name).then(response => {
        // this.setState(response);
        this.props.form.setFieldsValue(response);
        this.setState({icon:response.icon});
      }, errMsg => {
        this.setState({});
        localStorge.errorTips(errMsg);
      });
    }

  }

  //编辑字段对应值
  onSelectChange(name, value) {
    let drivers = null;
    let urls = null;
    if (value == 'Oracle') {
      drivers = 'oracle.jdbc.OracleDriver';
      urls = 'jdbc:oracle:thin:@ip:port:xe';
    } else if (value == 'Mysql') {
      drivers = 'com.mysql.cj.jdbc.Driver';
      urls = 'jdbc:mysql://ip:port/xe';
    } else if (value == 'DB2') {
      drivers = 'com.ibm.db2.jcc.DB2Driver';
      urls = 'jdbc:db2://ip:port/xe';
    } else if (value == 'mongoDB') {
      drivers = '';
      urls = 'ip:port';
    }
    // this.setState({[name]:value,driver:drivers,url:urls});  

    this.props.form.setFieldsValue({ [name]: value, driver: drivers, url: urls });

  }
  //编辑字段对应值
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    //this.setState({[name]:value});  
    this.props.form.setFieldsValue({ [name]: value });

  }

  //提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values._name = this.state._name;
        db.saveDb(values).then(response => {
          message.success("保存成功");
          window.location.href = "#/dbs";
        }, errMsg => {
          this.setState({});
          localStorge.errorTips(errMsg);
        });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  clickTest() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        db.testDb(values).then(response => {
          if (response.retCode == 'true') {
            message.success(response.retMsg);
          } else {
            message.error("连接失败："+response.retMsg);
          }

        }, errMsg => {
          message.error("连接失败：" + errMsg);
        });
      }
    });

  }
  openImage = () => {
    this.setState({
        visible: true,
        imgList: [],
        totald: 0, selectedRowKeys: []
    }, function () {
        this.loadModelData();
    });
  }
   //调用模式窗口内的数据查询
   loadModelData() {
    let page = {};
    page.pageNum = this.state.pageNumd;
    page.perPage = this.state.perPaged;
    HttpService.post("/reportServer/uploadFile/getAll", JSON.stringify(page)).then(response => {
        this.setState({ imgList: response.data.list, totald: response.data.total });
    }, errMsg => {
        this.setState({
            imgList: []
        });
    });
  }
  // 字典页数发生变化的时候
  onPageNumdChange(pageNumd) {
      this.setState({
          pageNumd: pageNumd
      }, () => {
          this.loadModelData();
      });
  } 
  clickimg(usefilepath, name) {
      this.props.form.setFieldsValue({ icon: usefilepath });
      this.setState({
          visible: false,
          icon: usefilepath
      });
  }
  //模式窗口点击取消
  handleCancel = (e) => {
      this.setState({
          visible: false
      });
  }
  handleOk = (e) => {
      this.setState({
          visible: false
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
        <Card title={this.state._name == 'null' ? '新建连接' : '编辑连接'}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label="连接名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入连接名称!' }],
                  })(
                    <Input type='text' name='name' placeholder='数据库连接名称' />
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='数据库类型' >
                  {getFieldDecorator('dbtype', {
                    rules: [{ required: true, message: '请选择数据库类型!', whitespace: true }],
                  })(
                    <Select name='dbtype' style={{ width: 120 }} onChange={(value) => this.onSelectChange('dbtype', value)}>
                      <Option value='Oracle' >Oracle</Option>
                      <Option value='Mysql' >Mysql</Option>
                      {/* <Option value='DB2' >DB2</Option>
                      <Option value='mongoDB' >mongoDB</Option> */}
                      <Option value='TAOS' >TAOS</Option>
                      <Option value='HBASE' >HBASE</Option>
                      <Option value='HIVE' >HIVE</Option>
                      <Option value='SQLServer' >SQLServer</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='驱动类型' >
                  {getFieldDecorator('driver', {
                    rules: [{ required: true, message: '请输入驱动类型!', whitespace: true }],
                  })(
                    <Input type='text' name='driver' />
                  )}
                </FormItem>
              </Col>


              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='地址'>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请输入驱动类型!', whitespace: true }],
                  })(
                    <Input type='text' name='url' />
                  )}
                </FormItem>
              </Col>
            </Row>
            
            <Row>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='用户名'>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                  })(
                    <Input type='text' name='username' />
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={12} >

                <FormItem {...formItemLayout} label='密码'>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码', whitespace: true }],
                  })(
                    <Input.Password type='text' name='password' />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='描述' >
                  {getFieldDecorator('desc', {
                    rules: [{ required: true, message: '请输入描述!', whitespace: true }],
                  })(
                    <Input type='text' name='desc' />
                  )}
                </FormItem>
              </Col>
              {/* <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='图标'>
                  {getFieldDecorator('icon', {
                    rules: [{ required: true, message: '请选择图标!', whitespace: true }],
                  })(
                    <Input type='text' name='icon' />
                  )}
                </FormItem>
              </Col> */}
              <Col xs={24} sm={12}>
                    <FormItem label="关联图片" style={{ marginLeft: '14px' }}  >
                      {getFieldDecorator('icon', {
                        rules: [{ required: true, message: '请选择图标!', whitespace: true }],
                      })(
                        <Input style={{ minWidth: '300px',display:'none' }} name="icon" id="icon" value={this.state.icon} onClick={this.openImage} />
                      )}
                      {this.state.icon == null ?
                          <Avatar src={require("./../../../asset/logo.png")} onClick={this.openImage} />
                          : <Avatar src={url + "/report/" + this.state.icon} onClick={this.openImage} />}
                             
                    </FormItem>
                </Col>
                
            </Row>
            <Row>
              <Col xs={24} sm={12}>
                <FormItem {...formItemLayout} label='类别' >
                  {getFieldDecorator('dbclass', {
                    rules: [{ required: true, message: '请输入类别!', whitespace: true }],
                  })(
                    <Input type='text' name='dbclass' />
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" onClick={() => this.clickTest()}>测试</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '30px' }}>保存</Button>
              <Button href="#/dbs" type="primary" style={{ marginLeft: '30px' }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
        <div>
            <Modal title="图片选择" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.imgList}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={url + "/report/" + item.usefilepath} />}
                                description={<a onClick={() => this.clickimg(item.usefilepath, item.filename)} >{item.filename}</a>}
                            />
                        </List.Item>
                    )}
                />

                <Pagination current={this.state.pageNumd}
                    total={this.state.totald}
                    onChange={(pageNumd) => this.onPageNumdChange(pageNumd)} />
            </Modal>
        </div>
      </div>
    );
  }
}
export default Form.create()(DbInfo);