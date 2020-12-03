import React from 'react';
import { Form, Input, Table, Button, Modal, Card, Row, Col, Select, Pagination, message, Tabs, Divider, Radio, Tag } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import { Link } from 'react-router-dom';
import CubeService from '../../service/CubeService.jsx';
import QueryService from '../../service/QueryService.jsx';
import HttpService from '../../util/HttpService.jsx';
import DuBang from './finance/dubang.jsx';

import ReactEcharts from 'echarts-for-react';
const _cubeService = new CubeService();
const localStorge = new LocalStorge();
const _query = new QueryService();
const FormItem = Form.Item;
const Search = Input.Search;
// import G6 from '@antv/g6';
// import demo from './gg.jsx';



const { Option } = Select;

export const industryFactorOption1 = {
    title: {
        text: '雷达图',
        textStyle: {
            color: 'rgba(221,221,221,1)', //标题颜色
            fontSize: 14,
            lineHeight: 20,
        },
        // 标题的位置，此时放在图的底边
        left: 'center',
        top: 'bottom',
    },
    // 图表的位置
    grid: {
        position: 'center',
    },
    tooltip: {
        //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: true, //鼠标是否可以移动到tooltip区域内
    },
    radar: {
        shape: 'circle',
        splitNumber: 3, // 雷达图圈数设置
        name: {
            textStyle: {
                color: '#838D9E',
            },
        },
        // 设置雷达图中间射线的颜色
        axisLine: {
            lineStyle: {
                color: 'rgba(131,141,158,.1)',
            },
        },
        indicator: [{
            name: '现金流', max: 30,
            //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#838D9E',
                showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                showMinLabel: true, //显示最小数字，即中心点显示0
            },
        },
        { name: '盈利能力', max: 30 },
        { name: '成长能力', max: 30 },
        { name: '运营能力', max: 30 },
        { name: '偿债能力', max: 30 },
        ],
        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
        splitArea: {
            show: false,
            areaStyle: {
                color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: 'rgba(131,141,158,.1)', // 设置网格的颜色
            },
        },
    },
    series: [{
        name: '雷达图', // tooltip中的标题
        type: 'radar', //表示是雷达图
        symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
        symbolSize: 8, // 拐点的大小

        areaStyle: {
            normal: {
                width: 1,
                opacity: 0.2,
            },
        },
        data: [
            {
                value: [17, 24, 27, 29, 26, 16, 13, 17, 25],
                name: '2018-07',
                // 设置区域边框和区域的颜色
                itemStyle: {
                    normal: {
                        color: 'rgba(255,225,0,.3)',
                        lineStyle: {
                            color: 'rgba(255,225,0,.3)',
                        },
                    },
                },
                //在拐点处显示数值
                label: {
                    normal: {
                        show: true,
                        formatter: (params: any) => {
                            return params.value
                        },
                    },
                },
            },
            {
                value: [5, 20, 19, 11, 22, 17, 8, 19, 16],
                name: '',
                itemStyle: {
                    normal: {
                        color: 'rgba(60,135,213,.3)',
                        lineStyle: {
                            width: 1,
                            color: 'rgba(60,135,213,.3)',
                        },
                    },
                },
            },
            {
                value: [7, 18, 19, 13, 22, 17, 8, 25, 9],
                name: '',
                itemStyle: {
                    normal: {
                        color: 'rgba(255,74,74,.3)',
                        lineStyle: {
                            width: 1,
                            color: 'rgba(255,74,74,.3)',
                        },
                    },
                },
            },
        ],
    }],
}

