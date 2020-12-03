import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Input,
    Table,
    Button,
    Modal,
    Card,
    Row,
    Col,
    Select,
    message,
    Tabs,
    Divider,
    Tag,
} from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
import HttpService from '../../util/HttpService.jsx';
import ReactEcharts from 'echarts-for-react';
import './corp.css';
import './pc_public.css';
import './data_index.css'
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const _query = new QueryService();
const FormItem = Form.Item;
const Search = Input.Search;


const { Option } = Select;

const indataSource = [
    {
        no: '1',
        name: '北新建材',
        income: 32,
        address: '西湖区湖底公园1号',
    },
    {
        no: '1',
        name: '洛阳玻璃',
        income: 32,
        address: '西湖区湖底公园1号',
    },
    {
        no: '1',
        name: '天山水泥',
        income: 32,
        address: '西湖区湖底公园1号',
    },
];

const outdataSource = [
    {
        no: '1',
        name: '海螺水泥',
        income: 32,
        address: '西湖区湖底公园1号',
    },
    {
        no: '1',
        name: '冀东水泥',
        income: 32,
        address: '西湖区湖底公园1号',
    },
];


class corp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            cube_id: this.props.match.params.cube_id,
            qry_id: '',
            cube_name: '',
            cube_desc: '',
            visible: false,
            dictionaryList: [],
            qry_name: '',
            cube_sql: '',
            list: []
        };

    }

    //初始化加载调用方法
    componentDidMount() {
        this.loadDataList();


    }

    loadDataList() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/finance/getAllCorp', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    list: res.data,
                });
            }
            else {
                message.error(res.message);
            }
        }, errMsg => {
            this.setState({
                list: [], loading: false
            });
        });
    }


    render() {

        return (
            <div id="page-wrapper" style={{ backgroundColor: '#ededed' }}>
                <Form >
                    <Card bodyStyle={{ backgroundColor: '#ececec', padding: '15px' }} >
                    
                            {/* <Row gutter={15}>
                                <Col span={8}>
                                    <div class="dynamic_data_list fl">
                                        <div class="public_tltie_one"><i></i><h3>上市公司总数<span>Total number of listed companies</span></h3></div>

                                        <div class="dynamic_d_l_sjone mg_tone bgone">
                                            <h3 class="timer count-numberx" data-to="3711" data-speed="1500">3,711<span>（家）</span></h3>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <i className='public_tltie_one'></i>
                                    <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '20px', height: '22px', lineHeight: '22px', color: 'black' }}>企业财务分析</label>
                                    <Divider dashed style={{ marginTop: '12px' }} />
                                 
                                </Col>
                                <Col span={8}>
                                    <i className='public_tltie_one'></i>
                                    <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '20px', height: '22px', lineHeight: '22px', color: 'black' }}>企业财务分析</label>
                                    <Divider dashed style={{ marginTop: '12px' }} />
                                   
                                </Col>
                            </Row> */}
                              <div class="dynamic_data mg_ttwo">
            <div class="dynamic_data_list fl">
                <div class="public_tltie_one"><i></i><h3>上市公司总数<span>Total number of listed companies</span></h3></div>

                <div class="dynamic_d_l_sjone mg_tone bgone">
                    <h3 class="timer count-numberx" data-to="3711" data-speed="1500">3,711<span>（家）</span></h3>
                </div>
                <div class="clear"></div>
            </div>

            <div class="dynamic_data_list fl mg_lfive">
                <div class="public_tltie_one"><i></i><h3>上海证券交易所<span>Shanghai Stock Exchange</span></h3></div>

                <div class="dynamic_d_l_sjtwo mg_tone bgtheer">
                    <div class="shenzhen_box">
                        <div class="dy_d_l_s_four">
                            <h3 class="timer count-numbery" data-to="1528" data-speed="1500">1,528</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>上市公司总数</span>
                        </div>
                        <div class="dy_d_l_s_six s_one">
                            <h3 class="timer count-numbery" data-to="1485" data-speed="1500">1,485</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>A股数量</span>
                        </div>
                        <div class="dy_d_l_s_six s_two">
                            <h3 class="timer count-numbery" data-to="34" data-speed="1500">34</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>科创版</span>
                        </div>
                        <div class="dy_d_l_s_six s_theer">
                            <h3 class="timer count-numbery" data-to="52" data-speed="1500">52</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>B股数量</span>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

            <div class="dynamic_data_list fl mg_lfive">
                <div class="public_tltie_one"><i></i><h3>深圳证券交易所<span>Shenzhen Stock Exchange</span></h3></div>

                <div class="dynamic_d_l_sjtwo mg_tone bgtheer">
                    <div class="shenzhen_box">
                        <div class="dy_d_l_s_four">
                            <h3 class="timer count-numbery" data-to="2183" data-speed="1500">2,183</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>上市公司总数</span>
                        </div>
                        <div class="dy_d_l_s_six s_one">
                            <h3 class="timer count-numbery" data-to="471" data-speed="1500">471</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>深市主板</span>
                        </div>
                        <div class="dy_d_l_s_six s_two">
                            <h3 class="timer count-numbery" data-to="939" data-speed="1500">939</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>中小企业板</span>
                        </div>

                        <div class="dy_d_l_s_six s_theer">
                            <h3 class="timer count-numbery" data-to="773" data-speed="1500">773</h3>
                            <div class="dy_d_l_s_o_x"></div>
                            <span>创业板</span>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>


            
                        <Row style={{ marginTop: '20px' }}>
                            <Col sm={24}>
                                <Card style={{ boxShadow: '0 2px 3px 0 rgba(0,0,0,.2)' }}>
                                    <i className='public_tltie_one'></i>
                                    <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '20px', height: '22px', lineHeight: '22px', color: 'black' }}>企业财务分析</label>
                                    <Divider dashed style={{ marginTop: '12px' }} />

                                    <Row gutter={32} >
                                        <Col sm={12}>
                                            <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '15px', height: '22px', lineHeight: '22px', color: 'black' }}>内部企业</label>
                                            <Divider style={{ marginTop: '12px' }} />
                                            <Table
                                                dataSource={this.state.list} pagination={false} >
                                                <Table.Column title="序号" dataIndex="serial_number" key="age" />
                                                <Table.Column title="企业名称" dataIndex="company_name" key="address"
                                                    render={(text, record) => {
                                                        return <Link to={`/dataApp/finance/${record.company_name}`}>{text}</Link>;

                                                    }} />
                                                <Table.Column title="收入" dataIndex="main_bussiness_income" key="age" />
                                            </Table>
                                        </Col>
                                        <Col sm={12}>
                                            <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '16px', height: '22px', lineHeight: '22px', color: 'black' }}>外部企业</label>
                                            <Divider style={{ marginTop: '12px' }} />
                                            <Table
                                                dataSource={outdataSource} pagination={false}>
                                                <Table.Column title="序号" dataIndex="no" key="age" />
                                                <Table.Column title="企业名称" dataIndex="name" key="address"
                                                    render={(text, record) => {
                                                        return <Link to={`/dataApp/finance/${record.company_name}`}>{text}</Link>;

                                                    }
                                                    } />


                                                <Table.Column title="收入" dataIndex="income" key="age" />
                                            </Table>
                                        </Col>

                                    </Row>
                                </Card>
                            </Col>


                        </Row>


                    </Card>
                </Form>
            </div>
        );
    }
}
export default Form.create()(corp);