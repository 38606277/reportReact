/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input, message,Modal, Form, FormItem, Icon, Row, Col,loading,Dropdown,Menu } from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';


const functionService = new FunctionService();
const { Column, ColumnGroup } = Table;
const Search = Input.Search;

export default class QueryList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
       // Check here to configure the default column
        loading: false,
        list: [],
        selectedRows: [],
        selectedRowKeys: []
      };
    componentDidMount() {
        this.getAllQueryName();
    }
    getAllQueryName() {
        let param = {};
        HttpService.post('reportServer/query/getAllQueryName', null)
            .then(res => {
                if (res.resultCode == "1000")
                    this.setState({ list: res.data })
                else
                    message.error(res.message);

            });
    }

   onNewQry(e){
    if(e.key=='sql')
    {
       window.location.href="#/query/SqlCreator/create/0";
    }else if(e.key=='procedure')
    {
        window.location.href="#/query/ProcedureCreator/create/0";
    }else if(e.key=='http')
    {
        window.location.href="#/query/HttpCreator/create/0";
    }else if(e.key=='table')
    {
        window.location.href="#/query/TableCreator/create/0";
    }

   }

    onDelButtonClick() {
        //  Modal.confirm({
        //     title: '删除确认',
        //     content: '确认要删除这些查询吗？',
        //     okText: '确认',
        //     cancelText: '取消',
        //     onOk() {
        //        this.deleteQuery();
        //       },
        //       onCancel() {
        //         console.log('Cancel');
        //       },
        //   });
        if(confirm('确认删除吗？')){
            HttpService.post('reportServer/query/deleteQuery', JSON.stringify(this.state.selectedRows))
            .then(res => {
                if (res.resultCode == "1000") {
                    message.success("删除成功！");
                    this.getAllQueryName();
                    this.setState({selectedRowKeys:[], selectedRows: [] });
                }
    
                else
                    message.error(res.message);
    
            });
        }
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
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:  (selectedRowKeys,selectedRows) => {
              console.log('selectedRowKeys changed: ', selectedRowKeys);
              this.setState({ selectedRowKeys:selectedRowKeys,selectedRows:selectedRows});
            },
          };

        return (
            <div>
                <Card title="数据查询" bodyStyle={{ padding: "10px" }}>
                    {/* <Row style={{marginBottom:"10px"}}>
                        <Col span={6}> <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入函数名称" /></Col>
                        <Col span={4}></Col>
                        <Col span={10}></Col>
                        <Col span={4}> <Button type="primary" style={{width:"100px"}} onClick={()=>window.location='#/function/functionCreator/creat/0'} >新建</Button></Col>
                    </Row> */}
                    <Dropdown style={{ marginRight: "20px" }} type="primary" overlay={(
                        <Menu onClick={(e)=>this.onNewQry(e)}>
                            <Menu.Item key="sql">sql语句</Menu.Item>
                            <Menu.Item key="procedure">存储过程</Menu.Item>
                            <Menu.Item key="http">http请求</Menu.Item>
                            <Menu.Item key="table">数据库表</Menu.Item>
                        </Menu>
                    )}>
                        <Button icon="file-search" type="primary" >
                        新建查询<Icon type="down" />
                        </Button>
                    </Dropdown>
                    {/* <Button href="#/query/QueryCreator/sql/create/0" style={{ marginRight: "10px" }} type="primary">新建查询</Button> */}
                    <Button href="#/query/QueryClass" style={{ marginRight: "15px",marginLeft:"15px" }} >查询类别管理</Button>
                    <Button onClick={() => this.onDelButtonClick()} style={{ marginRight: "10px" }} >删除</Button>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={this.state.list} rowKey={"qry_id"} rowSelection={rowSelection} ref="qryTable" >
                        <Column
                            title="查询ID"
                            dataIndex="qry_id"
                            sorter={(a, b) => a.qry_id - b.qry_id}
                        />
                        <Column
                            title="查询名称"
                            dataIndex="qry_name"
                        />
                        <Column
                            title="查询描述"
                            dataIndex="qry_desc"
                        />
                        <Column
                            title="查询类别"
                            dataIndex="class_name"
                            sorter={(a, b) => a.class_name.length - b.class_name.length}
                        />
                        <Column
                            title="调用方式"
                            dataIndex="qry_type"
                        />
                        <Column
                            title="动作"
                            render={(text, record) => (
                                <span>
                                    <a onClick={()=>{
                                        if(record.qry_type=='sql'){
                                            window.location.href="#/query/SqlCreator/update/"+record.qry_id;
                                        }else if(record.qry_type=='procedure'){
                                            window.location.href="#/query/ProcedureCreator/update/"+record.qry_id;
                                        }else if(record.qry_type=='http'){
                                            window.location.href="#/query/HttpCreator/update/"+record.qry_id;
                                        }
                                     }}>编辑</a>
                                    <Divider type="vertical" />
                                    <a href={`#/query/CreateTemplate`}>模板</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </div >
        )
    }
}
