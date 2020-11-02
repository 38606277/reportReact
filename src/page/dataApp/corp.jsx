import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Table, Button, Modal, Card, Row, Col, Select, message, Tabs, Divider, Tag } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
import HttpService from '../../util/HttpService.jsx';
import ReactEcharts from 'echarts-for-react';
import './corp.css';
import './pc_public.css';
import './data_index.css';
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
            <div style={{ backgroundColor: '#ededed' }}>
                <Form >
                    <Card bodyStyle     ={{ backgroundColor: '#ececec', padding: '10px' }} >

                       
                        <div class="dynamic_data mg_ttwo">
                            <div class="dynamic_data_list fl">
                                <div class="public_tltie_one">
                                <i></i>
                                    <h3>集团公司数量<span>Total number of listed companies</span></h3>
                                    </div>

                                <div class="dynamic_d_l_sjone mg_tone bgone">
                                    <h3 class="timer count-numberx" data-to="3711" data-speed="1500">1,377<span>（家）</span></h3>
                                </div>
                                <div class="clear"></div>
                            </div>

                            <div class="dynamic_data_list fl mg_lfive">
                                <div class="public_tltie_one"><i></i><h3>上市公司数量<span>Shanghai Stock Exchange</span></h3></div>

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
                                <div class="public_tltie_one"><i></i><h3>水泥企业数量<span>Shenzhen Stock Exchange</span></h3></div>

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

                        <div class="dynamic_data mg_ttwo">
                            <div class="public_tltie_one"><i></i><h3>企业排行榜<span>A Share Ranking</span></h3></div>

                            <div class="public_table_box mg_tone">
                                <div class="public_ta_b_list fl">
                                    <div class="public_ta_b_l_tltie">
                                        <i></i><h3>营业收入排行榜(2019年)</h3>
                                    </div>
                                    <div class="public_ta_b_l_com mg_tone">
                                        <table border="1">
                                            <tbody><tr class="tab_ftbt">
                                                <td class="tab_fwit tab_fcol">排名</td>
                                                <td class="tab_fcol">股票代码</td>
                                                <td class="tab_fcol">企业简称</td>
                                                <td class="tab_fcol">营业收入（亿元）</td>
                                            </tr>
                                                <tr>
                                                    <td class="tab_fwit">1</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600028/" target="_blank">600028</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600028/" target="_blank">中国石化</a></td>
                                                    <td>29661.93</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">2</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601857/" target="_blank">601857</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601857/" target="_blank">中国石油</a></td>
                                                    <td>25168.10</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">3</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601668/" target="_blank">601668</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601668/" target="_blank">中国建筑</a></td>
                                                    <td>14198.36</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">4</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">601318</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">中国平安</a></td>
                                                    <td>11688.67</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">5</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">601398</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">工商银行</a></td>
                                                    <td>8551.64</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">6</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601390/" target="_blank">601390</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601390/" target="_blank">中国中铁</a></td>
                                                    <td>8484.40</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">7</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601186/" target="_blank">601186</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601186/" target="_blank">中国铁建</a></td>
                                                    <td>8304.52</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">8</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600104/" target="_blank">600104</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600104/" target="_blank">上汽集团</a></td>
                                                    <td>8265.30</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">9</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601628/" target="_blank">601628</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601628/" target="_blank">中国人寿</a></td>
                                                    <td>7451.65</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">10</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">601939</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">建设银行</a></td>
                                                    <td>7056.29</td>
                                                </tr>

                                            </tbody></table>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="public_ta_b_list fl mg_lfive">
                                    <div class="public_ta_b_l_tltie">
                                        <i></i><h3>净利润排行榜(2019年)</h3>
                                    </div>
                                    <div class="public_ta_b_l_com mg_tone">
                                        <table border="1">
                                            <tbody><tr class="tab_ftbt">
                                                <td class="tab_fwit tab_fcol">排名</td>
                                                <td class="tab_fcol">股票代码</td>
                                                <td class="tab_fcol">企业简称</td>
                                                <td class="tab_fcol">净利润（亿元）</td>
                                            </tr>
                                                <tr>
                                                    <td class="tab_fwit">1</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">601398</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">工商银行</a></td>
                                                    <td>3122.24</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">2</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">601939</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">建设银行</a></td>
                                                    <td>2667.33</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">3</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601288/" target="_blank">601288</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601288/" target="_blank">农业银行</a></td>
                                                    <td>2120.98</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">4</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601988/" target="_blank">601988</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601988/" target="_blank">中国银行</a></td>
                                                    <td>1874.05</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">5</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">601318</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">中国平安</a></td>
                                                    <td>1494.07</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">6</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600036/" target="_blank">600036</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600036/" target="_blank">招商银行</a></td>
                                                    <td>928.67</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">7</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601328/" target="_blank">601328</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601328/" target="_blank">交通银行</a></td>
                                                    <td>772.81</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">8</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601166/" target="_blank">601166</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601166/" target="_blank">兴业银行</a></td>
                                                    <td>658.68</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">9</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601658/" target="_blank">601658</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601658/" target="_blank">邮储银行</a></td>
                                                    <td>609.33</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">10</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600000/" target="_blank">600000</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600000/" target="_blank">浦发银行</a></td>
                                                    <td>589.11</td>
                                                </tr>

                                            </tbody></table>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="public_ta_b_list fl mg_lfive">
                                    <div class="public_ta_b_l_tltie">
                                        <i></i><h3>利润总额排行榜(2019年)</h3>
                                    </div>
                                    <div class="public_ta_b_l_com mg_tone">
                                        <table border="1">
                                            <tbody><tr class="tab_ftbt">
                                                <td class="tab_fwit tab_fcol">排名</td>
                                                <td class="tab_fcol">股票代码</td>
                                                <td class="tab_fcol">企业简称</td>
                                                <td class="tab_fcol">利润总额（亿元）</td>
                                            </tr>
                                                <tr>
                                                    <td class="tab_fwit">1</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">601398</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601398/" target="_blank">工商银行</a></td>
                                                    <td>3917.89</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">2</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">601939</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601939/" target="_blank">建设银行</a></td>
                                                    <td>3265.97</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">3</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601288/" target="_blank">601288</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601288/" target="_blank">农业银行</a></td>
                                                    <td>2665.76</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">4</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601988/" target="_blank">601988</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601988/" target="_blank">中国银行</a></td>
                                                    <td>2506.45</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">5</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">601318</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601318/" target="_blank">中国平安</a></td>
                                                    <td>1847.39</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">6</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600036/" target="_blank">600036</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600036/" target="_blank">招商银行</a></td>
                                                    <td>1171.32</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">7</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601857/" target="_blank">601857</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601857/" target="_blank">中国石油</a></td>
                                                    <td>1032.13</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">8</td>
                                                    <td><a href="https://s.askci.com/stock/summary/600028/" target="_blank">600028</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/600028/" target="_blank">中国石化</a></td>
                                                    <td>900.16</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">9</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601328/" target="_blank">601328</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601328/" target="_blank">交通银行</a></td>
                                                    <td>882.00</td>
                                                </tr>
                                                <tr>
                                                    <td class="tab_fwit">10</td>
                                                    <td><a href="https://s.askci.com/stock/summary/601668/" target="_blank">601668</a></td>
                                                    <td><a href="https://s.askci.com/stock/summary/601668/" target="_blank">中国建筑</a></td>
                                                    <td>814.67</td>
                                                </tr>

                                            </tbody></table>
                                    </div>
                                    <div class="clear"></div>
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