/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import Table from 'antd/lib/table';
import { Card, Button, Divider, Input, Form, FormItem, Icon, Row, Col } from 'antd';

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
            selectRow:[],
            dict_id: this.props.match.params.id
        };
    }
    componentDidMount() {
        let param = {pageNumd:"1",perPaged:"10",searchDictionary:""};
        HttpService.post('reportServer/dict/getDictValueByID/'+this.state.dict_id, JSON.stringify(param))
            .then(res => {
                // if (res.resultCode == "1000")
                    this.setState({ list: res.data })
                // else
                    // message.error(res.message);

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
            //this.setState={selectedRows:}
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
     onDelButtonClick(){
         alert(JSON.stringify(this.refs.tableDict.selectedRows));
     } 


    render() {
        const data = this.state.list;
        let self = this;


        return (
            <div>
                <Card title="字典值列表" bodyStyle={{ padding: "10px" }}>
                   
                    <Button href="#/dict/DictCreator/create/0" style={{ marginRight: "10px" }} type="primary">新建</Button>
                    <Button onClick={()=>this.onDelButtonClick()} style={{ marginRight: "10px" }} >删除</Button>
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
                            title="编码"
                            dataIndex="value_code"
                            key="value_code"
                        />
                        <Column
                            title="名称"
                            dataIndex="value_name"
                            key="value_name"
                        />
                       
                        <Column
                            title="动作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                   
                                   
                                    <a href={`#/dict/DictCreator/update/${record.dict_id}`}>编辑</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </div >
        )
    }
}
