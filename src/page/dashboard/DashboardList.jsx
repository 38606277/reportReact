/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React from 'react';
import { Link }             from 'react-router-dom';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Divider, Input, message, Table, Row, Col, Spin } from 'antd';
import Pagination           from 'antd/lib/pagination';
import DashboardService from '../../service/DashboardService.jsx';
const _dashboardService = new DashboardService();
const Search = Input.Search;

export default class DashboardList extends React.Component {
    constructor(props) {
        super(props);
       
    }
    state = {
        loading: false,
        list            : [],
        pageNum         : 1,
        perPage         : 10,
        listType        :'list',
        dashboard_name:'',
        selectedRows: [],
        selectedRowKeys: []
       };


    componentDidMount() {
        this.loadDashboardList();
    }
    loadDashboardList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.dashboard_name    = this.state.dashboard_name;
        }
        this.setState({loading:true});
        _dashboardService.getDashboardList(listParam).then(response => {
            this.setState({list:response.data.list,total:response.data.total,loading:false});
        }, errMsg => {
            this.setState({
                list : [],loading:false
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadDashboardList();
        });
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
     // 搜索
     onSearch(dashboard_name){
        let listType = dashboard_name === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            dashboard_name   : dashboard_name
        }, () => {
            this.loadDashboardList();
        });
    }
    deleteDashboard(id){
        if(confirm('确认删除吗？')){
            _dashboardService.delDashboard(id).then(response => {
                alert("删除成功");
                this.loadCubeList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }
    
    render() {
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'dashboard_id',
            key: 'dashboard_id',
            className:'headerRow',
          },{
            title: '名称',
            dataIndex: 'dashboard_name',
            key: 'dashboard_name',
            className:'headerRow',
          },{
            title: '描述',
            dataIndex: 'dashboard_desc',
            key: 'dashboard_desc',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/dashboard/DashboardInfo/${record.dashboard_id}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteDashboard(`${record.dashboard_id}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
        
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:  (selectedRowKeys,selectedRows) => {
              console.log('selectedRowKeys changed: ', selectedRowKeys);
              this.setState({ selectedRowKeys:selectedRowKeys,selectedRows:selectedRows});
            },
          };

        return (
            <div>
                <Spin  spinning={this.state.loading} delay={100}>
                <Card title="函数列表" bodyStyle={{ padding: "10px" }}>
                    <Button href="#/dashboard/DashboardCreator" style={{ marginRight: "10px" }} type="primary">新建函数</Button>
                    <Search
                        style={{ maxWidth: 300, marginBottom: '10px', float: "right" }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                    />

                    <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                    <Pagination current={this.state.pageNum} 
                        total={this.state.total} 
                        onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
                </Card>
                </Spin>
            </div >
        )
    }
}
