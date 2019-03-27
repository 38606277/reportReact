import React from 'react'
import { Card, Button, Table, Form, Input,Avatar,List,Pagination, Divider, Checkbox, Dropdown, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col, Tabs, Menu } from 'antd'
import HttpService from '../../util/HttpService.jsx';
import DbService from '../../service/DbService.jsx'
import './query.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const dbService = new DbService();
class NlpCreator extends React.Component {

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        this.state = {
            //定义状态
            tableData: [],
            columnData: [],
            //定义下拉查找的数据
            dbList: [],
            funcClassList: [],
            dbname:'',
            tablename:''
        };
        this.onSaveClick = this.onSaveClick.bind(this);
    }
    componentDidMount() {
        //查询DB定义
        dbService.getDbList()
            .then(res => {
                this.setState({ dbList: res });
            });
    }

   
    onSaveClick(e) {
        //this.child.setFormValue(res.data.in);
        
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let formInfo = this.props.form.getFieldsValue();
                formInfo.qry_type='procedure';
                formInfo.in = results;
                HttpService.post("reportServer/query/updateQuery", JSON.stringify(formInfo))
                    .then(res => {
                        if (res.resultCode == "1000") {
                            message.success(`更新成功！`)
                        }
                        else
                            message.error(res.message);
                    });
            }
            
        });
    }
    dbChange(e){
        this.setState({
            dbname:e
        })
        HttpService.post("reportServer/nlp/tableDefinition", e)
        .then(res => {
            if (res.resultCode == "1000") {
                this.setState({tableData: res.data});
                message.success(`查询成功！`)
            }
            else
                message.error(res.message);
        });
    }
    tableChange(e){
        let param={'dbname':this.state.dbname,'tableName':e}
        HttpService.post("reportServer/nlp/getColumnList",JSON.stringify(param))
        .then(res => {
            if (res.resultCode == "1000") {
                this.setState({columnData: res.data});
                message.success(`查询成功！`)
            }
            else
                message.error(res.message);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayouts = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 }
        };
        const formItemLayout1 = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 }
        };

        const formItemLayout2 = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        };
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
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 600
        }


        return (
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>
                <Card title={this.state.action == 'create' ? '创建查询' : '编辑查询'} bordered={false} bodyStyle={{ padding: "5px" }} headStyle={{ height: '40px' }}
                    extra={<div>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>保存</Button>
                        <Button icon="list" onClick={() => window.location = '#/query/QueryList'} style={{ marginRight: "10px" }}   >退出</Button>
                    </div>}>
                    <Form layout="inline" onSubmit={this.onSaveClick}>
                          <Row>
                            <Col  xs={24} sm={12}>
                                <FormItem label="选择数据库" {...formItemLayout}  style={{ marginBottom: "5px" }}>
                                    {
                                        getFieldDecorator('qry_db', {
                                            rules: [{ required: 'true', message: "必须选择数据库" }]
                                        })(
                                            <Select setValue={this.form} style={{ minWidth: '300px' }} onChange={(e)=>this.dbChange(e)}>
                                                {this.state.dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col  xs={24} sm={12}>
                                <FormItem label="表名"   {...formItemLayout}  >
                                    {
                                        getFieldDecorator('class_id', {
                                            rules: [{ required: true, message: '表名是必须的' }],
                                        })(
                                            <Select style={{ minWidth: '300px' }}  onChange={(e)=>this.tableChange(e)}>
                                                {this.state.tableData.map(item => <Option key={item} value={item}>{item}</Option>)}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                           
                    </Form>
                </Card>
                
            </div >
        );
    }

}
export default NlpCreator = Form.create({})(NlpCreator);