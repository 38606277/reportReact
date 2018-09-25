
import React                from 'react';
import { Link }             from 'react-router-dom';
import User                 from '../../../service/user-service.jsx';
import {Table,Divider,Button,Card, Tooltip,Input,List}  from 'antd';
import Pagination           from 'antd/lib/pagination';
const user = new User();
const Search=Input.Search;
class RuleInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            pageNum         : 1,
            perPage         : 10,
        };
    }
    componentDidMount(){
        this.loadDbList();
    }
    loadDbList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        user.getUserList(listParam).then(response => {
            this.setState(response.data);
        }, errMsg => {
            this.setState({
                list : []
            });
        });
    }
    

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const dataSource = this.state.list;
          const columns = [{
            dataIndex: 'userName',
            key: 'userName',
            render: function(text, record, index) {
               return <Link to='#' >{text}</Link>;
             } 
          }];
         
        return (
            <div id="page-wrapper">
            <Card title="用户列表"  style={{float:"left",width:"20%"}}>
                
                <Table dataSource={dataSource} columns={columns}  pagination={false} showHeader={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
           
            <Card title="权限列表" style={{float:"left",width:"80%"}}>
                ssss
            </Card>
             
            </div>
        )
    }
}

export default RuleInfo;