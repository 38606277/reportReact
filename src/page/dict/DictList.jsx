/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input,message, Form, FormItem, Icon, Row, Col } from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';


const functionService = new FunctionService();
const { Column, ColumnGroup } = Table;
const Search = Input.Search;

export default class DictList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selectedRows: [],
        };
    }
    componentDidMount() {
        this.getAllDictName();
    }


    getAllDictName()
    {
        let param = {};
        HttpService.post('reportServer/dict/getAllDictName', null)
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

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRows: selectedRowKeys });
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    onDelButtonClick() {
       
        HttpService.post('reportServer/dict/deleteDict', JSON.stringify(this.state.selectedRows))
            .then(res => {
                if (res.resultCode == "1000"){
                    message.success("删除成功！");
                    this.getAllDictName();
                    this.setState({ selectedRows: [] });
                }
                   
                else
                    message.error(res.message);

            });
    }


    render() {
        const data = this.state.list;
        let self = this;


        return (
            <div>
                <Card title="字典列表" bodyStyle={{ padding: "10px" }}>
                    {/* <Row style={{marginBottom:"10px"}}>
                        <Col span={6}> <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入函数名称" /></Col>
                        <Col span={4}></Col>
                        <Col span={10}></Col>
                        <Col span={4}> <Button type="primary" style={{width:"100px"}} onClick={()=>window.location='#/function/functionCreator/creat/0'} >新建</Button></Col>
                    </Row> */}
                    <Button href="#/dict/DictCreator/create/0" style={{ marginRight: "10px" }} type="primary">新建数据字典</Button>
                    <Button onClick={() => this.onDelButtonClick()} style={{ marginRight: "10px" }} >删除</Button>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={this.state.list}
                        rowSelection={this.rowSelection}
                        ref="tableDict"
                    >
                        <Column
                            title="字典ID"
                            dataIndex="dict_id"
                            key="dict_id"
                        />
                        <Column
                            title="字典名称"
                            dataIndex="dict_name"
                            key="dict_name"
                        />
                        <Column
                            title="字典描述"
                            dataIndex="dict_desc"
                            key="dict_desc"
                        />
                        <Column
                            title="调用方式"
                            dataIndex="func_type"
                            key="func_type"
                        />
                        <Column
                            title="动作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <a href={`#/dict/DictViewData/${record.dict_id}`}>查看数据</a>
                                    <Divider type="vertical" />
                                    <a href={`#/dict/DictCreator/update/${record.dict_id}`}>数据同步</a>
                                    <Divider type="vertical" />
                                    <a href={`#/dict/DictCreator/update/${record.dict_id}`}>字典编辑</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </div >
        )
    }
}
