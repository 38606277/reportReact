/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import { Link } from 'react-router-dom';
// import MUtil        from 'util/mm.jsx'
// import User         from 'service/user-service.jsx'

// import PageTitle    from 'component/page-title/index.jsx';
import Pagination from 'antd/lib/pagination';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input, Form, FormItem, Icon, Row, Col } from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
// import ListSearch   from  '../../servcie/user/index-list-search.jsx';
import './../../App.css';
import { InputItem } from 'antd-mobile';


const functionService = new FunctionService();
const { Column, ColumnGroup } = Table;

class functionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    componentDidMount() {
        //this.loadUserList();
        functionService.getFunctionList()
            .then(res => {
                this.setState({ list: res })
            });
    }
    loadUserList() {
        let listParam = {};
        listParam.userId = _mm.getStorage('userInfo').userId;
        listParam.pageNum = this.state.pageNum;
        listParam.perPage = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.keyword = this.state.searchKeyword;
        }
        _user.getUserList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
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
                <Card title="函数列表" bodyStyle={{padding:"10px"}}>
                    <Row style={{marginBottom:"10px"}}>
                        <Col span={6}> <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入函数名称" /></Col>
                        <Col span={4}></Col>
                        <Col span={10}></Col>
                        <Col span={4}> <Button type="primary" style={{width:"100px"}} onClick={()=>window.location='#/function/functionCreator/creat/0'} >新建</Button></Col>
                    </Row>
                    <Table dataSource={this.state.list}>
                        <Column
                            title="函数ID"
                            dataIndex="func_id"
                            key="func_name"
                        />
                        <Column
                            title="函数名称"
                            dataIndex="func_name"
                            key="func_desc"
                        />
                         <Column
                            title="函数描述"
                            dataIndex="func_desc"
                            key="func_desc"
                        />
                        <Column
                            title="函数类别"
                            dataIndex="class_name"
                            key="class_name"
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
                                    <a href={`#/function/functionCreator/update/${record.func_id}`}>编辑</a>
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

export default functionList;