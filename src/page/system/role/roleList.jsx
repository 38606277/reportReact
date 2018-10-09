
import React                from 'react';
import { Link }             from 'react-router-dom';
import Role                 from '../../../service/RoleService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input, Form}  from 'antd';
import  LocalStorge         from '../../../util/LogcalStorge.jsx';
const FormItem = Form.Item;
const localStorge = new LocalStorge();
const _role = new Role();
const Search = Input.Search;
import './role.scss';
class RoleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage         : 10,
            listType        :'list',
            roleName:''
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
            listParam.roleName    = this.state.roleName;
        }
        _role.getRoleList(listParam).then(response => {
            this.setState(response);
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
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
     // 搜索
     onSearch(roleName){
        let listType = roleName === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            roleName   : roleName
        }, () => {
            this.loadUserList();
        });
    }
    deleteRole(id){
        if(confirm('确认删除吗？')){
            _role.delRole(id).then(response => {
                alert("删除成功");
                this.loadUserList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }

    render(){
        this.state.list.map((item,index)=>{
            item.key=index;
        })
        const userinfos=localStorge.getStorage('userInfo');
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: 'ID',
            dataIndex: 'roleId',
            key: 'roleId',
            className:'headerRow',
          },{
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            className:'headerRow',
          }, {
            title: '是否启用',
            dataIndex: 'enabledText',
            key: 'enabledText',
            className:'headerRow',
          },{
            title: '创建时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
            className:'headerRow',
          },{
            title: '操作',
            dataIndex: '操作',
            className:'headerRow',
            render: (text, record) => (
                <span>
                  <Link to={ `/role/roleInfo/${record.roleId}` }>编辑</Link>
                  <Divider type="vertical" />
                   <a onClick={()=>this.deleteRole(`${record.roleId}`)} href="javascript:;">删除</a>
                  <Divider type="vertical" />
                  <Link to={ `/role/roleUser/${record.roleId}` }>分配用户</Link>
                   <Divider type="vertical" />
                   <Link to={ `/rule` }>分配权限</Link>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="角色列表">
                <Tooltip>
                     <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip>
                <Tooltip>
                    <Button href="#/role/roleInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建角色</Button>
                </Tooltip>
                
                <Table dataSource={dataSource} columns={columns}  pagination={false}/>
                 <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
                
            </div>
        )
    }
}

export default RoleList;