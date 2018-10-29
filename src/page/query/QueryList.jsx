/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input,message,Form, FormItem, Icon, Row, Col } from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';


const functionService = new FunctionService();
const { Column, ColumnGroup } = Table;
const Search = Input.Search;

export default class QueryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    componentDidMount() {
        let param = {};
        HttpService.post('reportServer/query/getAllQueryName', null)
            .then(res => {
                if (res.resultCode == "1000")
                    this.setState({ list: res.data })
                else
                    message.error(res.message);

            });
    }

    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    // 搜索
    onSearch(searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchKeyword: searchKeyword
        }, () => {
            this.loadUserList();
        });
    }
    //展示当前行信息
    showCurRowMessage(record) {
        alert("key:" + record.userId + " name:" + record.userName + " description:" + record.description);
    }

    render() {
        const data = this.state.list;
        let self = this;


        return (
            <div>
                <Card title="查询列表" bodyStyle={{ padding: "10px" }}>
                    {/* <Row style={{marginBottom:"10px"}}>
                        <Col span={6}> <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入函数名称" /></Col>
                        <Col span={4}></Col>
                        <Col span={10}></Col>
                        <Col span={4}> <Button type="primary" style={{width:"100px"}} onClick={()=>window.location='#/function/functionCreator/creat/0'} >新建</Button></Col>
                    </Row> */}
                    <Button href="#/query/QueryCreator/create/0" style={{ marginRight: "10px" }} type="primary">新建查询</Button>
                    <Button href="#/query/QueryClass" style={{ marginRight: "15px" }} type="primary">查询类别管理</Button>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={this.state.list}>
                        <Column
                            title="查询ID"
                            dataIndex="qry_id"
                            key="qry_id"
                            sorter={(a, b) => a.qry_id - b.qry_id}
                        />
                        <Column
                            title="查询名称"
                            dataIndex="qry_name"
                            key="qry_name"
                        />
                        <Column
                            title="查询描述"
                            dataIndex="qry_desc"
                            key="func_desc"
                        />
                        <Column
                            title="查询类别"
                            dataIndex="class_name"
                            key="class_name"
                            sorter={(a, b) => a.class_name.length - b.class_name.length}
                        />
                        <Column
                            title="调用方式"
                            dataIndex="qry_type"
                            key="qry_type"
                        />
                        <Column
                            title="动作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <a href={`#/query/QueryCreator/update/${record.qry_id}`}>编辑</a>
                                    <Divider type="vertical" />
                                    <a href={`#/query/CreateTemplate`}>模板</a>
                                    <Divider type="vertical" />
                                    <a href="javascript:;">删除{record.name}</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </div >
        )
    }
}
