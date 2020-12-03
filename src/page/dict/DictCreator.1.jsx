import React from 'react'
import { DownOutlined, ProfileOutlined, SaveOutlined, ToolOutlined } from '@ant-design/icons';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Card,
    Button,
    Table,
    Input,
    Divider,
    Checkbox,
    Dropdown,
    Select,
    Radio,
    message,
    Progress,
    radioButton,
    Modal,
    DatePicker,
    InputNumber,
    Switch,
    Row,
    Col,
    Tabs,
    Menu,
} from 'antd';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
import HttpService from '../../util/HttpService.jsx';
import DbService from '../../service/DbService.jsx'
import './Dict.scss';

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



// moment.locales('zh-cn');
class functionCreator extends React.Component {

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        // alert(this.props.match.params.funcid);
        this.state = {
            //定义窗体参数
            action: this.props.match.params.action,
            dict_id: this.props.match.params.id,
            //定义状态
            inData: [],
            outData: [],
            //定义下拉查找的数据
            dbList: [],
            funcClassList: [],
        };
    }
    componentDidMount() {

        if (this.state.action == 'update') {
            //查询函数定义
            let param = {};
            HttpService.post("reportServer/dict/getDictByID/" + this.state.dict_id, null)
                .then(res => {
                    if (res.resultCode == "1000") {
                        this.setState({
                            outData: res.data.out
                        });
                        this.props.form.setFieldsValue(res.data);
                        this.outParam.setFormValue(this.state.outData);



                        this.refs.editorsql.codeMirror.setValue(res.data.func_sql);

                        let editorsql = this.refs.editorsql;
                        editorsql.codeMirror.setSize('100%', '500px');
                        editorsql.codeMirror.border = "solid  1px";
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

        //查询函数类别定义
        functionService.getAllFunctionClass()
            .then(res => {
                console.log(JSON.stringify(res));
                if (res.resultCode == '1000') {
                    this.setState({ funcClassList: res.data });
                }
                else
                    message.error(res.message);
            });
    }

    onRef = (ref) => {
        this.child = ref
    }

    onSaveClick() {
        //alert("hello");
        //校验参数合法性
        // e.preventDefault();
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //   if (!err) {
        // //let  users=this.props.form.getFieldsValue();
        // //  console.log(this.state);
        // // console.log(values);
        //   _user.saveUserInfo(this.state).then(response => {
        //     alert("修改成功");
        //     window.location.href="#user/userList";
        //   }, errMsg => {
        //       this.setState({
        //       });
        //       localStorge.errorTips(errMsg);
        //   });
        //console.log('Received values of form: ', this.state);
        //   }
        // });



        //调用服务保存

        //this.child.setFormValue(res.data.in);
        let formInfo = this.props.form.getFieldsValue();
        this.setState({
            outData: this.outParam.getFormValue(),
        });
        formInfo.func_sql = this.refs.editorsql.codeMirror.getValue();
        formInfo.out = this.state.outData;
        console.log(formInfo);
        // let sql = this.refs.editorsql.codeMirror.getValue();
        // this.func_data = formInfo;
        // this.func_data.in = this.child.getFormValue();
        // //this.func_data.in = this.state.inData;
        // this.func_data.out = this.state.outData;
        // this.func_data.program = sql;

        // console.log(JSON.stringify(this.func_data));
        // console.log(this.state);
        //
        // functionService.CreateFunction(userInfo)
        // .then(res=>{

        // })
        //message.success(`${userInfo.userName} 保存成功!：${userInfo.userPwd}`)
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
                                "dict_id": "",
                                "authtype_id": "",
                                "in_name": item.name,
                                "dict_name": "",
                                "isformula": 0,
                                "authtype_desc": "",
                                "datatype": item.datatype,
                                "func_id": "",
                                "in_id": item.id,
                                "validate": ""
                            };
                            ins.push(aIn);
                        } else if (item.type == 'out') {
                            let aOut = {
                                "out_name": item.name,
                                "datatype": item.datatype,
                                "link": "{}",
                                "func_id": 36,
                                "out_id": item.id
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
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
                <Card title="创建字典" bodyStyle={{ padding: "5px" }} headStyle={{ height: '60px' }}
                    extra={<Dropdown overlay={(
                        <Menu onClick={this.handleMenuClick}>
                            <Menu.Item key="1">存储过程</Menu.Item>
                            <Menu.Item key="2">http请求</Menu.Item>
                            <Menu.Item key="3">WEBService</Menu.Item>
                        </Menu>
                    )}>
                        <Button style={{ marginLeft: 8 }}>
                            SQL <DownOutlined />
                        </Button>
                    </Dropdown>}>
                    <Form layout="inline">
                        <Row gutter={0}>
                            <Col span={10}>
                                <Card bodyStyle={{ padding: '8px' }}>
                                    <div>
                                    <Button type="primary" icon={<ToolOutlined />} onClick={() => this.onGenerateClick()} style={{ marginRight: "10px" }} >生成字典</Button>
                                        <Button icon={<SaveOutlined />} onClick={() => this.onSaveClick()} style={{ marginRight: "10px" }} >保存</Button>
                                        <Button icon={<LegacyIcon type="list" />} onClick={() => window.location = '#/dict/DictList'} style={{ marginRight: "10px" }}   >退出</Button>
                                    </div>
                                    <Divider style={{ margin: "8px 0 8px 0" }} />

                                    <FormItem label="选择数据库" style={{ marginBottom: "10px" }}>
                                        {
                                            getFieldDecorator('dict_db', {
                                                rules: [{ required: 'true', message: "必须选择数据库" }]
                                            })(
                                                <Select setValue={this.form} style={{ width: '160px' }}>
                                                    {this.state.dbList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                    <Tabs type="card" tabBarExtraContent={<Button icon={<ProfileOutlined />} style={{ color: "blue" }}></Button>}>
                                        <TabPane tab="输入SQL" key="1">
                                            <CodeMirror ref="editorsql" value='' style={{ height: '600px', width: '450px', border: "1px" }} options={options} />
                                        </TabPane>
                                    </Tabs>
                                </Card>
                            </Col>

                            <Col span={14}>
                                <Card bodyStyle={{ padding: '5px' }}>
                                    <Row>
                                        <Col span={12}>
                                            <FormItem label=" 字典名称"   >
                                                {
                                                    getFieldDecorator('dict_name', {
                                                        rules: [{ required: true, message: '函数名称是必须的' }],
                                                    })(
                                                        <Input style={{ minWidth: '100px' }} />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem label="字典ID"  >
                                                {
                                                    getFieldDecorator('dict_id', {
                                                    })(
                                                        <Input disabled />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <FormItem label="字典说明" style={{ marginLeft: '14px' }}  >
                                                {
                                                    getFieldDecorator('dict_desc', {
                                                    })(
                                                        <TextArea placeholder="此字典主要完成什么功能..." autosize={{ minRows: 1, maxRows: 6 }} style={{ width: "490px" }} />
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:'20px'}}>
                                        <Col span={6} offset={1} >
                                            <Button type="primary" style={{width:'120px'}}>开始同步</Button>
                                        </Col>
                                        <Col span={12}>
                                            <Progress percent={30}/>
                                        </Col>
                                    </Row>
                            

                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Card>

            </div >
        );
    }

}
export default functionCreator = Form.create({})(functionCreator);