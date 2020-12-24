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
            list: [],
            netProfitTop10: [],
            totalProfitTop10: [],
            revenueTop10: [],

        };

    }

    //初始化加载调用方法
    componentDidMount() {
        // this.loadDataList();
        this.getRevenueTop10();
        this.getNetProfitTop10();
        this.getTotalProfitTop10();

    }

    getRevenueTop10() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/finance/getRevenueTop10', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    revenueTop10: res.data,
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
    getNetProfitTop10() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/finance/getNetProfitTop10', JSON.stringify(param)).then(res => {
            console.log(res.data)
            if (res.resultCode == "1000") {
                this.setState({
                    netProfitTop10: res.data,
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

    getTotalProfitTop10() {
        let param = {
            FLEX_VALUE_SET_ID: 4
        };

        HttpService.post('/reportServer/finance/getTotalProfitTop10', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    totalProfitTop10: res.data,
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
                    <Card bodyStyle={{ backgroundColor: '#ececec', padding: '10px' }} >
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
                                            <h3 class="timer count-numbery" data-to="1528" data-speed="1500">14</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>上市公司总数</span>
                                        </div>
                                        <div class="dy_d_l_s_six s_one">
                                            <h3 class="timer count-numbery" data-to="1485" data-speed="1500">12</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>A股数量</span>
                                        </div>
                                        <div class="dy_d_l_s_six s_two">
                                            <h3 class="timer count-numbery" data-to="34" data-speed="1500">X</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>科创版</span>
                                        </div>
                                        <div class="dy_d_l_s_six s_theer">
                                            <h3 class="timer count-numbery" data-to="52" data-speed="1500">2</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>H股数量</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>

                            <div class="dynamic_data_list fl mg_lfive">
                                <div class="public_tltie_one"><i></i><h3>主要企业分布<span>Shenzhen Stock Exchange</span></h3></div>

                                <div class="dynamic_d_l_sjtwo mg_tone bgtheer">
                                    <div class="shenzhen_box">
                                        <div class="dy_d_l_s_four">
                                            <h3 class="timer count-numbery" data-to="2183" data-speed="1500">2,183</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>水泥企业总数</span>
                                        </div>
                                        <div class="dy_d_l_s_six s_one">
                                            <h3 class="timer count-numbery" data-to="471" data-speed="1500">471</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>玻璃企业数量</span>
                                        </div>
                                        <div class="dy_d_l_s_six s_two">
                                            <h3 class="timer count-numbery" data-to="939" data-speed="1500">939</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>新材料企业数量</span>
                                        </div>

                                        <div class="dy_d_l_s_six s_theer">
                                            <h3 class="timer count-numbery" data-to="773" data-speed="1500">773</h3>
                                            <div class="dy_d_l_s_o_x"></div>
                                            <span>科技企业数量</span>
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
                                                <td class="tab_fcol">企业名称</td>
                                                <td class="tab_fcol">营业收入(万)</td>
                                            </tr>

                                                {this.state.revenueTop10.map((item, index) =>
                                                    <tr>
                                                        <td class="tab_fwit">{index + 1}</td>
                                                        <td style={{ textAlign: 'left' }}> <Link to={`/dataApp/finance/${item.corp_code}/${item.corp_name}`}>{item.corp_name}</Link></td>
                                                        <td style={{textAlign: 'right' }}><a href="" target="_blank">{item.amount}</a></td>
                                                    </tr>
                                                )}



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
                                                <td class="tab_fcol">企业简称</td>
                                                <td class="tab_fcol">净利润(万)</td>
                                            </tr>
                                                {this.state.netProfitTop10.map((item, index) =>
                                                    <tr>
                                                        <td class="tab_fwit">{index + 1}</td>
                                                        <td style={{ textAlign: 'left' }}> <Link to={`/dataApp/finance/${item.corp_code}/${item.corp_name}`}>{item.corp_name}</Link></td>
                                                        <td style={{textAlign: 'right' }}><a href="" target="_blank">{item.amount}</a></td>
                                                    </tr>
                                                )}
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
                                                <td class="tab_fcol">企业简称</td>
                                                <td class="tab_fcol">利润总额(万)</td>
                                            </tr>
                                                {this.state.totalProfitTop10.map((item, index) =>
                                                    <tr>
                                                        <td class="tab_fwit">{index + 1}</td>
                                                        <td style={{ textAlign: 'left' }}>
                                                            <Link to={`/dataApp/finance/${item.corp_code}/${item.corp_name}`}>{item.corp_name}</Link>
                                                       </td>
                                                        <td style={{textAlign: 'right' }}><a href="" target="_blank">{item.amount}</a></td>
                                                    </tr>
                                                )}

                                            </tbody></table>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>


                    </Card>
                </Form>
            </div>
        );
    }
}
export default Form.create()(corp);