/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import {
    BarChartOutlined,
    GlobalOutlined,
    InfoCircleOutlined,
    LineChartOutlined,
    PieChartOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Card,
    Button,
    Tooltip,
    DiviTableder,
    Input,
    Select,
    FormItem,
    Menu,
    Row,
    Col,
} from 'antd';

import HttpService from '../../util/HttpService.jsx';
const { Column, ColumnGroup } = Table;
import "./DashboardCreator.scss";
import {  ChartCard,  MiniArea,  MiniBar,  MiniProgress,  Field,  Bar,  Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend/index.jsx';
import numeral from 'numeral';
import Yuan from '../../util/Yuan';
import styles from './Analysis.less';

const Option = Select.Option;


class Hello extends React.Component {
    render() {
        return React.createElement('div', null, `Hello,${this.props.toWhat}`)
    }
}
const salesTypeDataOnline=[{"x":"家用电器","y":244},{"x":"食用酒水","y":321},{"x":"个护健康","y":311},{"x":"服饰箱包","y":41},
{"x":"母婴产品","y":121},{"x":"其他","y":111}];
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
        item2:<div>2</div>,
        item3: <div>3</div>,
        item4: <div>4</div>,
        item: <div>1</div>,
        item1:<ChartCard
            bordered={false}
            title="总销售额"
            action={
                <Tooltip
                    title="总销售额">
                    <InfoCircleOutlined />
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
        </ChartCard>,
        itemChartCard: <ChartCard
            bordered={false}
            title="总销售额"
            action={
                <Tooltip
                    title="总销售额">
                    <InfoCircleOutlined />
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
        </ChartCard>,
            itemZhuZhuang: <ChartCard
            bordered={false}
          
            title={"Payments"}
            action={
              <Tooltip
                title={"Introduce"}
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={"Conversion Rate"}
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={salesTypeDataOnline} />
          </ChartCard>,
          itemYuan:<Pie
                hasLegend
                subTitle={"Sales"}
                total={() => <Yuan>{salesTypeDataOnline.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                data={salesTypeDataOnline}
                valueFormat={value => <Yuan>{value}</Yuan>}
                height={248}
                lineWidth={4}
                />,
          itemXian: <Bar
                height={295}
                title={"Sales Trend"}
                data={salesData}
            />      
    };


    componentDidMount() {
        // let a = React.createElement('Input', { toWhat: 'world' }, null);
        // this.setState({ item: a });

        const mod = require('./Model.js');    
        console.log(mod.ChartArr);  
        // mod.incCounter();
    }
    
    drop(ev, index) {
        //console.log(props);
        // alert(ev.dataTransfer.getData("param"));
        // ev.preventDefault();
         //let param = ev.dataTransfer.getData("param");
        // // let aInput = this.state.in[param];
        // // let t = ev.target.id;
        // // this.state.in[1] = aInput;
        // let aIn = this.state.in[param];
        // let inLayout = this.state.inLayout;
        // inLayout[colIndex] = aIn;
        // //com[key] = <Input value="aa" />;
        // this.setState({ inLayout: inLayout });
     
            if(index==1){
                this.setState({ item: this.state.itemChartCard,list:this.state.list },function(){
                    const obj = {
                        id: 0,
                        name: '张三',
                        age: 12
                   }
                    const objToStr = JSON.stringify(this.state.item)
                    
                });
            }else if(index==2){
                this.setState({ item2: this.state.itemXian }); console.log(index);
            }else if(index==3){
                this.setState({ item3: this.state.itemZhuZhuang }); console.log(index);
            }else if(index==0){
                this.setState({ item4: this.state.itemYuan }); console.log(index);
            }
            
    
    }
    
    drag(ev,num) {
        console.log(num);
        ev.dataTransfer.setData("param", ev.target.id);
        console.log(ev.dataTransfer.getData("param"));
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
                            <Button icon={<ProfileOutlined />}  draggable="true" onDragStart={(event) => this.drag(event,1)} />
                        </Tooltip>
                        <Tooltip placement="top" title="柱状图">
                            <Button icon={<BarChartOutlined />} draggable="true" onDragStart={(event) => this.drag(event,2)} />
                        </Tooltip>
                        <Tooltip placement="top" title="拆线图">
                            <Button icon={<LineChartOutlined />}  draggable="true" onDragStart={(event) => this.drag(event,3)} />
                        </Tooltip>
                        <Tooltip placement="top" title="饼图">
                            <Button icon={<PieChartOutlined />}  draggable="true" onDragStart={(event) => this.drag(event,4)} />
                        </Tooltip>
                        <Tooltip placement="top" title="地图">
                            <Button icon={<GlobalOutlined />} />
                        </Tooltip>
                        <Select setValue={this.form} style={{ minWidth: '300px' }}>
                             <Option kye="1" value="1">一行一列</Option>
                             <Option key="2" value="2">一行二列</Option>
                        </Select>
                    </Card>
                    <Card>
                        <Row gutter={5}>
                            <Col span={18} style={{ border: 'border: "1px solid #785"' }}>
                                <Row gutter={16} style={{ lineHeight: '200px' }}>
                                    <Col  onDrop={(ev) => this.drop(ev, 0)}
                                        onDragOver={(ev) => ev.preventDefault()}
                                        span={8} style={{ backgroundColor: '#ecc' }} >
                                         {this.state.item4}
                                       
                                    </Col>
                                    <Col
                                        onDrop={(ev) => this.drop(ev, 1)}
                                        onDragOver={(ev) => ev.preventDefault()}

                                        span={8} style={{ backgroundColor: '#eee' }}>
                                        {this.state.item}
                                    </Col>
                                    <Col  onDrop={(ev) => this.drop(ev, 2)}
                                        onDragOver={(ev) => ev.preventDefault()}
                                        span={8} style={{ backgroundColor: '#ebb' }}>
                                         {this.state.item2}
                                    </Col>

                                </Row>
                                <Row gutter={16} style={{ lineHeight: '200px' }}>
                                    <Col  onDrop={(ev) => this.drop(ev, 3)}
                                        onDragOver={(ev) => ev.preventDefault()}
                                        span={12} className="col"  style={{ backgroundColor: '#ecc',border:'solid 1px' }}>
                                       {this.state.item3}
                                         
                                    </Col>
                                    <Col  onDrop={(ev) => this.drop(ev, 4)}
                                        onDragOver={(ev) => ev.preventDefault()}
                                        span={12} className="col">b</Col>
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
        );
    }
}