export const industryFactorOption = {
    title: {
        text: '雷达图',
        textStyle: {
            color: 'rgba(221,221,221,1)', //标题颜色
            fontSize: 14,
            lineHeight: 20,
        },
        // 标题的位置，此时放在图的底边
        left: 'center',
        top: 'bottom',
    },
    // 图表的位置
    grid: {
        position: 'center',
    },
    tooltip: {
        //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: true, //鼠标是否可以移动到tooltip区域内
    },
    radar: {
        shape: 'circle',
        splitNumber: 3, // 雷达图圈数设置
        name: {
            textStyle: {
                color: '#838D9E',
            },
        },
        // 设置雷达图中间射线的颜色
        axisLine: {
            lineStyle: {
                color: 'rgba(131,141,158,.1)',
            },
        },
        indicator: [{
            name: '通信', max: 30,
            //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#838D9E',
                showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                showMinLabel: true, //显示最小数字，即中心点显示0
            },
        },
        { name: '现金流', max: 30 },
        { name: '盈利能力', max: 30 },
        { name: '成长能力', max: 30 },
        { name: '运营能力', max: 30 },
        { name: '偿债能力', max: 30 },

        ],
        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
        splitArea: {
            show: false,
            areaStyle: {
                color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: 'gba(131,141,158,.1)', // 设置网格的颜色
            },
        },
    },
    series: [{
        name: '雷达图', // tooltip中的标题
        type: 'radar', //表示是雷达图
        symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
        symbolSize: 8, // 拐点的大小

        areaStyle: {
            normal: {
                width: 2,
                opacity: 0.3,
            },
        },
        data: [
            {
                value: [17, 24, 27, 29, 26, 16, 13, 17, 25],
                name: '2018-07',
                // 设置区域边框和区域的颜色
                itemStyle: {
                    normal: {
                        color: 'rgba(133, 121, 52, 0.75)',
                        lineStyle: {
                            color: '#333',
                        },
                    },
                },
                //在拐点处显示数值
                label: {
                    normal: {
                        show: true,
                        formatter: (params: any) => {
                            return params.value
                        },
                    },
                },
            },


        ],
    }],
}

export function getRadarChart() {
    const option = {
        title: {
            text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '销售（sales）', max: 6500 },
                { name: '管理（Administration）', max: 16000 },
                { name: '信息技术（Information Techology）', max: 30000 },
                { name: '客服（Customer Support）', max: 38000 },
                { name: '研发（Development）', max: 52000 },
                { name: '市场（Marketing）', max: 25000 }
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: '预算分配（Allocated Budget）'
                },
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: '实际开销（Actual Spending）'
                }
            ]
        }]
    }
}

export function getBarChart() {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['2014', '2015', '2016', '2017', '2018', '2019'],
            axisLine: {
                lineStyle: {
                    color: '#8FA3B7',//y轴颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#6D6D6D',
                }
            },
            axisTick: { show: false }
        }],
        yAxis: [{
            type: 'value',
            splitLine: { show: false },
            //max: 700,
            splitNumber: 3,
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#8FA3B7',//y轴颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#6D6D6D',
                }
            },
        }],
        series: [

            {
                name: 'a',
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                    normal: {
                        color: '#FAD610'
                    }
                },
                stack: '信息',
                data: [320, 132, 101, 134, 90, 30]
            },
            {
                name: 'b',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#27ECCE'
                    }
                },
                stack: '信息',
                data: [220, 182, 191, 234, 290, 230]
            },
            {
                name: 'c',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#4DB3F5'
                    }
                },
                stack: '信息',
                data: [150, 132, 201, 154, 90, 130]
            }
        ]
    };
    return option;
}




const { TabPane } = Tabs;




const data = [
    {
        key: '1',
        name: '销售净利率',
        age: 32,
        address: 'string',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: '性别',
        age: 42,
        address: 'string',
        tags: ['loser'],
    },
    {
        key: '3',
        name: '年龄',
        age: 32,
        address: 'int',
        tags: ['cool', 'teacher'],
    },
    {
        key: '3',
        name: '年龄',
        age: 32,
        address: 'int',
        tags: ['cool', 'teacher'],
    },
    {
        key: '3',
        name: '年龄',
        age: 32,
        address: 'int',
        tags: ['cool', 'teacher'],
    },
];




