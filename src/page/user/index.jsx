/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import Table        from 'antd/lib/table';
import './../../App.css';
const _mm   = new MUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
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
     //展示当前行信息
  showCurRowMessage(record){
    alert("key:"+record.userId + " name:"+record.userName + " description:" + record.description);
  }

    render(){
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
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
              ke:'isAdminText'
          }, {
            title: '入职时间',
            dataIndex: 'creationDate',
            key: 'creationDate',
          }];
       
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <Table dataSource={dataSource} columns={columns} />
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default UserList;