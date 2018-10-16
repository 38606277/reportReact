
import React                from 'react';
import { Link }             from 'react-router-dom';
import Role                 from '../../../service/RoleService.jsx';
import User                 from '../../../service/user-service.jsx';


import {Table,Button,Card, Tooltip,Input,message,Tree,Tabs, Select,Icon}  from 'antd';
import Pagination           from 'antd/lib/pagination';

const TreeNode = Tree.TreeNode;
const _role = new Role();
const _user =new User();
const Search=Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class RoleUser extends React.Component{
    constructor(props){
        super(props);
        const panes = [];
        this.newTabIndex = 0;
        this.state = {
            roleId:this.props.match.params.roleId,
            list : [],
            userList:[],
            pageNum         : 1,
            perPage         : 10,
            listType:'list',
            selectedRowKeys: [],
            roleName:'',
            pageNumUser         : 1,
            perPageUser         : 10,
        };
    }
    
    componentDidMount(){
        this.loadRoleList(this.state.roleId);
        this.loadUserList();
    }
    loadRoleList(roleId){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.roleName    = this.state.roleName;
        }
        if(null!=roleId && ''!=roleId){
           this.getUserByroleId(roleId);
        }
        _role.getRoleList(listParam).then(response => {
            this.setState(response);
        }, errMsg => {
            this.setState({
                list : []
            });
        });
    }
    getUserByroleId(roleId){
        let arrId=[];
        _role.getUserListByRoleId(roleId).then(response => {
            response.map((item,index)=>{
                arrId.push(item.user_id);
            });
            this.setState({selectedRowKeys:arrId});
        }, errMsg => {
            this.setState({
                selectedRowKeys : []
            });
        });
    }
    onValueChange(e){
        let name = e.target.name,
        value = e.target.value.trim();
           
        this.setState({roleName:value});
    }
    // 搜索
    onSearch(){
        this.setState({
            pageNum         : 1,
            listType :'search'
        }, () => {
            this.loadRoleList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadRoleList();
        });
    }


    loadUserList(){
        let listParamUser = {};
        listParamUser.pageNumUser  = this.state.pageNumUser;
        listParamUser.perPageUser  = this.state.perPageUser;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        // if(this.state.listType === 'search'){
        //     listParam.userName    = this.state.userName;
        // }
        _user.getUserListRole(listParamUser).then(response => {
            this.setState({userList:response.data.list,userTotal:response.data.total});
        }, errMsg => {
            this.setState({
                userList : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChangeUser(pageNumUser){
        this.setState({
            pageNumUser : pageNumUser
        }, () => {
            this.loadUserList();
        });
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    selectedOnchage(roleId,roleName){
        this.setState({roleName});
        this.getUserByroleId(roleId);
    }
    saveUserId(){
        let param={roleId:this.state.roleId,userList:this.state.selectedRowKeys};
        _role.saveUserId(param).then(response => {
            alert("success");
        }, errMsg => {
            this.setState({
                userList : []
            });
        });
    }
    render(){
        this.state.list.map((item,index)=>{
            item.key=item.index;
        });
        this.state.userList.map((item,index)=>{
            item.key=item.id;
        });
        const dataSource = this.state.list;
          const columns = [{
            dataIndex: 'roleName',
            key: 'roleName',
            render: (text, record)=> {
                return <a href="javascript:;" onClick={()=>this.selectedOnchage(record.roleId,record.roleName)} >{record.roleName}</a>;
            }
          }];
          const dataSourceUser = this.state.userList;
          const columnsUser = [ {
                title: 'ID',
                dataIndex: 'userId',
                key:'userId'
            },{
                title:'用户名',            
                dataIndex: 'userName',
            }];
            const {  selectedRowKeys } = this.state;
            const rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
        return (
            <div id="page-wrapper">
                <Card title="角色列表"  style={{float:"left",width:"20%"}}>
                    <Tooltip>
                        <Search
                            style={{ width: 190,marginBottom:'10px' ,marginLeft: '-20px', marginRight: '-30px', border: '0'}}
                            placeholder='请输入...'
                            enterButton="查询"
                            onSearch={value => this.onSearch(value)}
                            onChange={(e) => this.onValueChange(e)}
                            value={this.state.roleName}
                            />
                    </Tooltip>
                    <Table dataSource={dataSource} columns={columns}  pagination={false} 
                    showHeader={false} style={{marginLeft: '-30px', marginRight: '-30px', border: '0'}}/>
                    <Pagination current={this.state.pageNum} 
                        total={this.state.total} 
                        onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
                </Card>
            
                <Card title="用户列表" style={{float:"left",width:"80%"}}>
                     <Tooltip>
                        <Button type="primary" onClick={()=>this.saveUserId()} style={{marginBottom:'10px'}}>保存</Button>
                    </Tooltip>
                    <Table rowSelection={rowSelection} columns={columnsUser}  dataSource={dataSourceUser} 
                        pagination={false}/>
                    <Pagination current={this.state.pageNumUser} total={this.state.userTotal} 
                        onChange={(pageNumUser) => this.onPageNumChangeUser(pageNumUser)}/> 
                </Card>
             
            </div>
        )
    }
}

export default RoleUser;