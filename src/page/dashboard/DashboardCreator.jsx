/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input, message, Form, FormItem, Avatar, Row, Col } from 'antd';

import HttpService from '../../util/HttpService.jsx';
const { Column, ColumnGroup } = Table;
 import "./DashboardCreator.scss";



export default class DashboardCreator extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        loading: false,
        list: [
            {name:'指标',value:''},
            {name:'增长率',value:''},
            {name:'单位',value:''},
            {name:'发值',value:''},
            {name:'可奈',value:''},
            {name:'指标',value:''},
        ],
        selectedRows: [],
        selectedRowKeys: []
    };


    componentDidMount() {
    }


    render() {
        return (
            <div>
                <Card title="创建仪表板" bodyStyle={{ padding: "0px" }}>

                    <Card bodyStyle={{ padding: "5px" }}>
                        <Button style={{ marginRight: "10px" }} type="primary">新增行</Button>
                        <Button style={{ marginRight: "10px" }} type="primary">保存</Button>
                        <Button  icon="bar-chart" />
                        <Button  icon="line-chart" />
                        <Button  icon="dot-chart" />
                        <Button  icon="pie-chart" />
                        <Button  icon="profile" />
                    </Card>
                    <Card>
                        <Row gutter={5}>
                            <Col span={18} style={{border:'border: "1px solid #785"'}}>
                                <Row gutter={5} style={{lineHeight:'200px'}}>
                                    <Col span={8} className="col">a</Col>
                                    <Col span={8} className="col">b</Col>
                                    <Col span={8} className="col">c</Col>
                                   
                                </Row>
                                <Row gutter={5} style={{lineHeight:'200px'}}>
                                    <Col span={12} className="col">a</Col>
                                    <Col span={12} className="col">b</Col>
                                </Row>

                            </Col>
                            <Col span={6} style={{border:'border: "1px solid #785"'}}>
                                <Table dataSource={this.state.list} >
                                    <Column
                                        title="属性"
                                        dataIndex="name"
                                    />
                                    <Column
                                        title="值"
                                        dataIndex="value"
                                        render={(text, record,index) => {
                                            return (<Input/>)}}
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