class finance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            corp_code: this.props.match.params.corp_code,
            corp_name: this.props.match.params.corp_name,
            financeReport: [],
            zcfzb: [],
            lrb: [],
            xjllb: [],
            zycwzb: [],
            chartRow: [],
            qry_id: '',
            cube_name: '',
            cube_desc: '',
            visible: false,
            dictionaryList: [],
            qry_name: '',
            cube_sql: '',
            assetsDataSource: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    columns = [

        {
            title: '指标',
            dataIndex: 'item',
            width: 150,
            fixed: 'left',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModal(record)} href="javascript:;">{text}</a>
                </span>
            ),
        },
        {
            title: '2010年',
            dataIndex: '2010年',
        },
        {
            title: '2011年',
            dataIndex: '2011年',
        },
        {
            title: '2012年',
            dataIndex: '2012年',
        },
        {
            title: '2013年',
            dataIndex: '2013年',
        },
        {
            title: '2014年',
            dataIndex: '2014年',
        },
        {
            title: '2015年',
            dataIndex: '2015年',
        },
        {
            title: '2016年',
            dataIndex: '2016年',
        },
        {
            title: '2017年',
            dataIndex: '2017年',
        },
        {
            title: '2018年',
            dataIndex: '2018年',
        },
        {
            title: '2019年',
            dataIndex: '2019年',
        }
    ];

    columns1 = [

        {
            title: '指标',
            dataIndex: 'item',
            width: 150,
            fixed: 'left',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModal(record)} href="javascript:;">{text}</a>
                </span>
            ),
        },
       
        {
            title: '2016年',
            dataIndex: '2016年',
        },
        {
            title: '2017年',
            dataIndex: '2017年',
        },
        {
            title: '2018年',
            dataIndex: '2018年',
        },
        {
            title: '2019年',
            dataIndex: '2019年',
        }
    ];
    //初始化加载调用方法
    componentDidMount() {
        this.handleTabChange("1");

    }

    getBarChart() {
        //  alert('aa');
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2016', '2018', '2019'],
                // this.state.list.map(function (item) {
                //     return item.year;
                // }),
                axisLine: {
                    lineStyle: {
                        color: '#8FA3B7',//y轴颜色
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#6D6D6D',
                    }
                },
                axisTick: { show: false }
            }],
            yAxis: [{
                type: 'value',
                splitLine: { show: false },
                //max: 700,
                splitNumber: 3,
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: '#8FA3B7',//y轴颜色
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#6D6D6D',
                    }
                },
            }],
            series: [

                {
                    name: '',
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        normal: {
                            color: '#4DB3F5'
                        }
                    },
                    stack: '信息',
                    data: this.state.chartRow
                    //  this.state.list.map(function (item) {
                    //     return item.amount;
                    // })

                    // [320, 132, 101, 134, 90, 30]
                }
            ]
        };
        return option;
    }
    showModal = (record) => {
        console.log(record);
        //将record转换为值
        let aRow = [];
        for (var key in record) {
            if (key != 'item')
                aRow.push(record[key]); //获取对应的value值
        }

        this.setState({
            visible: true,
            chartTitle: record.index_name,
            chartRow: aRow
        });
    };
    handleTabChange = key => {
        console.log(key);
        let reportName = '';
        let dataName = '';
        if (key == '1') {
            reportName = '主要财务指标';
            dataName = 'zycwzb';
        }
        else if (key == '2') {
            reportName = '资产负债表';
            dataName = 'zcfzb';
        } else if (key == '3') {
            reportName = '利润表';
            dataName = 'lrb';
        } else if (key == '4') {
            reportName = '现金流量表';
            dataName = 'xjllb';
        }
        //资产负债表
        let param = {
            corp_code: this.state.corp_code,
            report_name: reportName

        };
        HttpService.post('/reportServer/finance/getFinReport', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {

                this.setState({
                    [dataName]: res.data,
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

    };

    //编辑字段对应值
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({ [name]: value });
        this.props.form.setFieldsValue({ [name]: value });

    }
    //编辑字段对应值
    onSelectChange(name, value) {
        this.setState({ [name]: value });
        this.props.form.setFieldsValue({ [name]: value });
    }
    //提交
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (null != this.state.cube_id && '' != this.state.cube_id && 'null' != this.state.cube_id) {
                    values.cube_id = this.state.cube_id;
                } else {
                    values.cube_id = 'null';
                }
                _cubeService.saveCubeInfo(values).then(response => {
                    if (null != this.state.cube_id && '' != this.state.cube_id && 'null' != this.state.cube_id) {
                        alert("修改成功");
                    } else {
                        alert("保存成功");
                    }
                    window.location.href = "#cube/cubeList";
                }, errMsg => {
                    this.setState({
                    });
                    localStorge.errorTips(errMsg);
                });
            }
        });
    }

    openModelClick() {
        this.setState({ visible: true, totald: 0, selectedRowKeys: [] }, function () {
            this.loadModelData();
        });
    }
    //调用模式窗口内的数据查询
    loadModelData() {
        let page = {};
        page.pageNumd = this.state.pageNumd;
        page.perPaged = this.state.perPaged;
        page.qry_name = this.state.qry_name;
        _query.getAllQueryNameList(page).then(response => {
            this.setState({ dictionaryList: response.data.list, totald: response.data.total }, function () { });
        }).catch(error => {
            message.error(error);
        });
    }
    // 字典页数发生变化的时候
    onPageNumdChange(pageNumd) {
        this.setState({
            pageNumd: pageNumd
        }, () => {
            this.loadModelData(this.state.paramValue);
        });
    }
    //模式窗口点击确认
    handleOk = (e) => {
        let values = '';
        if (this.state.selectedRowKeys.length > 0) {
            const arr1 = this.state.selectedRowKeys[0];
            const dataArr = arr1.split("&");
            values = dataArr[0];
            let qryname = dataArr[1];
            this.props.form.setFieldsValue({ ['qry_id']: values, ['class_name']: qryname });
            // this.props.form.setFieldsValue({['qry_name']:qryname});
        }
        this.setState({ visible: false, pageNumd: 1, qry_id: values });
    }
    //模式窗口点击取消
    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedRowKeys: []
        });
    }
    //数据字典选中事件
    onSelectChangeDic = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    //数据字典的search
    onDictionarySearch(qry_name) {
        this.setState({ pageNumd: 1, qry_name: qry_name }, () => {
            this.loadModelData();
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
        const { selectedRowKeys } = this.state;
        const rowSelectionDictionary = {
            selectedRowKeys,
            onChange: this.onSelectChangeDic,
            hideDefaultSelections: true,
            type: 'radio'
        };
        const dictionaryColumns = [{
            title: '编码',
            dataIndex: 'qry_id',
            key: 'qry_id',
        }, {
            title: '名称',
            dataIndex: 'qry_name',
            key: 'qry_name',
        }];
        if (null != this.state.dictionaryList) {
            this.state.dictionaryList.map((item, index) => {
                item.key = item.qry_id + "&" + item.qry_name;
            });
        }
        return (
            <div id="page-wrapper">
                <Card bodyStyle={{ backgroundColor: '#ececec', padding: '15px' }} >

                    <Card style={{ boxShadow: '0 2px 3px 0 rgba(0,0,0,.2)' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <img style={{ height: '16px', width: '16px', marginRight: '10px' }} src={require('../../asset/data-icon.png')} />
                            <label style={{ fontFamily: 'Roboto,San Francisco', fontSize: '16px', height: '22px', lineHeight: '22px', color: 'black' }}>{this.state.corp_name}({this.state.corp_code})</label>
                            <Divider dashed style={{ marginTop: '12px' }} />
                            <corp />
                            <Row>
                                <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                                    <TabPane tab="财务指标分析" key="1">
                                        <Row>
                                            <Col sm={12}>

                                                <Table columns={this.columns1}
                                                    dataSource={this.state.zycwzb} pagination={false}>
                                                </Table>
                                            </Col>
                                            <Col sm={12}>
                                                <ReactEcharts
                                                    option={industryFactorOption1}
                                                    notMerge={true}
                                                    lazyUpdate={true}
                                                    style={{ width: '100%', height: '400px' }}
                                                />
                                            </Col>
                                        </Row>


                                    </TabPane>

                                    <TabPane tab="资产负债分析" key="2" >

                                        <Card bodyStyle={{ padding: "8px", backgroundColor: '#fafafa' }}>

                                            <Radio.Group defaultValue="list" buttonStyle="solid" onChange={(e) => { this.setState({ iView: e.target.value }) }}>
                                                <Radio.Button value="list">按年度</Radio.Button>
                                                <Radio.Button value="column">按报告期</Radio.Button>

                                            </Radio.Group>

                                        </Card>
                                        <Table columns={this.columns}
                                            dataSource={this.state.zcfzb} pagination={false}>
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="利润分析" key="3">

                                        <Table columns={this.columns}
                                            dataSource={this.state.lrb} pagination={false}>

                                        </Table>
                                    </TabPane>
                                    <TabPane tab="现金流量分析" key="4">
                                        <ReactEcharts
                                            option={getBarChart()}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            style={{ width: '100%', height: '200px' }}
                                        />
                                        <Table columns={this.columns}
                                            dataSource={this.state.xjllb} pagination={false}>
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="杜邦分析" key="5">
                                        <DuBang />
                                    </TabPane>
                                </Tabs>
                            </Row>

                        </Form>
                    </Card>
                </Card>
                <Modal
                    title={this.state.chartTitle}
                    width='900px'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <ReactEcharts
                        option={this.getBarChart()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ width: '100%', height: '350px' }} />
                </Modal>
            </div>
        );
    }
}
export default Form.create()(finance);