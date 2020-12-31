/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';

import { DownOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
    List,
    Card,
    Button,
    Divider,
    Input,
    message,
    Table,
    Avatar,
} from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';


const functionService = new FunctionService();
const url = window.getServerUrl();
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
        selectedRowKeys: [],
        pageSize:10,
        pageNum:1,
        total:0,
        mainHeigth: window.innerHeight - 80 + 'px',
        mainBoxHeigth:window.innerHeight - 120 + 'px',
      };
    componentDidMount() {
        this.getAllQueryName();
    }
    getAllQueryName() {
        let param = {};
        HttpService.post('reportServer/query/getAllQueryNamePage', 
        JSON.stringify({searchKeyword:this.state.searchKeyword,"startIndex":this.state.pageNum,"perPage":this.state.pageSize}))
            .then(res => {
                if (res.resultCode == "1000"){
                    this.setState({ list: res.data.listFunc,total:res.data.total })
                }
                else{
                    message.error(res.message);
                }
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
            this.getAllQueryName();
        });
    }
    // 搜索
    onSearch(searchKeyword) {
        this.setState({
            pageNum: 1,
            searchKeyword: searchKeyword
        }, () => {
            this.getAllQueryName();
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
            <div style={{ background: '#ECECEC', padding: '0px',height:this.state.mainHeigth,overflow: 'hidden!important' }}>
                <Card title="市场数据" bodyStyle={{ padding: "10px" }}>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />
                      <div className="main_box" style={{height:this.state.mainBoxHeigth,overflow:'auto'}}>
                        <List
                            dataSource={this.state.list}
                            pagination={{
                                onChange: page => {
                                    this.onPageNumChange(page);
                                },
                                pageSize: this.state.pageSize,
                                total:this.state.total
                            }}
                            itemLayout="vertical"
                            size="large"
                            renderItem={item => (
                            <List.Item
                                key={item.qry_name}
                                // actions={[
                                // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                // ]}
                            >
                                <List.Item.Meta
                                    title={<a onClick={()=>{window.location.href="#/query/SqlView/view/"+item.qry_id}}>{item.qry_name}</a>}
                                    description={item.qry_desc}
                                />
                                <div>查询类别：{item.class_name}</div>
                                <div>调用方式：{item.qry_type}</div>
                                {/* <Card title={item.qry_name} size='small'>
                                {item.qry_file == null ?
                                                        <Avatar src={require("./../../asset/logo.png")}  />
                                                        : <Avatar src={url + "/report/" + item.qry_file} />}
                                    <div style={{cursor:'pointer' }} onClick={()=>{
                                            if(item.qry_type=='sql'){
                                                window.location.href="#/query/SqlView/view/"+item.qry_id;
                                            }else if(item.qry_type=='procedure'){
                                                window.location.href="#/query/ProcedureCreator/update/"+item.qry_id;
                                            }else if(item.qry_type=='http'){
                                                window.location.href="#/query/HttpCreator/update/"+item.qry_id;
                                            }
                                        }}>{item.qry_name}</div>
                                        <div>  类型：{item.qry_type}</div>
                                </Card> */}
                            </List.Item>
                            )}
                        />
                    </div>
                </Card>
            </div >
        );
    }
}
