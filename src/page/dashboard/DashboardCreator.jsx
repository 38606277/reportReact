/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Tooltip, Divider, Icon, Input, message, Form, FormItem, Avatar, Row, Col } from 'antd';

import HttpService from '../../util/HttpService.jsx';
const { Column, ColumnGroup } = Table;
import "./DashboardCreator.scss";
import {  ChartCard,  MiniArea,  MiniBar,  MiniProgress,  Field,  Bar,  Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';
import numeral from 'numeral';
import Yuan from '../../util/Yuan';
import styles from './Analysis.less';


class Hello extends React.Component {
    render() {
        return React.createElement('div', null, `Hello,${this.props.toWhat}`)
    }
}

const salesData=[{"x":"1月","y":589},{"x":"2月","y":412},{"x":"3月","y":573},
{"x":"4月","y":997},{"x":"5月","y":596},{"x":"6月","y":542},{"x":"7月","y":209},{"x":"8月","y":480},
{"x":"9月","y":1140},{"x":"10月","y":507},{"x":"11月","y":873},{"x":"12月","y":710}];

export default class DashboardCreator extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        loading: false,
        list: [
            { name: '指标', value: '' },
            { name: '增长率', value: '' },
            { name: '单位', value: '' },
            { name: '发值', value: '' },
            { name: '可奈', value: '' },
            { name: '指标', value: '' },
        ],
        selectedRows: [],
        selectedRowKeys: [],
        item2: ` <Tooltip placement="top" title="柱状图">
        <Button icon="bar-chart" />
    </Tooltip>`,
        item: <div>das</div>,
        item1: <ChartCard
            bordered={false}
            title="总销售额"
            action={
                <Tooltip
                    title="总销售额">
                    <Icon type="info-circle-o" />
                </Tooltip>
            }

            total={() => <Yuan>126560</Yuan>}
            footer={
                <Field
                    label={"日销售额"}
                    value={`￥${numeral(12423).format('0,0')}`}
                />
            }
            contentHeight={46}
        >
            <Trend flag="up" style={{ marginRight: 16 }}>
                {"周同比"}
                <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
                {"日同比"}
                <span className={styles.trendText}>11%</span>
            </Trend>
        </ChartCard>
    };


    componentDidMount() {
        let a = React.createElement('Input', { toWhat: 'world' }, null);
        this.setState({ item: a });

    }

    drop(ev) {
        // alert(ev.dataTransfer.getData("param"));
        // ev.preventDefault();
        // let param = ev.dataTransfer.getData("param");
        // // let aInput = this.state.in[param];
        // // let t = ev.target.id;
        // // this.state.in[1] = aInput;
        // let aIn = this.state.in[param];
        // let inLayout = this.state.inLayout;
        // inLayout[colIndex] = aIn;
        // //com[key] = <Input value="aa" />;
        // this.setState({ inLayout: inLayout });
        this.setState({ item: this.state.item1 });
        console.log(this.state.item);

    }
    drag(ev) {
        ev.dataTransfer.setData("param", ev.target.id);
    }
    getProp(index1) {
        console.log(this.refs.index1.props);
    }
    render() {

        return (
            <div>

                <Card title="创建仪表板" bodyStyle={{ padding: "0px" }}>

                    <Card bodyStyle={{ padding: "5px" }}>
                        <Button style={{ marginRight: "10px" }} type="primary">新增行</Button>
                        <Button style={{ marginRight: "10px" }} type="primary">保存</Button>
                        <Tooltip placement="top" title="指标卡片">
                            <Button icon="profile" />
                        </Tooltip>
                        <Tooltip placement="top" title="柱状图">
                            <Button icon="bar-chart" draggable="true" onDragStart={(event) => this.drag(event)} />
                        </Tooltip>
                        <Tooltip placement="top" title="拆线图">
                            <Button icon="line-chart" />
                        </Tooltip>
                        <Tooltip placement="top" title="饼图">
                            <Button icon="pie-chart" />
                        </Tooltip>
                        <Tooltip placement="top" title="地图">
                            <Button icon="global" />
                        </Tooltip>
                    </Card>
                    <Card>
                        <Row gutter={5}>
                            <Col span={18} style={{ border: 'border: "1px solid #785"' }}>
                                <Row gutter={16} style={{ lineHeight: '200px' }}>
                                    <Col span={8} style={{ backgroundColor: '#ecc' }} >
                                        <ChartCard ref='index1' onClick={() => this.getProp('index1')}
                                            bordered={false}
                                            title="总销售额"
                                            action={
                                                <Tooltip
                                                    title="总销售额">
                                                    <Icon type="info-circle-o" />
                                                </Tooltip>
                                            }

                                            total={() => <Yuan>126560</Yuan>}
                                            footer={
                                                <Field
                                                    label={"日销售额"}
                                                    value={`￥${numeral(12423).format('0,0')}`}
                                                />
                                            }
                                            contentHeight={46}
                                        >

                                        </ChartCard>
                                    </Col>
                                    <Col
                                        onDrop={(ev) => this.drop(ev, 1)}
                                        onDragOver={(ev) => ev.preventDefault()}

                                        span={8} style={{ backgroundColor: '#eee' }}>
                                        {this.state.item}
                                    </Col>
                                    <Col span={8} style={{ backgroundColor: '#ebb' }}>{this.state.item}</Col>

                                </Row>
                                <Row gutter={16} style={{ lineHeight: '200px' }}>
                                    <Col span={12} className="col">
                                        <Bar
                                            height={295}
                                            title={"Sales Trend"}
                                            data={salesData}
                                        />
                                    </Col>
                                    <Col span={12} className="col">b</Col>
                                </Row>

                            </Col>
                            <Col span={6} style={{ border: 'border: "1px solid #785"' }}>
                                <Table dataSource={this.state.list} size="small" bordered pagination={false} >
                                    <Column
                                        title="属性"
                                        dataIndex="name"
                                        width='100px'
                                    />
                                    <Column
                                        title="值"
                                        dataIndex="value"
                                        render={(text, record, index) => {
                                            return (<Input />)
                                        }}
                                    />


                                </Table>
                            </Col>
                        </Row>

                    </Card>

                </Card>
            </div >
        )
    }
}
