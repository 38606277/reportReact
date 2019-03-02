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
    state = {
        selectedRowKeys: [13], // Check here to configure the default column
        selectedRows:[],
        loading: false,
      };
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

    onDelButtonClick() {
        // this.setState({ selectedRowKeys:[],selectedRows:[]});
        if(confirm('确认删除吗？')){
            HttpService.post('reportServer/dict/deleteDict', JSON.stringify(this.state.selectedRows))
            .then(res => {
                if (res.resultCode == "1000"){
                    message.success("删除成功！");
                    this.getAllDictName();
                    this.setState({selectedRowKeys:[], selectedRows: [] });
                }
                else
                    message.error(res.message);

            });
        }
    }
 

    render() {
        const data = this.state.list;
        let self = this;

        const rowSelection = {
          selectedRowKeys:this.state.selectedRowKeys,
          onChange:  (selectedRowKeys,selectedRows) => {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.setState({ selectedRowKeys:selectedRowKeys,selectedRows:selectedRows});
          },
        };
        return (
            <div>
                <Card title="字典列表" bodyStyle={{ padding: "10px" }}>
                    <Button href="#/dict/DictCreator/create/0" style={{ marginRight: "10px" }} type="primary">新建数据字典</Button>
                    <Button onClick={() => this.onDelButtonClick()} style={{ marginRight: "10px" }} >删除</Button>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={this.state.list}
                        rowSelection={rowSelection}
                        ref="tableDict"
                        rowKey={"dict_id"}
                    >
                        <Column
                            title="字典ID"
                            dataIndex="dict_id"
                        />
                        <Column
                            title="字典名称"
                            dataIndex="dict_name"
                        />
                        <Column
                            title="字典描述"
                            dataIndex="dict_desc"
                        />
                        <Column
                            title="调用方式"
                            dataIndex="func_type"
                        />
                        <Column
                            title="动作"
                            render={(text, record) => (
                                <span>
                                    <a href={`#/dict/DictValueList/${record.dict_id}`}>查看数据</a>
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
