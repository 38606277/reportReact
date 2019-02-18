import React from 'react'
import { Card, Button, Table, Form, Input, Divider, Checkbox, Dropdown, Select, Radio, Icon, message, Modal, DatePicker, InputNumber, Switch, Row, Col, Tabs, Menu } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import EditIn from './EditIn.jsx';
import EditOut from './EditOut.jsx';
import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';

import DbService from '../../service/DbService.jsx'
import './query.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.ButtonGroup;


const functionService = new FunctionService();
const dbService = new DbService();
var source = { app: ["name", "score", "birthDate"], version: ["name", "score", "birthDate"], dbos: ["name", "population", "size"] };
const options = {

    lineNumbers: true,                //显示行号  
    mode: { name: "text/x-mysql" },          //定义mode  
    extraKeys: { "Ctrl-Enter": "autocomplete" },//自动提示配置  
    theme: "default",
    hintOptions: {
        tables: source
    }
};




// moment.locales('zh-cn');
class ProcedureCreator extends React.Component {

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        // alert(this.props.match.params.funcid);
        this.state = {
            //定义窗体参数
            action: this.props.action,
            qry_id: this.props.id,
            //定义状态
            inData: [],
            outData: [],
            //定义下拉查找的数据
            dbList: [],
            funcClassList: [],
            activeKey:"1",
        };
        this.onSaveClick = this.onSaveClick.bind(this);
    }
    componentDidMount() {

        if (this.state.action == 'update') {
            //查询函数定义
            let param = {};
            HttpService.post("reportServer/query/getQueryByID/" + this.state.qry_id, null)
                .then(res => {
                    if (res.resultCode == "1000") {
                        this.setState({
                            inData: res.data.in,
                            outData: res.data.out
                        });
                        this.props.form.setFieldsValue(res.data);
                        this.inParam.setFormValue(this.state.inData);
                        this.outParam.setFormValue(this.state.outData);







                    }
                    else
                        message.error(res.message);

                });

        }



        //查询DB定义
        dbService.getDbList()
            .then(res => {
                this.setState({ dbList: res });
            });

        //查询查询类别定义
        HttpService.post("reportServer/query/getAllQueryClass", '')
            .then(res => {
                console.log(JSON.stringify(res));
                if (res.resultCode == '1000') {
                    this.setState({ funcClassList: res.data });
                }
                else
                    message.error(res.message);
            });
    }

    // onRef = (ref) => {
    //     this.child = ref
    // }

    onSaveClick(e) {
        //this.child.setFormValue(res.data.in);
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(this.inParam.getFormValue());
                let formInfo = this.props.form.getFieldsValue();
                this.setState({
                    inData: this.inParam.getFormValue(),
                    outData: this.outParam.getFormValue(),
                });
                
                formInfo.in = this.state.inData;
                formInfo.out = this.state.outData;
                console.log(formInfo);

                if (this.state.action == 'create') {
                    HttpService.post("reportServer/query/createQuery", JSON.stringify(formInfo))
                        .then(res => {
                            if (res.resultCode == "1000") {
                                message.success('创建成功！');
                                this.setState({ action: 'update' });
                                this.props.form.setFieldsValue({ qry_id: res.data });
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
        });

    }


    onGenerateClick() {

        let aSQL = this.refs.editorsql.codeMirror.getValue();

        functionService.getSqlInOut(aSQL)
            .then(res => {
                if (res.resultCode = 1000) {
                    alert(JSON.stringify(res.data));
                    message.success('生成成功!');
                    let ins = [];
                    let outs = [];
                    for (var item of res.data) {
                        if (item.type == 'in') {
                            let aIn = {
                                "qry_id": "",
                                "in_id": item.id,
                                "in_name": item.name,
                                "datatype": item.datatype,
                                "dict_id": undefined,
                                "dict_name": undefined,
                                "authtype_id": undefined,
                                "authtype_desc": undefined,
                                "validate": ""
                            };
                            ins.push(aIn);
                        } else if (item.type == 'out') {
                            let aOut = {
                                "qry_id": "",
                                "out_id": item.id,
                                "out_name": item.name,
                                "datatype": item.datatype,
                                "render": undefined,
                                "width": 100,
                                "link": {},
                            };
                            outs.push(aOut);
                        }

                    }
                    this.setState({ inData: ins });
                    this.setState({ outData: outs });

                    this.inParam.setFormValue(this.state.inData);
                    this.outParam.setFormValue(this.state.outData);
                    // this.setState({ inData: res.data });
                } else {
                    message.error(res.message);
                }
            });



    }
    onAddRowClick() {
        const activeKey=this.state.activeKey;
        if(activeKey=="1"){
            this.inParam.addRows();
        }else{
            this.outParam.addRows();
        }
        //  alert('add');
        // let indexs=this.state.inData.length;
        // let aIn = {
        //     "qry_id": indexs,
        //     "in_id": indexs,
        //     "in_name": undefined,
        //     "datatype": undefined,
        //     "dict_id": undefined,
        //     "dict_name": undefined,
        //     "authtype_id": undefined,
        //     "authtype_desc": undefined,
        //     "validate": ""
        // };
        // let ins = [];
        // ins.push(aIn);
        // this.state.inData.push(aIn);
        // // this.setState({inData:ins});
        // this.inParam.getFormValue()
        // this.inParam.setFormValue(this.state.inData);

    }
    onDelRowClick() {
        const activeKey=this.state.activeKey;
        if(activeKey=="1"){
            this.inParam.deleteRows();
        }else{
            this.outParam.deleteRows();
        }
    }
    tabOnChange = (activeKey) => {
        this.setState({ activeKey:activeKey },function () { });
             
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
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
                    extra={<span>类型：存储过程</span>}>
                    <Form layout="inline" onSubmit={this.onSaveClick}>
                        <Row gutter={0}>
                            <Col span={10}>
                                <Card bodyStyle={{ padding: '8px' }} >
                                    <div>
                                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>保存</Button>
                                        <Button icon="list" onClick={() => window.location = '#/query/QueryList'} style={{ marginRight: "10px" }}   >退出</Button>
                                    </div>
                                    <Divider style={{ margin: "8px 0 8px 0" }} />

                                    <FormItem label="选择数据库" {...formItemLayout} style={{ marginBottom: "5px", textAlign: "left" }}>
                                        {
                                            getFieldDecorator('qry_db', {
                                                rules: [{ required: 'true', message: "必须选择数据库" }]
                                            })(
                                                <Select setValue={this.form} style={{ minWidth: '300px' }}>
                                                    {this.state.dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                                </Select>
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="存储过程名称"  {...formItemLayout}>
                                        {
                                            getFieldDecorator('qry_name', {
                                                rules: [{ required: true, message: '函数名称是必须的', whitespace: true }],
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="游标名称" {...formItemLayout}>
                                        {
                                            getFieldDecorator('qry_name', {
                                                rules: [{ required: true, message: '函数名称是必须的', whitespace: true }],
                                            })(
                                                <Input style={{ minWidth: '300px' }} />
                                            )
                                        }
                                    </FormItem>


                                </Card>
                            </Col>

                            <Col span={14}>
                                <Card bodyStyle={{ padding: '5px' }}>
                                    <Row>
                                        <Col span={16}>
                                            <FormItem label=" 查询类别"    >
                                                {
                                                    getFieldDecorator('class_id', {
                                                        rules: [{ required: true, message: '函数名称是必须的' }],
                                                    })(
                                                        <Select style={{ minWidth: '300px' }}  >
                                                            {this.state.funcClassList.map(item =>
                                                                <Option key={item.class_id} value={item.class_id}>{item.class_name}</Option>
                                                            )}
                                                        </Select>
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="查询ID"  >
                                                {
                                                    getFieldDecorator('qry_id', {
                                                    })(
                                                        <Input disabled style={{ width: '80px' }} />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={16}>
                                            <FormItem label=" 查询名称"   >
                                                {
                                                    getFieldDecorator('qry_name', {
                                                        rules: [{ required: true, message: '函数名称是必须的' }],
                                                    })(
                                                        <Input style={{ minWidth: '300px' }} />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem label="使用缓存"   >
                                                {
                                                    getFieldDecorator('cached', {
                                                        valuePropName: 'checked'
                                                    })(
                                                        <Checkbox />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <FormItem label="查询说明" style={{ marginLeft: '14px' }}  >
                                                {
                                                    getFieldDecorator('qry_desc', {
                                                    })(
                                                        <TextArea placeholder="此函数主要完成什么功能..." autosize={{ minRows: 1, maxRows: 6 }} style={{ width: "490px" }} />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Tabs type="card" style={{ marginTop: '15px' }} onChange={this.tabOnChange}
                                        tabBarExtraContent={<span><Button icon="plus" onClick={() => this.onAddRowClick()} />
                                            <Button icon="minus" onClick={() => this.onDelRowClick()} /></span>}>
                                        <TabPane tab="输入参数" key="1" >
                                            <EditIn onRef={(ref) => this.inParam = ref} editable={true}/>
                                        </TabPane>
                                        <TabPane tab="输出参数" key="2" forceRender>
                                            <EditOut onRef={(ref) => this.outParam = ref} action={this.state.action} editable={true} />
                                        </TabPane>
                                    </Tabs>

                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div >
        );
    }

}
export default ProcedureCreator = Form.create({})(ProcedureCreator);