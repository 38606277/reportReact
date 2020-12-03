/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Card,
    Button,
    Table,
    Input,
    message,
    Modal,
    FormItem,
    Row,
    Col,
    loading,
    Dropdown,
    Menu,
} from 'antd';

import FunctionService from '../../service/FunctionService.jsx'
import HttpService from '../../util/HttpService.jsx';


const functionService = new FunctionService();
const { Column, ColumnGroup } = Table;
const Search = Input.Search;

export default class templist extends React.Component {
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
        HttpService.post('reportServer/temp/getAll', null)
            .then(res => {
                if (res.resultCode == "1000")
                    this.setState({ list: res.data })
                else
                    message.error(res.message);

            });
    }

   onNewQry(e){
   
       window.location.href="#/temp/temp";
    

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
            HttpService.post('reportServer/temp/getAll', JSON.stringify(this.state.selectedRows))
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
                <Card title="人员登记表" bodyStyle={{ padding: "10px" }}>
                    {/* <Row style={{marginBottom:"10px"}}>
                        <Col span={6}> <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入函数名称" /></Col>
                        <Col span={4}></Col>
                        <Col span={10}></Col>
                        <Col span={4}> <Button type="primary" style={{width:"100px"}} onClick={()=>window.location='#/function/functionCreator/creat/0'} >新建</Button></Col>
                    </Row> */}
                    <Dropdown style={{ marginRight: "20px" }} type="primary" overlay={(
                        <Menu onClick={(e)=>this.onNewQry(e)}>
                            <Menu.Item key="sql">员工进出</Menu.Item>
                           
                        </Menu>
                    )}>
                        <Button >
                        新建<DownOutlined />
                        </Button>
                    </Dropdown>
                    {/* <Button href="#/query/QueryCreator/sql/create/0" style={{ marginRight: "10px" }} type="primary">新增</Button> */}
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={this.state.list} rowKey={"qry_id"} rowSelection={rowSelection} ref="qryTable" >
                        <Column
                            title="姓名"
                            dataIndex="name"
                        />
                        <Column
                            title="访问时间"
                            dataIndex="vist_date"
                        />
                         <Column
                            title="身份证号"
                            dataIndex="id_number"
                        />
                        <Column
                            title="联系方式"
                            dataIndex="contact"
                        />
                         <Column
                            title="所属部门"
                            dataIndex="corp"
                        />
                        <Column
                            title="办公地点"
                            dataIndex="workplace"
                        />
                        <Column
                            title="温度"
                            dataIndex="temp"
                        />
                       
                        {/* <Column
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
                        /> */}
                    </Table>
                </Card>
            </div >
        );
    }
}
