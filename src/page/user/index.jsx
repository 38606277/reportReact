/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React                from 'react';
import { Link }             from 'react-router-dom';
import User                 from '../../service/user-service.jsx';
import PageTitle            from '../../component/page-title/index.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Tag,Card}  from 'antd';
import ListSearch           from  './index-list-search.jsx';
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list'
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        _user.getUserList(listParam).then(response => {
            this.setState(response.data);
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
     // 搜索
     onSearch(searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadUserList();
        });
    }
     //展示当前行信息
  showCurRowMessage(record){
    alert("key:"+record.userId + " name:"+record.userName + " description:" + record.description);
  }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId'
          },{
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
            render: function(text, record, index) {
               return <Link to={ `/user/userInfo/${record.id}` }>{text}</Link>;
             } 
          }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width:'200px'
          },{
            title:'角色',
            dataIndex:'isAdminText',
            key:'isAdminText'
          }, {
            title: '入职时间',
            dataIndex: 'creationDate',
            key: 'creationDate'
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  <Link to={ `/user/userInfo/${record.id}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a href="javascript:;">Delete</a>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="用户列表"
            extra={<a href="#/user/userInfo/null">新建用户</a>}
            >
                <ListSearch onSearch={(searchKeyword) => {this.onSearch(searchKeyword)}}/>
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default UserList;