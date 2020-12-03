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
        corp_code: '600585',
        corp_name: '海螺水泥',
        main_bussiness_income: '1570(亿)',
    },
    {
        no: '2',
        corp_code: '000401',
        corp_name: '冀东水泥',
        main_bussiness_income: '345（亿）',
    },
];


class financeList extends React.Component {
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
                    <Card bodyStyle={{ backgroundColor: '#ececec', padding: '10px' }} >


                        <Row style={{ marginTop: '20px' }}>
                            <Col sm={24}>
                                <Card style={{ boxShadow: '0 2px 3px 0 rgba(0,0,0,.2)' }}>
                                    <img style={{height:'16px',width:'16px',marginRight:'10px'}} src={require('../../asset/data-icon.png')} />
                                    <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '18px', height: '18px', lineHeight: '18px', color: 'black' }}>企业财务分析</label>
                                    <Divider dashed style={{ marginTop: '12px' }} />

                                    <Row gutter={32} >
                                        <Col sm={12}>

                                            <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '15px', height: '22px', lineHeight: '22px', color: 'black' }}>内部企业</label>
                                            <Divider style={{ marginTop: '12px' }} />
                                            <Table
                                                dataSource={this.state.list} pagination={false} >
                                                <Table.Column title="股票代码" dataIndex="corp_code" key="age" />
                                                <Table.Column title="企业名称" dataIndex="corp_name" key="address"
                                                    render={(text, record) => {
                                                        return <Link to={`/dataApp/finance/${record.corp_code}/${record.corp_name}`}>{text}</Link>;

                                                    }} />
                                                <Table.Column title="收入" dataIndex="main_bussiness_income" key="age" />
                                            </Table>
                                        </Col>
                                        <Col sm={12}>
                                            <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '16px', height: '22px', lineHeight: '22px', color: 'black' }}>外部企业</label>
                                            <Divider style={{ marginTop: '12px' }} />
                                            <Table
                                                dataSource={outdataSource} pagination={false} >
                                                <Table.Column title="股票代码" dataIndex="corp_code" key="age" />
                                                <Table.Column title="企业名称" dataIndex="corp_name" key="address"
                                                    render={(text, record) => {
                                                        return <Link to={`/dataApp/finance/${record.corp_code}/${record.corp_name}`}>{text}</Link>;

                                                    }} />
                                                <Table.Column title="收入" dataIndex="main_bussiness_income" key="age" />
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
export default Form.create()(financeList);