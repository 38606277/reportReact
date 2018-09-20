import React from 'react'
import { Card, Button, Table, Form, Input, Divider, Checkbox, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col, Tabs } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import EditableTable from './EditTable.jsx';
import FunctionService from '../../service/FunctionService.jsx'
import DbService from '../../service/DbService.jsx'
import './function.css';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.ButtonGroup;


const functionService = new FunctionService();
const dbService = new DbService();
const options = {

    lineNumbers: true,                //显示行号  
    mode: { name: "text/x-mysql" },          //定义mode  
    extraKeys: { "Ctrl": "autocomplete" },//自动提示配置  
    theme: "default"


};

var data = [
    {
        "in_name": "b",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/会计科目",
        "in_id": "period_num"
    },
    {
        "in_name": "a",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/查询公司信息",
        "in_id": "period_year"
    }
];

var data1 = [
    {
        "in_name": "b",
        "isformula": "false",
        "datatype": "varchar",
        "func_id": 36,
        "dict": "数据字典/会计科目",
        "in_id": "period_num"
    }
];

// for (let i = 0; i < 3; i++) {
//     data.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London. ${i}`,
//     });
// }

// moment.locales('zh-cn');
class functionCreator extends React.Component {

    state = {};
    constructor(props) {
        super(props);
        // alert(this.props.match.params.funcid);
        this.state = {

            //create 新增,update 编辑,view 查看
            action: "create",
            //定义函数状态
            func_id: this.props.match.params.funcid,
            func_name: "",
            func_desc: "",
            func_url: "",
            program: "",
            func_type: "",
            inData: [],
            outData: [],
            //定义下拉查找的数据
            list: [],
            dbList: [],
            dictList: [],
            authList: [],


        };


    }
    componentDidMount() {

        //查询函数定义
        functionService.getFunctionByID(this.state.func_id)
            .then(res => {
                this.setState({ inData: res.in });
                this.setState({ outData: res.out });
                this.props.form.setFieldsValue(res);
                this.refs.editorsql.codeMirror.setValue(res.program);
                let editorsql = this.refs.editorsql;
                editorsql.codeMirror.setSize('100%', '500px');
                editorsql.codeMirror.border = "solid  1px";

            });

        //查询DB定义
        dbService.getDbList()
            .then(res => {
                this.setState({ dblist: res });
            });

       
    }
    handleSubmit1() {
        //    alert("ss")
        //    this.setState({
        //        userInfo:{
        //            userName:"xxxx"
        //        }
        //    })
        this.props.form.setFieldsValue(
            {
                userName: "kkkk",
                userPwd: "111111"
            }
        );
    }
    handleSubmit() {
        //alert("hello");
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 保存成功!：${userInfo.userPwd}`)
    }
    onGenerateClick() {
        let aSQL = this.refs.editorsql.codeMirror.getValue();

        functionService.getSqlInOut(aSQL)
            .then(res => {
                if (res.resultCode = 1000) {
                    alert(JSON.stringify(res.data));
                    message.success('生成成功!')
                    this.setState({ inData: res.data });
                } else {
                    message.error(res.message);
                }
            });



    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 }
        };
        const formItemLayout1 = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 }
        };

        const formItemLayout2 = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
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

        const columns = [{
            title: '参数名',
            dataIndex: 'userId',
            key: 'userId',
            width: '150px'
        }, {
            title: '参数说明',
            dataIndex: 'userName',
            key: 'userName',
            width: '150px',
            render: function (text, record, index) {
                return <Link to={`/user/userInfo/${record.id}`}>{text}</Link>;
            }
        }, {
            title: '参数类型',
            dataIndex: 'description',
            key: 'description',
            width: '150px'
        }, {
            title: '数据字典',
            dataIndex: 'isAdminText',
            key: 'isAdminText',
            width: '150px'
        }, {
            title: '数据权限',
            dataIndex: 'creationDate',
            key: 'creationDate',
            width: '150px'
        }];

        const rowObject = {
            minRows: 4, maxRows: 600
        }

        return (


            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px' }}>

                <Card title="创建函数" bodyStyle={{ padding: "5px" }}>
                    <Row gutter={0}>

                        <Col span={12}>
                            <Card bodyStyle={{ padding: '8px' }}>
                                <div>
                                    <Button type="primary" icon="plus" onClick={() => this.onGenerateClick()} style={{ marginRight: "10px" }} >生成函数</Button>
                                    <Button type="primary" icon="edit" style={{ marginRight: "10px" }} >保存</Button>
                                    <Button type="primary" icon="delete" style={{ marginRight: "10px" }}   >退出</Button>
                                </div>
                                <Divider style={{ margin: "8px 0 8px 0" }} />
                                <Form>
                                    <FormItem label="选择数据库" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} style={{ marginBottom: "10px" }}>
                                        {
                                            getFieldDecorator('db', {
                                                initialValue: '0'
                                            })(
                                                <Select>
                                                    {this.state.dbList.map(d => <Option key={d.name}>{d.name}</Option>)}
                                                    {/* <Option value="0">ERP</Option>
                                                <Option value="1">预算</Option>
                                                <Option value="2">BI</Option>
                                                <Option value="3">Form</Option> */}
                                                </Select>
                                            )
                                        }
                                    </FormItem>

                                    <Tabs type="card" tabBarExtraContent={<Button icon="profile" style={{ color: "blue" }}></Button>}>
                                        <TabPane tab="输入SQL" key="1">
                                            <CodeMirror ref="editorsql" value='select * from AAA' style={{ height: '600px', width: '450px', border: "1px" }} options={options} />
                                        </TabPane>

                                    </Tabs>



                                </Form>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card bodyStyle={{ padding: '5px' }}>
                                <Form layout="inline">
                                    <Row>
                                        <Col span={12}>

                                            <FormItem label=" 函数编号" style={{ marginBottom: "1px" }} >
                                                {
                                                    getFieldDecorator('func_id', {
                                                        initialValue: ''
                                                    })(

                                                        <Input disabled />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem label="函数名称" style={{ marginBottom: "1px" }} >
                                                {
                                                    getFieldDecorator('func_name', {
                                                        initialValue: ''
                                                    })(

                                                        <Input />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <FormItem label="函数说明"  >
                                                {
                                                    getFieldDecorator('func_desc', {
                                                        initialValue: ''
                                                    })(
                                                        <TextArea placeholder="此函数主要完成什么功能..." autosize={{ minRows: 1, maxRows: 6 }} style={{ width: "490px" }} />

                                                    )
                                                }
                                            </FormItem>
                                        </Col>

                                    </Row>





                                    <Tabs type="card" style={{ marginTop: '15px' }}>
                                        <TabPane tab="输入参数" key="1"> <EditableTable data={this.state.inData} /></TabPane>
                                        <TabPane tab="输出参数" key="2"> <EditableTable data={this.state.outData} /></TabPane>
                                    </Tabs>
                                </Form>
                            </Card>
                        </Col>
                    </Row>

                </Card>

            </div >
        );
    }

}
export default functionCreator = Form.create({})(functionCreator);