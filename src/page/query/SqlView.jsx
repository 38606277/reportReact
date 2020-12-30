import React from 'react'
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { BarsOutlined, ToolOutlined } from '@ant-design/icons';
import {
    Card,
    Button,
    Table,
    Input,
    Divider,
    Avatar,
    Checkbox,
    List,
    Dropdown,
    Pagination,
    Select,
    Radio,
    message,
    Modal,
    DatePicker,
    InputNumber,
    Switch,
    Row,
    Col,
    Tabs,
    Menu,
} from 'antd';
import moment from 'moment';
import {SplitPane} from 'react-split-pane';
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
import "@babel/polyfill";
import { black } from 'ansi-colors';
import { red } from 'ansi-colors';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.ButtonGroup;
const { Column, ColumnGroup } = Table;

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



const url = window.getServerUrl();
class SqlView extends React.Component {

    state = {};
    func_data = {};
    constructor(props) {
        super(props);
        this.state = {
            //定义窗体参数
            action: this.props.match.params.action,
            qry_id: this.props.match.params.id,
            qry_name:'',
            qry_desc:'',
            //定义状态
            inData: [],
            outData: [],
            //定义下拉查找的数据
            dbList: [],
            funcClassList: [],
            loading: false,
            visible: false, qry_file: null,
            pageNumd: 1, perPaged: 10, totald: 0,
            mainHeigth: window.innerHeight - 80 + 'px',
        };
    }
    componentDidMount() {

        if (this.state.action == 'view') {
            //查询函数定义
            let param = {};
            HttpService.post("reportServer/query/getQueryByID/" + this.state.qry_id, null)
                .then(res => {
                    if (res.resultCode == "1000") {
                        this.setState({
                            inData: res.data.in,
                            outData: res.data.out,
                            qry_file: res.data.qry_file,
                            qry_name:res.data.qry_name,
                            qry_desc:res.data.qry_desc
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
    clickimg(id, name) {
        this.props.form.setFieldsValue({ qry_file: id });
        this.setState({
            visible: false,
            qry_file: id
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
            <div id="page-wrapper" style={{ background: '#ECECEC', padding: '0px',height:this.state.mainHeigth }}>
                <Card title={'SQL查询详情'} bordered={false} bodyStyle={{ padding: "5px" }} headStyle={{ height: '40px' }}
                    extra={<span>类型：SQL语句</span>}>
                    <Card bodyStyle={{ padding: '0px' }} title={'*基本信息'}>
                        <Row>
                            <Col span={8}>
                                服务名称
                            </Col>
                            <Col span={16}>
                               {this.state.qry_name}|{this.state.qry_desc}
                            </Col>

                        </Row>
                        <Row>
                            <Col span={8}>
                                服务地址
                            </Col>
                            <Col span={16}>
                                http://localhost:8086/#/query/SqlView/view/{this.state.qry_id}
                            </Col>

                        </Row>
                        <Row>
                            <Col span={6}>
                                服务类型
                            </Col>
                            <Col span={6}>
                                原子服务
                            </Col>
                            <Col span={6}>
                                所属部门
                            </Col>
                            <Col span={6}>
                                行政部门
                            </Col>
                        </Row>
                    </Card>
                    <Card title={'*参数信息'}>
                        <Table  dataSource={this.state.inData} pagination={false}>
                            <Column
                                title="参数名称"
                                dataIndex="in_id"
                            />
                            <Column
                                title="参数类型"
                                dataIndex="datatype"
                            />
                            <Column
                                title="参数说明"
                                dataIndex="in_name"
                            />
                            
                        </Table>
                    </Card>
                    <Row>
                        <Col>
                        {'调用方式说明'}
                        </Col>
                        <Col>
                            {'data:'}
                        </Col>
                    </Row>
                    <Card title={'*返回参数说明'}>
                            <Table  dataSource={this.state.outData} pagination={false}>
                                <Column
                                    title="参数名称"
                                    dataIndex="out_id"
                                />
                                <Column
                                    title="参数类型"
                                    dataIndex="datatype"
                                />
                                <Column
                                    title="参数说明"
                                    dataIndex="out_name"
                                />
                                
                            </Table>
                        </Card>
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
            </div >
        );
    }

}
export default SqlView = Form.create({})(SqlView);